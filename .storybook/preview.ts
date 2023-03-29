export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

// const req = require.context('../src', true, /\.stories\.js$/);
// function loadStories() {
// 	req.keys().forEach((filename) => req(filename));
// }
