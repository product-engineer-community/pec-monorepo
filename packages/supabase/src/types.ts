export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      article_tags: {
        Row: {
          article_id: number;
          tag_name: string;
        };
        Insert: {
          article_id: number;
          tag_name: string;
        };
        Update: {
          article_id?: number;
          tag_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "article_tags_article_id_fkey";
            columns: ["article_id"];
            isOneToOne: false;
            referencedRelation: "articles";
            referencedColumns: ["id"];
          },
        ];
      };
      articles: {
        Row: {
          author_id: string | null;
          category: string | null;
          cover_image: string | null;
          created_at: string | null;
          excerpt: string | null;
          id: number;
          published_at: string | null;
          reading_time: string | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          author_id?: string | null;
          category?: string | null;
          cover_image?: string | null;
          created_at?: string | null;
          excerpt?: string | null;
          id?: never;
          published_at?: string | null;
          reading_time?: string | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          author_id?: string | null;
          category?: string | null;
          cover_image?: string | null;
          created_at?: string | null;
          excerpt?: string | null;
          id?: never;
          published_at?: string | null;
          reading_time?: string | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      comments: {
        Row: {
          author_id: string;
          content: string;
          created_at: string;
          id: string;
          parent_id: string | null;
          post_id: string;
          updated_at: string;
        };
        Insert: {
          author_id: string;
          content: string;
          created_at?: string;
          id?: string;
          parent_id?: string | null;
          post_id: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string;
          content?: string;
          created_at?: string;
          id?: string;
          parent_id?: string | null;
          post_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      discussion_comments: {
        Row: {
          author_id: string | null;
          content: string;
          created_at: string | null;
          discussion_id: string | null;
          id: string;
          updated_at: string | null;
        };
        Insert: {
          author_id?: string | null;
          content: string;
          created_at?: string | null;
          discussion_id?: string | null;
          id?: string;
          updated_at?: string | null;
        };
        Update: {
          author_id?: string | null;
          content?: string;
          created_at?: string | null;
          discussion_id?: string | null;
          id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "discussion_comments_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "discussion_comments_discussion_id_fkey";
            columns: ["discussion_id"];
            isOneToOne: false;
            referencedRelation: "discussions";
            referencedColumns: ["id"];
          },
        ];
      };
      discussion_likes: {
        Row: {
          created_at: string | null;
          discussion_id: string | null;
          id: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          discussion_id?: string | null;
          id?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          discussion_id?: string | null;
          id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "discussion_likes_discussion_id_fkey";
            columns: ["discussion_id"];
            isOneToOne: false;
            referencedRelation: "discussions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "discussion_likes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      discussions: {
        Row: {
          author_id: string | null;
          category: string | null;
          content: string;
          created_at: string | null;
          id: string;
          tags: string[] | null;
          title: string;
          updated_at: string | null;
          views_count: number | null;
        };
        Insert: {
          author_id?: string | null;
          category?: string | null;
          content: string;
          created_at?: string | null;
          id?: string;
          tags?: string[] | null;
          title: string;
          updated_at?: string | null;
          views_count?: number | null;
        };
        Update: {
          author_id?: string | null;
          category?: string | null;
          content?: string;
          created_at?: string | null;
          id?: string;
          tags?: string[] | null;
          title?: string;
          updated_at?: string | null;
          views_count?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "discussions_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      events: {
        Row: {
          attendees_count: number;
          created_at: string;
          description: string;
          end_date: string;
          id: string;
          start_date: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          attendees_count?: number;
          created_at?: string;
          description: string;
          end_date: string;
          id?: string;
          start_date: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          attendees_count?: number;
          created_at?: string;
          description?: string;
          end_date?: string;
          id?: string;
          start_date?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      likes: {
        Row: {
          comment_id: string | null;
          created_at: string;
          id: string;
          post_id: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          comment_id?: string | null;
          created_at?: string;
          id?: string;
          post_id?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          comment_id?: string | null;
          created_at?: string;
          id?: string;
          post_id?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "likes_comment_id_fkey";
            columns: ["comment_id"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "likes_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "likes_user_id_fkey1";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      posts: {
        Row: {
          answer_id: string | null;
          author_id: string;
          category: string | null;
          content: string;
          created_at: string;
          id: string;
          solved: boolean | null;
          tags: string[] | null;
          thumbnail_url: string | null;
          title: string;
          type: string;
          updated_at: string;
          views_count: number;
        };
        Insert: {
          answer_id?: string | null;
          author_id: string;
          category?: string | null;
          content: string;
          created_at?: string;
          id?: string;
          solved?: boolean | null;
          tags?: string[] | null;
          thumbnail_url?: string | null;
          title: string;
          type: string;
          updated_at?: string;
          views_count?: number;
        };
        Update: {
          answer_id?: string | null;
          author_id?: string;
          category?: string | null;
          content?: string;
          created_at?: string;
          id?: string;
          solved?: boolean | null;
          tags?: string[] | null;
          thumbnail_url?: string | null;
          title?: string;
          type?: string;
          updated_at?: string;
          views_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["user_role"];
          updated_at: string;
          username: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          id: string;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
          username: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
          username?: string;
        };
        Relationships: [];
      };
      question_comments: {
        Row: {
          author_id: string | null;
          content: string;
          created_at: string | null;
          id: string;
          question_id: string | null;
          updated_at: string | null;
        };
        Insert: {
          author_id?: string | null;
          content: string;
          created_at?: string | null;
          id?: string;
          question_id?: string | null;
          updated_at?: string | null;
        };
        Update: {
          author_id?: string | null;
          content?: string;
          created_at?: string | null;
          id?: string;
          question_id?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "question_comments_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "question_comments_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "questions";
            referencedColumns: ["id"];
          },
        ];
      };
      question_likes: {
        Row: {
          created_at: string | null;
          id: string;
          question_id: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          question_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          question_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "question_likes_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "questions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "question_likes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      questions: {
        Row: {
          answer_id: string | null;
          author_id: string | null;
          category: string | null;
          content: string;
          created_at: string | null;
          id: string;
          solved: boolean | null;
          tags: string[] | null;
          title: string;
          updated_at: string | null;
          views_count: number | null;
        };
        Insert: {
          answer_id?: string | null;
          author_id?: string | null;
          category?: string | null;
          content: string;
          created_at?: string | null;
          id?: string;
          solved?: boolean | null;
          tags?: string[] | null;
          title: string;
          updated_at?: string | null;
          views_count?: number | null;
        };
        Update: {
          answer_id?: string | null;
          author_id?: string | null;
          category?: string | null;
          content?: string;
          created_at?: string | null;
          id?: string;
          solved?: boolean | null;
          tags?: string[] | null;
          title?: string;
          updated_at?: string | null;
          views_count?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "questions_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_discussion_view_count: {
        Args: { discussion_id: string };
        Returns: undefined;
      };
      increment_question_view_count: {
        Args: { question_id: string };
        Returns: undefined;
      };
      increment_view_count: {
        Args: { post_id: string };
        Returns: undefined;
      };
    };
    Enums: {
      user_role: "subscriber" | "participant" | "manager";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      user_role: ["subscriber", "participant", "manager"],
    },
  },
} as const;
