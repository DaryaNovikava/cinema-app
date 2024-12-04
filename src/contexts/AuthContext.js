import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect, } from 'react';
import { useUserProfile } from '../api/User';
import { useMutation } from '@tanstack/react-query';
import { logout as logoutApi } from '../api/User';
import { queryClient } from '../api/queryClient';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children, }) => {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const { data, isError } = useUserProfile();
    useEffect(() => {
        if (data) {
            setUser(data);
            setIsLogged(true);
        }
        else if (isError) {
            setUser(null);
            setIsLogged(false);
        }
    }, [data, isError]);
    const login = (user) => {
        if (user) {
            setUser(user);
            setIsLogged(true);
            console.log('User logged in:', user);
        }
    };
    const logoutMutation = useMutation({
        mutationFn: logoutApi,
        onSuccess() {
            setUser(null);
            setIsLogged(false);
            queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
        },
        onError: (error) => {
            console.error('Ошибка при выходе:', error.message);
        },
    }, queryClient);
    const logout = () => {
        logoutMutation.mutate();
    };
    return (_jsx(AuthContext.Provider, { value: { user, isLogged, login, logout, setUser }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
export default AuthContext;
