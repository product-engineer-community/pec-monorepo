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
      assignment: {
        Row: {
          checklist: string[] | null;
          example_image_url: string | null;
          id: string;
          order: number | null;
          output: string | null;
          process: string[] | null;
          purpose: string | null;
          tips: string[] | null;
          title: string;
          week: number;
        };
        Insert: {
          checklist?: string[] | null;
          example_image_url?: string | null;
          id?: string;
          order?: number | null;
          output?: string | null;
          process?: string[] | null;
          purpose?: string | null;
          tips?: string[] | null;
          title: string;
          week: number;
        };
        Update: {
          checklist?: string[] | null;
          example_image_url?: string | null;
          id?: string;
          order?: number | null;
          output?: string | null;
          process?: string[] | null;
          purpose?: string | null;
          tips?: string[] | null;
          title?: string;
          week?: number;
        };
        Relationships: [];
      };
      camp_sessions: {
        Row: {
          created_at: string;
          generation: string;
          id: string;
          session_date: string;
          updated_at: string;
          week: number;
        };
        Insert: {
          created_at?: string;
          generation: string;
          id?: string;
          session_date: string;
          updated_at?: string;
          week: number;
        };
        Update: {
          created_at?: string;
          generation?: string;
          id?: string;
          session_date?: string;
          updated_at?: string;
          week?: number;
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
      feedback_session: {
        Row: {
          camp_session_id: string | null;
          date: string;
          id: string;
          team_id: string | null;
        };
        Insert: {
          camp_session_id?: string | null;
          date: string;
          id?: string;
          team_id?: string | null;
        };
        Update: {
          camp_session_id?: string | null;
          date?: string;
          id?: string;
          team_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "feedback_session_camp_session_id_fkey";
            columns: ["camp_session_id"];
            isOneToOne: false;
            referencedRelation: "camp_sessions";
            referencedColumns: ["id"];
          },
        ];
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
      points: {
        Row: {
          author_id: string;
          point: number;
        };
        Insert: {
          author_id: string;
          point?: number;
        };
        Update: {
          author_id?: string;
          point?: number;
        };
        Relationships: [
          {
            foreignKeyName: "points_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: true;
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
          type: "article" | "productivity" | "nextjs" | "fsd";
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
          type: "article" | "productivity" | "nextjs" | "fsd";
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
          type?: "article" | "productivity" | "nextjs" | "fsd";
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
          camp_generation: number | null;
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["user_role"];
          updated_at: string;
          username: string;
        };
        Insert: {
          avatar_url?: string | null;
          camp_generation?: number | null;
          created_at?: string;
          id: string;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
          username: string;
        };
        Update: {
          avatar_url?: string | null;
          camp_generation?: number | null;
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
          username?: string;
        };
        Relationships: [];
      };
      regular_session: {
        Row: {
          id: string;
          regular_session_guide_url: string | null;
          title: string;
          week: number;
        };
        Insert: {
          id?: string;
          regular_session_guide_url?: string | null;
          title: string;
          week: number;
        };
        Update: {
          id?: string;
          regular_session_guide_url?: string | null;
          title?: string;
          week?: number;
        };
        Relationships: [];
      };
      session_zoom_url: {
        Row: {
          created_at: string;
          id: string;
          type: string;
          zoom_url: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          type: string;
          zoom_url: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          type?: string;
          zoom_url?: string;
        };
        Relationships: [];
      };
      task: {
        Row: {
          assignment_order: number | null;
          created_at: string | null;
          id: string;
          task_type: string;
          updated_at: string | null;
          user_id: string;
          value: string | null;
          value_type: string | null;
          week: number | null;
        };
        Insert: {
          assignment_order?: number | null;
          created_at?: string | null;
          id?: string;
          task_type: string;
          updated_at?: string | null;
          user_id: string;
          value?: string | null;
          value_type?: string | null;
          week?: number | null;
        };
        Update: {
          assignment_order?: number | null;
          created_at?: string | null;
          id?: string;
          task_type?: string;
          updated_at?: string | null;
          user_id?: string;
          value?: string | null;
          value_type?: string | null;
          week?: number | null;
        };
        Relationships: [];
      };
      team: {
        Row: {
          avatar_url: string | null;
          generation: number;
          id: string;
          name: string;
          user_ids: string[] | null;
        };
        Insert: {
          avatar_url?: string | null;
          generation: number;
          id?: string;
          name: string;
          user_ids?: string[] | null;
        };
        Update: {
          avatar_url?: string | null;
          generation?: number;
          id?: string;
          name?: string;
          user_ids?: string[] | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
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
