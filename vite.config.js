/** @format */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			external: [
				'@sanity/vision',
				'sanity-plugin-asset-source-unsplash',
				'sanity-plugin-mux-input',
				'sanity/structure',
			],
		},
	},
});
