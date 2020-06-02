import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import typescript from 'rollup-plugin-typescript2';

export default {
	input: './src/cellx-react.ts',

	output: {
		file: './dist/cellx-react.umd.js',
		format: 'umd',
		name: 'cellx-react',

		globals: {
			cellx: 'cellx'
		}
	},

	external: ['cellx'],

	// prettier-ignore
	plugins: [
		nodeResolve({ browser: true }),
		commonjs({ include: /node_modules/ }),
		eslint(),
		typescript({ clean: true })
	]
};
