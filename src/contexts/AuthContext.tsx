import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
} from 'react';
import { User, useUserProfile } from '../api/User';
import { useMutation } from '@tanstack/react-query';
import { logout as logoutApi } from '../api/User';
import { queryClient } from '../api/queryClient';

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLogged: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const { data, isError } = useUserProfile();

  useEffect(() => {
    if (data) {
      setUser(data);
      setIsLogged(true);
    } else if (isError) {
      setUser(null);
      setIsLogged(false);
    }
  }, [data, isError]);

  const login = (user: User) => {
    if (user) {
      setUser(user);
      setIsLogged(true);
      console.log('User logged in:', user);
    }
  };

  const logoutMutation = useMutation(
    {
      mutationFn: logoutApi,
      onSuccess() {
        setUser(null);
        setIsLogged(false);
        queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
      },
      onError: (error: any) => {
        console.error('Ошибка при выходе:', error.message);
      },
    },
    queryClient,
  );

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <AuthContext.Provider value={{ user, isLogged, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
