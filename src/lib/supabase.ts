
// Mock Supabase client for frontend-only mode
console.log('🚨 Using mock Supabase client - No backend connection');

export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ data: null, error: null }),
    signUp: async () => ({ data: null, error: null }),
    signOut: async () => ({ error: null })
  },
  from: () => ({
    select: () => ({
      eq: () => ({ single: async () => ({ data: null, error: null }) })
    }),
    insert: () => ({ error: null }),
    update: () => ({ eq: () => ({ error: null }) }),
    delete: () => ({ eq: () => ({ error: null }) }),
    order: () => ({ data: [], error: null })
  }),
  storage: {
    from: () => ({
      upload: async () => ({ error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } })
    })
  },
  functions: {
    invoke: async () => ({ data: null, error: null })
  }
};
