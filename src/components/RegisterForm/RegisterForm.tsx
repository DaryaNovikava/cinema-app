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
    name: z
      .string()
      .min(5, 'Длина имени пользователя должна быть не менее 5 символов'),
    surname: z
      .string()
      .min(5, 'Длина имени пользователя должна быть не менее 5 символов'),
    email: z.string().email('Неверный формат email'),
    password: z.string().min(8, 'Длина пароля должна быть не менее 8 символов'),
    confirmPassword: z
      .string()
      .min(8, 'Длина пароля должна быть не менее 8 символов'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
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
          error.message ||
            'Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.',
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
          placeholder="Электронная почта"
          className={`form-input form-input_mail ${errors.email ? 'input-error' : ''}`}
          {...register('email', { required: true })}
        />
      </FormField>

      <FormField errorMessage={errors.name?.message}>
        <input
          placeholder="Имя"
          className={`form-input form-input_name ${errors.name ? 'input-error' : ''}`}
          {...register('name', { required: true })}
        />
      </FormField>

      <FormField errorMessage={errors.surname?.message}>
        <input
          placeholder="Фамилия"
          className={`form-input form-input_name ${errors.surname ? 'input-error' : ''}`}
          {...register('surname', { required: true })}
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

      <FormField errorMessage={errors.confirmPassword?.message}>
        <input
          type="password"
          placeholder="Подтвердите пароль"
          className={`form-input form-input_last form-input_password ${errors.confirmPassword ? 'input-error' : ''}`}
          {...register('confirmPassword', { required: true })}
        />
      </FormField>

      {serverError && <span className="error-message">{serverError}</span>}

      <Button type="submit" isLoading={createRegisterMutation.isPending}>
        Создать аккаунт
      </Button>
    </form>
  );
};
