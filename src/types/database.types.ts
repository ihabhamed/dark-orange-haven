
// This file defines the types used in the application code
// The database schema is defined in src/types/supabase.ts

export interface Service {
  id: string;
  title: string;
  description: string;
  full_description?: string;
  price: string;
  old_price?: string;
  duration?: string;
  discount_badge?: string;
  featured: boolean;
  display_order?: number;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category?: string;
  slug: string;
  image_url?: string;
  author: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface ConsultationRequest {
  id: string;
  service_id?: string;
  service_name?: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface GlobalSetting {
  id: string;
  key: string;
  value: any;
  updated_at: string;
}

export interface HomepageContent {
  id: string;
  key: string;
  title?: string;
  subtitle?: string;
  content?: string;
  visible: boolean;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'user';
  created_at: string;
}
