
import { Session, User } from '@supabase/supabase-js';

export interface AuthResult {
  error?: {
    message: string;
  } | null;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  authChecked?: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
}
