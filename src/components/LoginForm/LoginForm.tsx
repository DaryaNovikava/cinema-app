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
  email: z.string().email('Invalid format email'),
  password: z
    .string()
    .min(8, 'The password length must be at least 8 character'),
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
          setServerError('Failed to get user profile.');
        }
      },
      onError: (error: any) => {
        setServerError(
          error.message || 'There was an error login. Please try again.',
        );
      },
    },
    queryClient,
  );
  console.log(serverError);
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
          placeholder="E-mail"
          className={`form-input form-input_mail ${errors.email ? 'input-error' : ''}`}
          {...register('email', { required: true })}
        />
      </FormField>

      <FormField errorMessage={errors.password?.message}>
        <input
          type="password"
          placeholder="Password"
          className={`form-input form-input_password ${errors.password ? 'input-error' : ''}`}
          {...register('password', { required: true })}
        />
      </FormField>

      {serverError && <span className="error-message">{serverError}</span>}

      <Button type="submit" isLoading={createLoginMutation.isPending}>
        Login
      </Button>
    </form>
  );
};
