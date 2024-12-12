import { FC } from 'react';
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

export interface IRegisterFormProps {
  onRegistrationSuccess?: () => void;
}

const CreateRegisterFormSchema = z
  .object({
    name: z.string().min(5, 'Username length must be at least 5 characters'),
    surname: z.string().min(5, 'Username length must be at least 5 characters'),
    email: z.string().email('Invalid format email'),
    password: z
      .string()
      .min(8, 'The password length must be at least 8 characters.'),
    confirmPassword: z
      .string()
      .min(8, 'The password length must be at least 8 characters.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'The passwords do not match',
    path: ['confirmPassword'],
  });

type CreateRegisterForm = z.infer<typeof CreateRegisterFormSchema>;

export const RegisterForm: FC<IRegisterFormProps> = ({
  onRegistrationSuccess,
}) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRegisterForm>({
    resolver: zodResolver(CreateRegisterFormSchema),
  });

  const createRegisterMutation = useMutation(
    {
      mutationFn: registerUser,
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
        setServerError(null);
        if (onRegistrationSuccess) {
          onRegistrationSuccess();
        }
        reset();
      },
      onError: (error: any) => {
        setServerError(
          error.message || 'There was an error registering. Please try again.',
        );
      },
    },
    queryClient,
  );

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit((data) => {
        createRegisterMutation.mutate(data);
      })}
    >
      <FormField errorMessage={errors.email?.message}>
        <input
          placeholder="E-mail"
          className={`form-input form-input_mail ${errors.email ? 'input-error' : ''}`}
          {...register('email', { required: true })}
        />
      </FormField>

      <FormField errorMessage={errors.name?.message}>
        <input
          placeholder="Name"
          className={`form-input form-input_name ${errors.name ? 'input-error' : ''}`}
          {...register('name', { required: true })}
        />
      </FormField>

      <FormField errorMessage={errors.surname?.message}>
        <input
          placeholder="Surname"
          className={`form-input form-input_name ${errors.surname ? 'input-error' : ''}`}
          {...register('surname', { required: true })}
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

      <FormField errorMessage={errors.confirmPassword?.message}>
        <input
          type="password"
          placeholder="Confirm password"
          className={`form-input form-input_last form-input_password ${errors.confirmPassword ? 'input-error' : ''}`}
          {...register('confirmPassword', { required: true })}
        />
      </FormField>

      {serverError && <span className="error-message">{serverError}</span>}

      <Button type="submit" isLoading={createRegisterMutation.isPending}>
        Create account
      </Button>
    </form>
  );
};
