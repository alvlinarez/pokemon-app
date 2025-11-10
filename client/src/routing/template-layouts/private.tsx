import { Navigate, Outlet } from 'react-router';

import { useAuth } from '../../context';
import { Box } from '@mui/material';

interface PrivateProps {
  redirectRoute: string;
}
export function Private({ redirectRoute }: PrivateProps) {
  const { isUserLoggedIn, isUserLoading } = useAuth();
  if (isUserLoading) {
    return <Box>Loading...</Box>;
  }

  if (!isUserLoggedIn) {
    return <Navigate to={redirectRoute} replace />;
  }

  return <Outlet />;
}
