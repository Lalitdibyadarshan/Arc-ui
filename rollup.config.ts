import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import visualizer from 'rollup-plugin-visualizer';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import { eslint } from 'rollup-plugin-eslint';

const production = process.argv.includes('prod');

export default {
	input: 'src/index.ts',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
		},
		{
			file: pkg.module,
			format: 'esm',
			sourcemap: true,
		},
	],
	external: ['react', 'react-dom'],
	plugins: [
		resolve(),
		commonjs(),
		postcss({
			extract: true,
			modules: true,
			use: ['sass'],
		}),
        eslint({
			throwOnError: true,
			fix: !production
		}),
		typescript({
			useTsconfigDeclarationDir: true,
		}),
		terser(),
		visualizer({
			filename: 'bundle-analysis.html',
			open: !production,
		})
	],
};
