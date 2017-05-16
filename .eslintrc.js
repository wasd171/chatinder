module.exports = {
    extends: [
        'eslint:recommended',
        'prettier'
    ],
    env: {
        es6: true,
        browser: true,
        node: true
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
            impliedStrict: true
        }
    },
    plugins: [
        'prettier'
    ],
    rules: {
        'prettier/prettier': ['error', {
            useTabs: true,
            tabWidth: 4,
            singleQuote: true,
            semi: false
        }]
    }
}