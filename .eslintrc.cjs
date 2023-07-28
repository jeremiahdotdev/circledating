// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/** @type {import("eslint").Linter.Config} */
const config = {
    overrides: [
        {
            extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
            files: ['*.ts', '*.tsx', "*.js", "*.jsx"],
            parserOptions: {
                project: path.join(__dirname, 'tsconfig.json'),
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: path.join(__dirname, 'tsconfig.json'),
    },
    plugins: [
        '@typescript-eslint',
        'react',
        '@typescript-eslint',
        'sort-imports-es6-autofix',
        'unicorn',
    ],
    extends: [
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
        'eslint:recommended',
        'google',
        'plugin:react/recommended',
        'prettier',
        'plugin:tailwindcss/recommended',
    ],
    rules: {
        'require-jsdoc': 'off',
        'valid-jsdoc': 'off',
        'new-cap': 'off',
        'react/display-name': 'off',
        'object-curly-spacing': 'off',
        'max-len': 'off',
        'no-tabs': 'off',
        'space-before-function-paren': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        'react/jsx-no-bind': 'warn',
        "max-lines-per-function": ["error", 180],
        'sort-imports-es6-autofix/sort-imports-es6': [
            2,
            {
                ignoreCase: false,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            },
        ],
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
};

module.exports = config;
