import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

const extensions = ['.js', '.jsx', '.ts', '.tsx']
const plugins = [
    json(),
    resolve({ browser: true, modulesOnly: true }),
    typescript({ sourceMap: true }),
    babel({
        extensions,
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
    }),
]

export default [
    {
        input: 'src/index.ts',
        plugins: [...plugins, terser({ toplevel: true })],
    },
]
