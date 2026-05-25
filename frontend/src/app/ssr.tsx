import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import ReactDOMServer from 'react-dom/server';
import { route, RouteName } from 'ziggy-js';
import { resolvePage } from './lib/resolve-page';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: resolvePage,
        setup: ({ App, props }) => {
            global.route = ((name: RouteName, params?: unknown, absolute?: boolean) =>
                route(name, params as any, absolute, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location),
                })) as typeof route;

            return <App {...props} />;
        },
    }),
);
