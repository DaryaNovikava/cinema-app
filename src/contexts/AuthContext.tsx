import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  FC,
} from 'react';
import { User } from '../api/User';
import { fetchProfile } from '../api/User';
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

  useEffect(() => {
    fetchProfile()
      .then((fetchedUser) => {
        setUser(fetchedUser);
        setIsLogged(true);
      })
      .catch((error) => {
        console.error('Не удалось восстановить сессию:', error);
        setIsLogged(false);
      });
  }, []);

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
        localStorage.removeItem('token');
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
