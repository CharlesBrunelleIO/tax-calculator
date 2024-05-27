module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:@stylistic/recommended-extends"
    ],
    "ignorePatterns": [
        ".eslintrc.js",
        "package.json",
        "package-lock.json",
        "*/locales/*",
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
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@stylistic",
    ],
    "rules": {
        "@stylistic/indent": ["error", 2],
        "@stylistic/semi": ["error", "always"],
        "@stylistic/jsx-one-expression-per-line": "off"
    }
}
