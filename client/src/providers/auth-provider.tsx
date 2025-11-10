import { type PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { AuthContext, useService } from '../context';
import type { IUser } from '../types';

export function AuthProvider({ children }: PropsWithChildren) {
  const { authService } = useService();
  const [user, setUser] = useState<IUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);

  const checkAuth = useCallback(async () => {
    try {
      setIsUserLoading(true);
      const userData = await authService.getMe();
      setUser(userData);
    } catch (e) {
      console.error(e);
      setUser(null);
    } finally {
      setIsUserLoading(false);
    }
  }, [authService]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const updateUser = (user: IUser | null) => {
    setUser(user);
  };

  return <AuthContext.Provider value={{ user, isUserLoading, isUserLoggedIn: Boolean(user), updateUser }}>{children}</AuthContext.Provider>;
}
