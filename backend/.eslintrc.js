module.exports = {
	env: {
		commonjs: true,
		es2020: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 11,
	},
	rules: {
		'prettier/prettier': [
			'error',
			// 아래 규칙들은 개인 선호에 따라 prettier 문법 적용
			// https://prettier.io/docs/en/options.html
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 2,
				trailingComma: 'all',
				printWidth: 80,
				bracketSpacing: true,
				arrowParens: 'avoid',
			},
		],
	},
};
