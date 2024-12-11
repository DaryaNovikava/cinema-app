import { useState } from 'react';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import './AuthForm.css';
import logo from '../../assets/images/logo.svg';
import { User } from '../../api/User';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../ui/Button/Button';

interface AuthFormProps {
  onClose: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onClose }) => {
  const [authType, setAuthType] = useState<string>('register');
  const [isRegistrationSuccess, setIsRegistrationSuccess] =
    useState<boolean>(false);
  const { login } = useAuth();

  const handleClick = () => {
    setAuthType((prevState) =>
      prevState === 'register' || isRegistrationSuccess ? 'auth' : 'register',
    );
    setIsRegistrationSuccess(false);
  };

  const handleRegistrationSuccess = () => {
    setIsRegistrationSuccess(true);
  };

  const handleLoginSuccess = (user: User) => {
    console.log('Login successful:', user);
    login(user);
    onClose();
  };

  return (
    <div className="auth-form">
      <img
        src={logo}
        className="auth-form__logo"
        alt="Лого сайта CinemaGuide"
      />
      <p className="auth-form__title">
        {isRegistrationSuccess
          ? 'Registration completed'
          : authType === 'register'
            ? 'Registration'
            : ''}
      </p>
      {isRegistrationSuccess ? (
        <p className="registration-success">Use your email to sign in</p>
      ) : authType === 'register' ? (
        <RegisterForm onRegistrationSuccess={handleRegistrationSuccess} />
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}

      <div className="auth-form__info">
        {!isRegistrationSuccess && (
          <button onClick={handleClick} className="auth-form__link btn-reset">
            {authType === 'register' ? 'I have a password' : 'Registration'}
          </button>
        )}
        {isRegistrationSuccess && (
          <Button
            type="submit"
            kind="primary"
            onClick={handleClick}
            style={{ width: '300px' }}
          >
            Enter
          </Button>
        )}
      </div>
    </div>
  );
};
