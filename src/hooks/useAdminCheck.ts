
// Mock admin check hook for frontend-only mode
export const useAdminCheck = () => {
  const checkUserRole = async () => {
    console.log('Mock admin check - no backend connection');
    return true; // Always return true in frontend-only mode
  };

  return { checkUserRole };
};
