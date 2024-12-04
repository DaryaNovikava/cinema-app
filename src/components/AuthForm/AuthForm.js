import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import './AuthForm.css';
import logo from '../../assets/images/logo.svg';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../ui/Button/Button';
import { useModalContext } from '../../contexts/ModalContext';
export const AuthForm = () => {
    const [authType, setAuthType] = useState('register');
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
    const { login } = useAuth();
    const { closeModal } = useModalContext();
    const handleClick = () => {
        setAuthType((prevState) => prevState === 'register' || isRegistrationSuccess ? 'auth' : 'register');
        setIsRegistrationSuccess(false);
    };
    const handleRegistrationSuccess = () => {
        setIsRegistrationSuccess(true);
    };
    const handleLoginSuccess = (user) => {
        console.log('Login successful:', user);
        login(user);
        closeModal();
    };
    return (_jsxs("div", { className: "auth-form", children: [_jsx("img", { src: logo, className: "auth-form__logo", alt: "\u041B\u043E\u0433\u043E \u0441\u0430\u0439\u0442\u0430 CinemaGuide" }), _jsx("p", { className: "auth-form__title", children: isRegistrationSuccess
                    ? 'Регистрация завершена'
                    : authType === 'register'
                        ? 'Регистрация'
                        : '' }), isRegistrationSuccess ? (_jsx("p", { className: "registration-success", children: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0432\u0430\u0448\u0443 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0443\u044E \u043F\u043E\u0447\u0442\u0443 \u0434\u043B\u044F \u0432\u0445\u043E\u0434\u0430" })) : authType === 'register' ? (_jsx(RegisterForm, { onRegistrationSuccess: handleRegistrationSuccess })) : (_jsx(LoginForm, { onLoginSuccess: handleLoginSuccess })), _jsxs("div", { className: "auth-form__info", children: [!isRegistrationSuccess && (_jsx("button", { onClick: handleClick, className: "auth-form__link btn-reset", children: authType === 'register' ? 'У меня есть пароль' : 'Регистрация' })), isRegistrationSuccess && (_jsx(Button, { type: "submit", kind: "primary", onClick: handleClick, style: { width: '300px' }, children: "\u0412\u043E\u0439\u0442\u0438" }))] })] }));
};
