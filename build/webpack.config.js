const { resolve } = require('path')

module.exports = {
	entries: {
		'editor': resolve(__dirname, '../resources/assets/scripts/editor/block.js'),
		'public': resolve(__dirname, '../resources/assets/scripts/public/index.js'),
		'editor-style': resolve(__dirname, '../resources/assets/styles/public.css'),
		'public-style': resolve(__dirname, '../resources/assets/styles/editor.css'),
	},
	stats: {
		all: false,
		errors: true,
		maxModules: 0,
		modules: true,
		warnings: true,
		assets: true,
		errorDetails: true,
		excludeAssets: /\.(jpe?g|png|gif|svg|woff|woff2)$/i,
		moduleTrace: true,
		performance: true,
	},
	browserSync: {
		host: 'localhost',
		port: 3000,
		proxy: 'http://tenup-scaffold.test',
		open: false,
		files: [
			'**/*.php',
			'dist/js/**/*.js',
			'dist/css/**/*.css',
			'dist/svg/**/*.svg',
			'dist/images/**/*.{jpg,jpeg,png,gif}',
			'dist/fonts/**/*.{eot,ttf,woff,woff2,svg}',
		],
	},
	performance: {
		maxAssetSize: 100000,
	},
}
