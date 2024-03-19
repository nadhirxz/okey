module.exports = {
	platform: 'node',
	target: 'node18',
	bundle: true,
	minify: true,
	tsconfig: 'tsconfig.json',
	entryPoints: ['src/index.ts'],
	outfile: 'dist/index.js',
	keepNames: true,
	sourcemap: true,
	logLevel: 'info',
};
