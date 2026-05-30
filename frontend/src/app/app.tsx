import './app-init';
import './styles/app.css';

import { createInertiaApp } from '@inertiajs/react';
import type { Page } from '@inertiajs/core';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { resolvePage } from './lib/resolve-page';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const rootElement = document.getElementById('app')!;
const initialPage = JSON.parse(rootElement.dataset.page!) as Page;

createInertiaApp({
    page: initialPage,
    title: (title) => `${title} - ${appName}`,
    resolve: resolvePage,
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(el, <App {...props} />);
            return;
        }

        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
