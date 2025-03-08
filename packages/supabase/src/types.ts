import { User, Post, Comment, Like, Event, Community } from '@pec/shared'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
      }
      communities: {
        Row: Community
        Insert: Omit<Community, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Community, 'id' | 'created_at' | 'updated_at'>>
      }
      posts: {
        Row: Post
        Insert: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'likes_count' | 'comments_count'>
        Update: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at' | 'likes_count' | 'comments_count'>>
      }
      comments: {
        Row: Comment
        Insert: Omit<Comment, 'id' | 'created_at' | 'updated_at' | 'likes_count'>
        Update: Partial<Omit<Comment, 'id' | 'created_at' | 'updated_at' | 'likes_count'>>
      }
      likes: {
        Row: Like
        Insert: Omit<Like, 'id' | 'created_at'>
        Update: never
      }
      events: {
        Row: Event
        Insert: Omit<Event, 'id' | 'created_at' | 'updated_at' | 'attendees_count'>
        Update: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at' | 'attendees_count'>>
      }
    }
  }
}
