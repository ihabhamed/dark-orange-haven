
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * Hook to check if a user has admin role
 */
export const useAdminCheck = () => {
  const checkUserRole = async (userId: string): Promise<boolean> => {
    try {
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .single();
      
      if (rolesError && rolesError.code !== 'PGRST116') {
        console.error('Error fetching user role:', rolesError);
        return false;
      }
      
      return !!userRoles;
    } catch (error) {
      console.error('Error in checkUserRole:', error);
      return false;
    }
  };

  return { checkUserRole };
};
