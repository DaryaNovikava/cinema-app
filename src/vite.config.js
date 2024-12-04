import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
    base: '/cinema-app/', // Укажите ваш репозиторий
    plugins: [react()],
    build: {
        rollupOptions: {
            // Это важно для обработки внешних ресурсов
            input: './index.html',
        },
    },
});
