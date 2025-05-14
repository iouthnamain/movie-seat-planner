
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole?: 'customer' | 'staff' | 'admin';
};

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  
  // Show loading until auth is determined
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // If no user is logged in, redirect to auth
  if (!user) {
    return <Navigate to="/auth" />;
  }

  // If a specific role is required, check if user has it
  if (requiredRole) {
    if (!profile) {
      // If profile isn't loaded yet, show loading
      return <div className="flex items-center justify-center min-h-screen">Loading profile...</div>;
    }
    
    if (
      (requiredRole === 'admin' && profile.role !== 'admin') ||
      (requiredRole === 'staff' && profile.role !== 'staff' && profile.role !== 'admin')
    ) {
      // If user doesn't have the required role, redirect to unauthorized
      return <Navigate to="/unauthorized" />;
    }
  }
  
  // If all checks pass, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
