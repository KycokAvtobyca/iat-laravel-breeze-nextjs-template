import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'src/ts/app.tsx',
            ssr: 'src/ts/ssr.tsx',
            refresh: true,
        }),
        react(),
    ],
});
