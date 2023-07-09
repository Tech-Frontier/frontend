module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    parser: '@typescript-eslint/parser',
    "plugins": [
        "react",
        "@typescript-eslint",
    ],
    root: true,
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "airbnb-typescript",
        "next/core-web-vitals",
        // @see https://github.com/import-js/eslint-plugin-import/tree/main#installation
        "plugin:import/recommended",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json",
    },
    "rules": {
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-unused-vars": ["error"],

        // Ensure consistent use of file extension within the import path
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
        'import/extensions': "off",
        "import/no-extraneous-dependencies": "off",
        "@next/next/no-html-link-for-pages": "off",
    }
}
