import { Navigate, Outlet } from 'react-router';

import { useAuth } from '../../context';

interface PrivateProps {
  redirectRoute: string;
}
export function Private({ redirectRoute }: PrivateProps) {
  const { isUserLoggedIn } = useAuth();

  if (!isUserLoggedIn) {
    return <Navigate to={redirectRoute} replace />;
  }

  return <Outlet />;
}
