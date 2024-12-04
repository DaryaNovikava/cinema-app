import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../api/queryClient';
import './LoginForm.css';
import { FormField } from '../../ui/FormField/FormField';
import { Button } from '../../ui/Button/Button';
import { fetchProfile, loginUser } from '../../api/User';
import { useAuth } from '../../contexts/AuthContext';
const CreateLoginFormSchema = z.object({
    email: z.string().email('Неверный формат email'),
    password: z.string().min(8, 'Длина пароля должна быть не менее 8 символов'),
});
export const LoginForm = ({ onLoginSuccess }) => {
    const [serverError, setServerError] = useState(null);
    const { login } = useAuth();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        resolver: zodResolver(CreateLoginFormSchema),
    });
    const createLoginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: async () => {
            setServerError(null);
            try {
                const user = await fetchProfile();
                console.log('Fetched user profile:', user);
                login(user);
                reset();
                if (onLoginSuccess) {
                    onLoginSuccess(user);
                }
                queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
            }
            catch (error) {
                setServerError('Не удалось получить профиль пользователя.');
            }
        },
        onError: (error) => {
            setServerError(error.message ||
                'Произошла ошибка входа. Пожалуйста, попробуйте еще раз.');
        },
    }, queryClient);
    return (_jsxs("form", { className: "login-form", onSubmit: handleSubmit((data) => {
            console.log('Submitting login form with data:', data);
            createLoginMutation.mutate(data);
        }), children: [_jsx(FormField, { errorMessage: errors.email?.message, children: _jsx("input", { placeholder: "\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430", className: `form-input form-input_mail ${errors.email ? 'input-error' : ''}`, ...register('email', { required: true }) }) }), _jsx(FormField, { errorMessage: errors.password?.message, children: _jsx("input", { type: "password", placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C", className: `form-input form-input_password ${errors.password ? 'input-error' : ''}`, ...register('password', { required: true }) }) }), serverError && _jsx("span", { className: "error-message", children: serverError }), _jsx(Button, { type: "submit", isLoading: createLoginMutation.isPending, children: "\u0412\u043E\u0439\u0442\u0438" })] }));
};
