export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      booking_seats: {
        Row: {
          booking_id: string
          created_at: string
          id: string
          seat_id: string
        }
        Insert: {
          booking_id: string
          created_at?: string
          id?: string
          seat_id: string
        }
        Update: {
          booking_id?: string
          created_at?: string
          id?: string
          seat_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_seats_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_seats_seat_id_fkey"
            columns: ["seat_id"]
            isOneToOne: false
            referencedRelation: "seats"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          created_at: string
          id: string
          payment_status: string | null
          screening_id: string
          total_price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          payment_status?: string | null
          screening_id: string
          total_price: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          payment_status?: string | null
          screening_id?: string
          total_price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_screening_id_fkey"
            columns: ["screening_id"]
            isOneToOne: false
            referencedRelation: "screenings"
            referencedColumns: ["id"]
          },
        ]
      }
      movies: {
        Row: {
          cast_members: string | null
          created_at: string
          description: string
          director: string | null
          duration: number
          genre: string
          id: string
          poster: string
          rating: number
          release_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          cast_members?: string | null
          created_at?: string
          description: string
          director?: string | null
          duration: number
          genre: string
          id?: string
          poster: string
          rating: number
          release_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          cast_members?: string | null
          created_at?: string
          description?: string
          director?: string | null
          duration?: number
          genre?: string
          id?: string
          poster?: string
          rating?: number
          release_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      screenings: {
        Row: {
          created_at: string
          date: string
          id: string
          movie_id: string
          price: number
          theater_id: string
          time: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          movie_id: string
          price: number
          theater_id: string
          time: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          movie_id?: string
          price?: number
          theater_id?: string
          time?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "screenings_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "screenings_theater_id_fkey"
            columns: ["theater_id"]
            isOneToOne: false
            referencedRelation: "theaters"
            referencedColumns: ["id"]
          },
        ]
      }
      seats: {
        Row: {
          created_at: string
          id: string
          number: number
          row: string
          theater_id: string
          type: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          number: number
          row: string
          theater_id: string
          type?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          number?: number
          row?: string
          theater_id?: string
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "seats_theater_id_fkey"
            columns: ["theater_id"]
            isOneToOne: false
            referencedRelation: "theaters"
            referencedColumns: ["id"]
          },
        ]
      }
      theaters: {
        Row: {
          capacity: number
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          capacity: number
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          capacity?: number
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
