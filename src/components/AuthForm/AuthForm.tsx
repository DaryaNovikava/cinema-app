import { useState } from "react";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import "./AuthForm.css";
import logo from '../../assets/images/logo.svg'
import { User } from "../../api/User";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../ui/Button/Button";
import { useModalContext } from "../../contexts/ModalContext";

interface AuthFormProps {
}

export const AuthForm: React.FC<AuthFormProps> = () => {
  const [authType, setAuthType] = useState<string>("register");
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState<boolean>(false)
 const { login } = useAuth();
 const { closeModal } = useModalContext();
  // const [user, setUser] = useState<User | null>(null)

  const handleClick = () => {
    setAuthType((prevState) =>
      prevState === "register" || isRegistrationSuccess ? "auth" : "register",
    );
    setIsRegistrationSuccess(false);
  };

  const handleRegistrationSuccess = () => {
    setIsRegistrationSuccess(true);
  }

  const handleLoginSuccess = (user: User) => {
    console.log('Login successful:', user);
    login(user)
    closeModal()
  };

  return (
    <div className="auth-form">
      <img src={logo} className="auth-form__logo" alt="Лого сайта CinemaGuide" />
      <p className="auth-form__title">
        {isRegistrationSuccess ? "Регистрация завершена" : authType === "register" ? "Регистрация" : ""}</p>
      {isRegistrationSuccess ? (
        <p className="registration-success">Используйте вашу электронную почту для входа</p>
      ) : (
        authType === "register" ? (
          <RegisterForm onRegistrationSuccess={handleRegistrationSuccess} />
        ) : (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        )
      )}

      <div className="auth-form__info">
        {!isRegistrationSuccess && (
          <button onClick={handleClick} className="auth-form__link btn-reset">
            {authType === "register" ? "У меня есть пароль" : "Регистрация"}
          </button>
        )}
         {isRegistrationSuccess && (
          <Button type="submit" kind="primary" onClick={handleClick} style={{width:"300px"}}>Войти</Button>
          // <button onClick={handleClick} className="auth-form__link btn-reset">
          //   {authType === "register" ? "У меня есть пароль" : "Регистрация"}
          // </button>
        )}

        {/* <button className="auth-form__button" onClick={handleClick}>
          {authType === "register" ? "Войти" : "Создать аккаунт"}
        </button> */}
      </div>
    </div>
  );
};
