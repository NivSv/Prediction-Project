module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
    },
    "no-restricted-imports": "off",
    "@typescript-eslint/no-restricted-imports": [
        "warn",
        {
            "name": "react-redux",
            "importNames": ["useSelector", "useDispatch"],
            "message": "Use typed hooks `useAppDispatch` and `useAppSelector` instead."
        }
    ],
}
