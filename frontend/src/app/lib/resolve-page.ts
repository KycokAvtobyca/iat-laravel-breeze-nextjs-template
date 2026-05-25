import type { ResolvedComponent } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const pages = import.meta.glob<{ default: ResolvedComponent }>(
    '../../pages/**/*.tsx',
);

const pageDirectory = (name: string) => {
    const parts = name.split('/');
    const fileName = parts.pop();

    if (!fileName) {
        throw new Error(`Unable to resolve empty Inertia page name: ${name}`);
    }

    const folders = parts.length > 0 ? parts : [fileName];

    return {
        fileName,
        path: folders.map((part) => part.toLowerCase()).join('/'),
    };
};

export const resolvePage = (name: string) => {
    const { fileName, path } = pageDirectory(name);

    return resolvePageComponent<{ default: ResolvedComponent }>(
        `../../pages/${path}/ui/${fileName}.tsx`,
        pages,
    ).then((module) => module.default);
};
