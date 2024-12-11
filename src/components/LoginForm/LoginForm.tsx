import { FC } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../api/queryClient';
import './LoginForm.css';
import { FormField } from '../../ui/FormField/FormField';
import { Button } from '../../ui/Button/Button';
import { User, fetchProfile, loginUser } from '../../api/User';
import { useAuth } from '../../contexts/AuthContext';

export interface ILoginFormProps {
  onLoginSuccess: (user: User) => void;
}

const CreateLoginFormSchema = z.object({
  email: z.string().email('Неверный формат email'),
  password: z.string().min(8, 'Длина пароля должна быть не менее 8 символов'),
});

type CreateLoginForm = z.infer<typeof CreateLoginFormSchema>;

export const LoginForm: FC<ILoginFormProps> = ({ onLoginSuccess }) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLoginForm>({
    resolver: zodResolver(CreateLoginFormSchema),
  });

  const createLoginMutation = useMutation(
    {
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
        } catch (error) {
          setServerError('Не удалось получить профиль пользователя.');
        }
      },
      onError: (error: any) => {
        setServerError(
          error.message ||
            'Произошла ошибка входа. Пожалуйста, попробуйте еще раз.',
        );
      },
    },
    queryClient,
  );

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit((data) => {
        console.log('Submitting login form with data:', data);
        createLoginMutation.mutate(data);
      })}
    >
      <FormField errorMessage={errors.email?.message}>
        <input
          placeholder="Электронная почта"
          className={`form-input form-input_mail ${errors.email ? 'input-error' : ''}`}
          {...register('email', { required: true })}
        />
      </FormField>

      <FormField errorMessage={errors.password?.message}>
        <input
          type="password"
          placeholder="Пароль"
          className={`form-input form-input_password ${errors.password ? 'input-error' : ''}`}
          {...register('password', { required: true })}
        />
      </FormField>

      {serverError && <span className="error-message">{serverError}</span>}

      <Button type="submit" isLoading={createLoginMutation.isPending}>
        Войти
      </Button>
    </form>
  );
};