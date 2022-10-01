module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['prettier', '@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        'prefer-spread': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
    settings: {
        react: {
            version: '17.0',
        },
    },
}
