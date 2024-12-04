import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { validateResponse } from './validateResponce';
export const API_URL = 'https://cinemaguide.skillbox.cc/';
export const MovieSchema = z.object({
    id: z.number(),
    title: z.string(),
    originalTitle: z.string(),
    language: z.string(),
    releaseYear: z.number().nullish(),
    releaseDate: z.string().nullish(),
    genres: z.array(z.string()),
    plot: z.string(),
    runtime: z.number().nullable(),
    budget: z.string().nullish(),
    revenue: z.string().nullish(),
    homepage: z.string(),
    status: z.string(),
    posterUrl: z.string().nullable().optional(),
    backdropUrl: z.string().nullish(),
    trailerUrl: z.string(),
    trailerYouTubeId: z.string().nullish(),
    tmdbRating: z.number(),
    searchL: z.string(),
    keywords: z.array(z.string().optional()),
    countriesOfOrigin: z.array(z.string().optional()),
    languages: z.array(z.string().optional()),
    cast: z.array(z.string().optional()),
    director: z.string().nullish(),
    production: z.string().nullish(),
    awardsSummary: z.string().nullish(),
});
export const MovieListSchema = z.array(MovieSchema);
export const GenreListSchema = z.array(z.string());
// Функция для получения данных о фильмах с валидацией
export function fetchMoviesData(url, schema) {
    return fetch(url)
        .then(validateResponse)
        .then((response) => response.json())
        .then((data) => {
        return schema.parse(data);
    })
        .catch((error) => {
        console.error('Ошибка при запросе или парсинге данных:', error);
        throw new Error(`Ошибка при запросе или парсинге данных: ${error.message}`);
    });
}
// Hook для работы с данными о фильмах
export function useMoviesData(url, schema) {
    return useQuery({
        queryKey: [url],
        queryFn: () => fetchMoviesData(url, schema),
    });
}
// Функция для получения фильма по ID
export async function getMovieById(movieId) {
    const response = await fetch(`${API_URL}movie/${movieId}`, {
        method: 'GET',
    });
    await validateResponse(response);
    const data = await response.json();
    return MovieSchema.parse(data);
}
// Функция для добавления фильма в избранное
export async function addMovieToFavorites(movieId) {
    try {
        const response = await fetch(`${API_URL}favorites`, {
            method: 'POST',
            body: new URLSearchParams({ id: String(movieId) }),
            credentials: 'include',
        });
        await validateResponse(response);
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        else {
            throw new Error('Сервер вернул не JSON');
        }
    }
    catch (error) {
        console.error('Ошибка при добавлении в избранное:', error);
        throw error;
    }
}
// Функция для удаления фильма из избранного
export async function removeMovieFromFavorites(movieId) {
    try {
        const response = await fetch(`${API_URL}favorites/${movieId}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        await validateResponse(response);
        return await response.json();
    }
    catch (error) {
        console.error('Ошибка при удалении из избранного:', error);
        throw error;
    }
}
// Функция для получения списка избранных фильмов
export async function getUserFavorites() {
    try {
        const response = await fetch(`${API_URL}favorites`, {
            method: 'GET',
            credentials: 'include',
        });
        await validateResponse(response);
        return await response.json();
    }
    catch (error) {
        console.error('Ошибка при получении избранных фильмов:', error);
        throw error;
    }
}
