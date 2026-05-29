import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        hmr: {
            host: 'localhost',
            clientPort: 5173,
        },
        ...(process.env.VITE_DOCKER === 'true' ? { watch: { usePolling: true } } : {}),
    },
    plugins: [
        laravel({
            publicDirectory: 'backend/public',
            buildDirectory: 'build',
            input: 'src/app/app.tsx',
            ssr: 'src/app/ssr.tsx',
            ssrOutputDirectory: 'backend/bootstrap/ssr',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@app': path.resolve(__dirname, './src/app'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@types': path.resolve(__dirname, './src/types'),
        },
    },
});
