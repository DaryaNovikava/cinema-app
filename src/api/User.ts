import { z } from 'zod';
import { validateResponse } from './validateResponce';
import { API_URL } from './Movie';
import { useQuery } from '@tanstack/react-query';

export const UserSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  password: z.string().optional(),
  favorites: z.array(z.string()).optional(),
});

export type User = z.infer<typeof UserSchema>;

// Преобразование объекта данных в формат x-www-form-urlencoded
function toFormUrlEncoded(
  data: Record<string, string | number | boolean>,
): string {
  return Object.entries(data)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&');
}

// Получение профиля пользователя
export function fetchProfile(): Promise<User> {
  return fetch(`${API_URL}profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((response) => {
      return validateResponse(response);
    })
    .then((response) => response.json())
    .then((data) => {
      return UserSchema.parse(data);
    })
    .catch((error) => {
      console.error('Ошибка при получении профиля:', error);
      throw error;
    });
}

export function useUserProfile() {
  return useQuery<User>({
    queryKey: ['userProfile'],
    queryFn: fetchProfile,
  });
}

// Авторизация пользователя
export function loginUser(data: {
  email: string;
  password: string;
}): Promise<unknown> {
  return fetch(`${API_URL}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: toFormUrlEncoded(data),
    credentials: 'include',
  })
    .then((response) => validateResponse(response))
    .catch((error) => {
      console.error('Ошибка авторизации:', error);
      throw error;
    });
}

export function registerUser(data: {
  name: string;
  surname: string;
  email: string;
  password: string;
}): Promise<void> {
  console.log('Отправляем запрос на регистрацию пользователя', data);
  return fetch(`${API_URL}user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: toFormUrlEncoded(data),
    credentials: 'include',
  })
    .then((response) => {
      return validateResponse(response);
    })
    .then(() => {
      console.log('регистрация успешна');
    })
    .catch((error) => {
      if (error.status === 409) {
        throw new Error('Пользователь с таким email уже существует.');
      } else {
        throw new Error(
          'Произошла ошибка при регистрации. Попробуйте еще раз.',
        );
      }
    });
}

export function logout(): Promise<void> {
  return fetch(`${API_URL}auth/logout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((response) => {
      return validateResponse(response);
    })
    .then(() => undefined);
}
