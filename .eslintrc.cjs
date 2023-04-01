module.exports = {
	root: true,
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 13,
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['react', '@typescript-eslint', 'react-hooks', 'import'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	globals: {
		window: true,
	},
	rules: {
		'import/order': [
			'warn',
			{
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
					'object',
					'type',
				],
				'newlines-between': 'always',
				pathGroupsExcludedImportTypes: ['builtin'],
				alphabetize: { order: 'asc', caseInsensitive: true },
				pathGroups: [
					{ pattern: 'src/types/**', group: 'internal', position: 'before' },

					{
						pattern: 'src/repositories/**',
						group: 'internal',
						position: 'before',
					},
				],
			},
		],
	},
};
