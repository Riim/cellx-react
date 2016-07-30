var webpack = require('webpack');

module.exports = {
	output: {
		library: 'cellx-react',
		libraryTarget: 'umd'
	},

	externals: ['cellx', 'react'],

	node: {
		console: false,
		global: false,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
		setImmediate: false
	}
};
