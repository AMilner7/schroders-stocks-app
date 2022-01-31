module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        jest: true,
    },
    globals: {
        document: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    extends: [
        'eslint-config-prettier',
        'plugin:prettier/recommended',
        'plugin:sonarjs/recommended',
        'plugin:react/recommended',
    ],
    plugins: ['prettier', 'sonarjs', 'react'],
    rules: {
        'react/prop-types': 'off',
        'no-var': ['error'],
        'no-unused-vars': ['error', { args: 'none' }],
        'no-constant-condition': ['error', { checkLoops: false }],
        'no-prototype-builtins': 'off',
        'no-undef': ['error'],
        'max-len': ['error', { code: 100, ignoreComments: true }],
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                tabWidth: 4,
                printWidth: 100,
                endOfLine: 'auto',
            },
        ],
    },
    settings: {
        react: {
            createClass: 'createReactClass',
            pragma: 'React',
            fragment: 'Fragment',
            version: 'detect',
            flowVersion: '0.53',
        },
        propWrapperFunctions: [
            'forbidExtraProps',
            { property: 'freeze', object: 'Object' },
            { property: 'myFavoriteWrapper' },
            { property: 'forbidExtraProps', exact: true },
        ],
        componentWrapperFunctions: [
            'observer',
            { property: 'styled' },
            { property: 'observer', object: 'Mobx' },
            { property: 'observer', object: '<pragma>' },
        ],
        formComponents: ['CustomForm', { name: 'Form', formAttribute: 'endpoint' }],
        linkComponents: ['Hyperlink', { name: 'Link', linkAttribute: 'to' }],
    },
};
