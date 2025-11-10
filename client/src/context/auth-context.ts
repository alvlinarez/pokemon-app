import { createContext, useContext } from 'react';
import type { IUser } from '../types';

interface IAuthContext {
  user: IUser | null;
  isUserLoading: boolean;
  isUserLoggedIn: boolean;
  updateUser: (user: IUser | null) => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  isUserLoading: false,
  isUserLoggedIn: false,
} as IAuthContext);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a service provider.');
  }
  return useContext(AuthContext);
}
