module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'prettier',
        'prettier/react'
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
        'react',
        'prettier'
    ],
    rules: {
        'react/prop-types': 'off', // For now, would add Flow + tcomb later
        'prettier/prettier': ['error', {
            useTabs: true,
            tabWidth: 4,
            singleQuote: true,
            semi: false
        }]
    }
}