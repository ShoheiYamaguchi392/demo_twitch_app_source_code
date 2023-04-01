import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [react()],
		resolve: {
			alias: {
				'@/': `${__dirname}/src/`,
				'~/': `${__dirname}/public/`,
			},
		},
		server: {
			open: true,
			port: 3000,
		},
		define: {
			__APP_ENV__: env.APP_ENV,
		},
		// see:@https://qiita.com/nanohanabuttobasu/items/f73ed978cc10d8bcaa59
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use '@/styles/variables.scss' as *;`,
				},
			},
		},
	};
});
