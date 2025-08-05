import { defineConfig } from 'tsup';
import pkg from './package.json';

export default defineConfig((options) => ({
export default defineConfig((options) => ({
    entry: ['src/index.tsx'],
    format: ['esm', 'cjs'],
    outExtension: ext => ({
        esm: '.mjs',
        cjs: '.cjs',
    }),
    dts: true,
    watch: options.watch,
    clean: true,
}));
    banner: {
        js: `/**
 * ${pkg.name} v${pkg.version}
 * Author: ${pkg.author}
 */
    `,
    },
}));