import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

export default [
    {
        input: 'src/xrm-tab-map.ts',
        output: {
            name: 'XrmTabMap',
            format: 'cjs',
            file: pkg.main,
            sourcemap: 'inline',
        },
        plugins: [typescript(), resolve()],
    },
];
