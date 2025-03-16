-- Drop existing tables and related objects
DROP TABLE IF EXISTS public.events CASCADE;
DROP TABLE IF EXISTS public.likes CASCADE;
DROP TABLE IF EXISTS public.comments CASCADE;
DROP TABLE IF EXISTS public.posts CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Drop existing functions and triggers
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

-- Delete all storage objects and buckets
DELETE FROM storage.objects WHERE bucket_id = 'profile_images';
DROP POLICY IF EXISTS "Profile images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload a profile image" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own profile image" ON storage.objects;
DELETE FROM storage.buckets WHERE id = 'profile_images';

-- Delete all users (BE CAREFUL: this will delete all users including admin)
DELETE FROM auth.users;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "moddatetime";

-- Create role type
CREATE TYPE public.user_role AS ENUM ('subscriber', 'participant', 'manager');

-- Create storage bucket for profile images
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile_images', 'profile_images', true);

-- Enable RLS for storage bucket
CREATE POLICY "Profile images are publicly accessible."
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'profile_images' );

CREATE POLICY "Anyone can upload a profile image."
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'profile_images' );

CREATE POLICY "Users can update their own profile image."
  ON storage.objects FOR UPDATE
  USING ( bucket_id = 'profile_images' AND auth.uid() = owner );

CREATE POLICY "Users can delete their own profile image."
  ON storage.objects FOR DELETE
  USING ( bucket_id = 'profile_images' AND auth.uid() = owner );

-- Create profiles table
CREATE TABLE public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text not null unique,
  avatar_url text,
  role public.user_role not null default 'participant',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint username_length check (char_length(username) >= 3 and char_length(username) <= 50)
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create updated_at trigger for profiles
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);

-- Create function to handle new user creation
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'avatar_url',
    COALESCE((new.raw_user_meta_data->>'role')::public.user_role, 'subscriber')
  );
  RETURN new;
END;
$$;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create posts table
CREATE TABLE public.posts (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  type text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  likes_count integer DEFAULT 0 NOT NULL,
  comments_count integer DEFAULT 0 NOT NULL,
  views_count integer DEFAULT 0 NOT NULL,
  thumbnail_url text,
  category text,
  solved boolean DEFAULT false,
  answer_id uuid,
  tags text[],
  CONSTRAINT posts_title_length CHECK ((char_length(title) >= 5) AND (char_length(title) <= 200)),
  CONSTRAINT posts_content_length CHECK (char_length(content) >= 10),
  CONSTRAINT posts_type_check CHECK (type IN ('post', 'question', 'discussion'))
);

-- Create comments table
CREATE TABLE public.comments (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  content text NOT NULL,
  post_id uuid REFERENCES public.posts ON DELETE CASCADE NOT NULL,
  author_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  parent_id uuid REFERENCES public.comments ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  likes_count integer DEFAULT 0 NOT NULL,
  CONSTRAINT comments_content_length CHECK (char_length(content) >= 1)
);

-- Create likes table
CREATE TABLE public.likes (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  post_id uuid REFERENCES public.posts ON DELETE CASCADE,
  comment_id uuid REFERENCES public.comments ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT likes_target_check CHECK (
    (post_id IS NOT NULL AND comment_id IS NULL) OR
    (post_id IS NULL AND comment_id IS NOT NULL)
  )
);

-- Create events table
CREATE TABLE public.events (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  start_date timestamp with time zone NOT NULL,
  end_date timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  attendees_count integer DEFAULT 0 NOT NULL,
  CONSTRAINT events_title_length CHECK ((char_length(title) >= 5) AND (char_length(title) <= 100)),
  CONSTRAINT events_description_length CHECK ((char_length(description) >= 10)),
  CONSTRAINT events_date_check CHECK (end_date > start_date)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Posts are viewable by everyone"
  ON public.posts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert their own posts"
  ON public.posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = (SELECT id FROM public.profiles WHERE id = author_id));

CREATE POLICY "Users can update their own posts"
  ON public.posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = (SELECT id FROM public.profiles WHERE id = author_id))
  WITH CHECK (auth.uid() = (SELECT id FROM public.profiles WHERE id = author_id));

CREATE POLICY "Users can delete their own posts"
  ON public.posts FOR DELETE
  TO authenticated
  USING (auth.uid() = (SELECT id FROM public.profiles WHERE id = author_id));

CREATE POLICY "Comments are viewable by everyone"
  ON public.comments FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert their own comments"
  ON public.comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = (SELECT id FROM public.profiles WHERE id = author_id));

CREATE POLICY "Users can update their own comments"
  ON public.comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = (SELECT id FROM public.profiles WHERE id = author_id))
  WITH CHECK (auth.uid() = (SELECT id FROM public.profiles WHERE id = author_id));

CREATE POLICY "Users can delete their own comments"
  ON public.comments FOR DELETE
  TO authenticated
  USING (auth.uid() = (SELECT id FROM public.profiles WHERE id = author_id));

CREATE POLICY "Likes are viewable by everyone"
  ON public.likes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert their own likes"
  ON public.likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = (SELECT id FROM public.profiles WHERE id = user_id));

CREATE POLICY "Users can delete their own likes"
  ON public.likes FOR DELETE
  TO authenticated
  USING (auth.uid() = (SELECT id FROM public.profiles WHERE id = user_id));

CREATE POLICY "Events are viewable by everyone"
  ON public.events FOR SELECT
  TO public
  USING (true);

-- Create updated_at triggers
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.comments
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.likes
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);
