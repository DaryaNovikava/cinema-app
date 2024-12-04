import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { registerUser } from '../../api/User';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../api/queryClient';
import './RegisterForm.css';
import { FormField } from '../../ui/FormField/FormField';
import { Button } from '../../ui/Button/Button';
const CreateRegisterFormSchema = z.object({
    name: z
        .string()
        .min(5, 'Длина имени пользователя должна быть не менее 5 символов'),
    surname: z
        .string()
        .min(5, 'Длина имени пользователя должна быть не менее 5 символов'),
    email: z.string().email('Неверный формат email'),
    password: z.string().min(8, 'Длина пароля должна быть не менее 8 символов'),
    // password: z.string().min(8, "Длина пароля должна быть не менее 8 символов"),
});
export const RegisterForm = ({ onRegistrationSuccess, }) => {
    const [serverError, setServerError] = useState(null);
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        resolver: zodResolver(CreateRegisterFormSchema),
    });
    const createRegisterMutation = useMutation({
        mutationFn: registerUser,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
            setServerError(null);
            if (onRegistrationSuccess) {
                onRegistrationSuccess();
            }
            reset();
        },
        onError: (error) => {
            setServerError(error.message ||
                'Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.');
        },
    }, queryClient);
    return (_jsxs("form", { className: "register-form", onSubmit: handleSubmit((data) => {
            createRegisterMutation.mutate(data);
        }), children: [_jsx(FormField, { errorMessage: errors.email?.message, children: _jsx("input", { placeholder: "\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430", className: `form-input form-input_mail ${errors.email ? 'input-error' : ''}`, ...register('email', { required: true }) }) }), _jsx(FormField, { errorMessage: errors.name?.message, children: _jsx("input", { placeholder: "\u0418\u043C\u044F", className: `form-input form-input_name ${errors.name ? 'input-error' : ''}`, ...register('name', { required: true }) }) }), _jsx(FormField, { errorMessage: errors.surname?.message, children: _jsx("input", { placeholder: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F", className: `form-input form-input_name ${errors.surname ? 'input-error' : ''}`, ...register('surname', { required: true }) }) }), _jsx(FormField, { errorMessage: errors.password?.message, children: _jsx("input", { type: "password", placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C", className: `form-input form-input_password ${errors.password ? 'input-error' : ''}`, ...register('password', { required: true }) }) }), _jsx(FormField, { errorMessage: errors.password?.message, children: _jsx("input", { type: "password", placeholder: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C", className: `form-input form-input_last form-input_password ${errors.password ? 'input-error' : ''}`, ...register('password', { required: true }) }) }), serverError && _jsx("span", { className: "error-message", children: serverError }), _jsx(Button, { type: "submit", isLoading: createRegisterMutation.isPending, children: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442" })] }));
};
