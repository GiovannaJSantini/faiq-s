export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_report_analyses: {
        Row: {
          action_plan_12_months: string | null
          action_plan_30_days: string | null
          action_plan_90_days: string | null
          area_specific_recommendations: Json | null
          assessment_id: string
          created_at: string | null
          edited_by: string | null
          executive_summary: string | null
          generated_at: string | null
          id: string
          is_manually_edited: boolean | null
          last_edited_at: string | null
          priority_recommendations: string | null
          risk_analysis: string | null
          swot_opportunities: string | null
          swot_strengths: string | null
          swot_threats: string | null
          swot_weaknesses: string | null
          updated_at: string | null
        }
        Insert: {
          action_plan_12_months?: string | null
          action_plan_30_days?: string | null
          action_plan_90_days?: string | null
          area_specific_recommendations?: Json | null
          assessment_id: string
          created_at?: string | null
          edited_by?: string | null
          executive_summary?: string | null
          generated_at?: string | null
          id?: string
          is_manually_edited?: boolean | null
          last_edited_at?: string | null
          priority_recommendations?: string | null
          risk_analysis?: string | null
          swot_opportunities?: string | null
          swot_strengths?: string | null
          swot_threats?: string | null
          swot_weaknesses?: string | null
          updated_at?: string | null
        }
        Update: {
          action_plan_12_months?: string | null
          action_plan_30_days?: string | null
          action_plan_90_days?: string | null
          area_specific_recommendations?: Json | null
          assessment_id?: string
          created_at?: string | null
          edited_by?: string | null
          executive_summary?: string | null
          generated_at?: string | null
          id?: string
          is_manually_edited?: boolean | null
          last_edited_at?: string | null
          priority_recommendations?: string | null
          risk_analysis?: string | null
          swot_opportunities?: string | null
          swot_strengths?: string | null
          swot_threats?: string | null
          swot_weaknesses?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_report_analyses_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: true
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      area_scores: {
        Row: {
          area_id: string
          area_name: string
          assessment_id: string
          created_at: string
          id: string
          max_score: number
          percentage: number
          total_score: number
        }
        Insert: {
          area_id: string
          area_name: string
          assessment_id: string
          created_at?: string
          id?: string
          max_score?: number
          percentage?: number
          total_score?: number
        }
        Update: {
          area_id?: string
          area_name?: string
          assessment_id?: string
          created_at?: string
          id?: string
          max_score?: number
          percentage?: number
          total_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "area_scores_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          assessment_date: string
          assessor_id: string
          assessor_name: string
          classification: Database["public"]["Enums"]["assessment_classification"]
          clinic_id: string
          created_at: string
          id: string
          max_score: number
          observations: string | null
          overall_percentage: number
          status: Database["public"]["Enums"]["assessment_status"]
          total_score: number
          updated_at: string
        }
        Insert: {
          assessment_date: string
          assessor_id: string
          assessor_name: string
          classification?: Database["public"]["Enums"]["assessment_classification"]
          clinic_id: string
          created_at?: string
          id?: string
          max_score?: number
          observations?: string | null
          overall_percentage?: number
          status?: Database["public"]["Enums"]["assessment_status"]
          total_score?: number
          updated_at?: string
        }
        Update: {
          assessment_date?: string
          assessor_id?: string
          assessor_name?: string
          classification?: Database["public"]["Enums"]["assessment_classification"]
          clinic_id?: string
          created_at?: string
          id?: string
          max_score?: number
          observations?: string | null
          overall_percentage?: number
          status?: Database["public"]["Enums"]["assessment_status"]
          total_score?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessments_assessor_id_fkey"
            columns: ["assessor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessments_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      category_scores: {
        Row: {
          area_score_id: string
          category_id: string
          category_name: string
          created_at: string
          id: string
          max_score: number
          percentage: number
          total_score: number
        }
        Insert: {
          area_score_id: string
          category_id: string
          category_name: string
          created_at?: string
          id?: string
          max_score?: number
          percentage?: number
          total_score?: number
        }
        Update: {
          area_score_id?: string
          category_id?: string
          category_name?: string
          created_at?: string
          id?: string
          max_score?: number
          percentage?: number
          total_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "category_scores_area_score_id_fkey"
            columns: ["area_score_id"]
            isOneToOne: false
            referencedRelation: "area_scores"
            referencedColumns: ["id"]
          },
        ]
      }
      clinics: {
        Row: {
          created_at: string
          email: string | null
          id: string
          location: string
          name: string
          phone: string | null
          responsible_name: string | null
          responsible_title: string | null
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          location: string
          name: string
          phone?: string | null
          responsible_name?: string | null
          responsible_title?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          location?: string
          name?: string
          phone?: string | null
          responsible_name?: string | null
          responsible_title?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      indicator_scores: {
        Row: {
          category_score_id: string
          created_at: string
          id: string
          indicator_id: string
          indicator_name: string
          notes: string | null
          score: number
          weight: number
        }
        Insert: {
          category_score_id: string
          created_at?: string
          id?: string
          indicator_id: string
          indicator_name: string
          notes?: string | null
          score: number
          weight?: number
        }
        Update: {
          category_score_id?: string
          created_at?: string
          id?: string
          indicator_id?: string
          indicator_name?: string
          notes?: string | null
          score?: number
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "indicator_scores_category_score_id_fkey"
            columns: ["category_score_id"]
            isOneToOne: false
            referencedRelation: "category_scores"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_consents: {
        Row: {
          consent_date: string | null
          consent_given: boolean
          consent_type: string
          created_at: string | null
          id: string
          ip_address: unknown
          updated_at: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          consent_date?: string | null
          consent_given?: boolean
          consent_type: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          updated_at?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          consent_date?: string | null
          consent_given?: boolean
          consent_type?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          level: Database["public"]["Enums"]["user_level"]
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          level?: Database["public"]["Enums"]["user_level"]
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          level?: Database["public"]["Enums"]["user_level"]
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_app_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["user_level"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "avaliador" | "cliente"
      assessment_classification: "excelencia" | "qualidade" | "padrao"
      assessment_status: "em_andamento" | "concluida" | "revisao"
      user_level: "padrao" | "qualidade" | "excelencia"
      user_role: "admin" | "cliente" | "avaliador"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "avaliador", "cliente"],
      assessment_classification: ["excelencia", "qualidade", "padrao"],
      assessment_status: ["em_andamento", "concluida", "revisao"],
      user_level: ["padrao", "qualidade", "excelencia"],
      user_role: ["admin", "cliente", "avaliador"],
    },
  },
} as const
