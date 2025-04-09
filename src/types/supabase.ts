
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          title: string
          description: string
          full_description: string | null
          price: string
          old_price: string | null
          duration: string | null
          discount_badge: string | null
          featured: boolean
          display_order: number | null
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          full_description?: string | null
          price: string
          old_price?: string | null
          duration?: string | null
          discount_badge?: string | null
          featured?: boolean
          display_order?: number | null
          slug?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          full_description?: string | null
          price?: string
          old_price?: string | null
          duration?: string | null
          discount_badge?: string | null
          featured?: boolean
          display_order?: number | null
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          excerpt: string
          content: string
          category: string | null
          slug: string
          image_url: string | null
          author: string
          published_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          excerpt: string
          content: string
          category?: string | null
          slug?: string
          image_url?: string | null
          author?: string
          published_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          excerpt?: string
          content?: string
          category?: string | null
          slug?: string
          image_url?: string | null
          author?: string
          published_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      consultation_requests: {
        Row: {
          id: string
          service_id: string | null
          service_name: string | null
          name: string
          email: string
          phone: string | null
          message: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          service_id?: string | null
          service_name?: string | null
          name: string
          email: string
          phone?: string | null
          message?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          service_id?: string | null
          service_name?: string | null
          name?: string
          email?: string
          phone?: string | null
          message?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      global_settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          updated_at?: string
        }
      }
      homepage_content: {
        Row: {
          id: string
          key: string
          title: string | null
          subtitle: string | null
          content: string | null
          visible: boolean
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          title?: string | null
          subtitle?: string | null
          content?: string | null
          visible?: boolean
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          title?: string | null
          subtitle?: string | null
          content?: string | null
          visible?: boolean
          updated_at?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: "admin" | "user"
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role?: "admin" | "user"
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: "admin" | "user"
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          role: "admin" | "user"
        }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          id: string
          name: string
          owner: string | null
          created_at: string | null
          updated_at: string | null
          public: boolean | null
        }
        Insert: {
          id: string
          name: string
          owner?: string | null
          created_at?: string | null
          updated_at?: string | null
          public?: boolean | null
        }
        Update: {
          id?: string
          name?: string
          owner?: string | null
          created_at?: string | null
          updated_at?: string | null
          public?: boolean | null
        }
      }
      objects: {
        Row: {
          id: string
          bucket_id: string
          name: string
          owner: string | null
          created_at: string | null
          updated_at: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          bucket_id: string
          name: string
          owner?: string | null
          created_at?: string | null
          updated_at?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          bucket_id?: string
          name?: string
          owner?: string | null
          created_at?: string | null
          updated_at?: string | null
          metadata?: Json | null
        }
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
  auth: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
        }
        Insert: {
          id: string
          email: string
        }
        Update: {
          id?: string
          email?: string
        }
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
