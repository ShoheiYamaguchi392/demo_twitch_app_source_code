import path from 'path';

import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';

// about config : https://medium.com/@nelfayran/cypress-react-and-vite-collaboration-bed6761808fc
export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		setupNodeEvents(on) {
			on(
				'file:preprocessor',
				vitePreprocessor(path.resolve('./vite.config.ts'))
			);
		},
	},

	component: {
		devServer: {
			framework: 'react',
			bundler: 'vite',
		},
	},
});
