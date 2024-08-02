/** @format */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	build: {
		sourcemap: true,
		rollupOptions: {
			external: [
				'@sanity/vision',
				'sanity-plugin-asset-source-unsplash',
				'sanity-plugin-mux-input',
				'sanity/structure',
			],
		},
	},
	optimizeDeps: {
		exclude: [
			'@sanity/vision',
			'sanity-plugin-asset-source-unsplash',
			'sanity-plugin-mux-input',
			'sanity/structure',
		],
	},
});
