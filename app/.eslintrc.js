module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "commonjs": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-alert": "error",
        "no-array-constructor": "error",
        "no-bitwise": "off",
        "no-caller": "off",
        "no-case-declarations": "error",
        "no-catch-shadow": "off",
        "no-class-assign": "error",
        "no-cond-assign": "error",
        "no-confusing-arrow": "off",
        "no-console": "error",
        "no-const-assign": "error",
        "no-constant-condition": "error",
        "no-continue": "off",
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-delete-var": "error",
        "no-div-regex": "error",
        "no-dupe-class-members": "error",
        "no-dupe-keys": "error",
        "no-dupe-args": "error",
        "no-duplicate-case": "error",
        "no-duplicate-imports": "error",
        "no-else-return": "error",
        "no-empty": "error",
        "no-empty-character-class": "error",
        "no-empty-function": "error",
        "no-empty-pattern": "error",
        "no-eq-null": "error",
        "no-eval": "error",
        "no-ex-assign": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-extra-boolean-cast": "error",
        "no-extra-label": "off",
        "no-extra-parens": "off",
        "no-extra-semi": "error",
        "no-fallthrough": "error",
        "no-floating-decimal": "off",
        "no-func-assign": "error",
        "no-implicit-coercion": "off",
        "no-implicit-globals": "error",
        "no-implied-eval": "error",
        "no-inline-comments": "off",
        "no-inner-declarations": "error",
        "no-invalid-regexp": "error",
        "no-invalid-this": "error",
        "no-irregular-whitespace": "error",
        "no-iterator": "off",
        "no-label-var": "off",
        "no-labels": "off",
        "no-lone-blocks": "error",
        "no-lonely-if": "error",
        "no-loop-func": "off",
        "no-mixed-requires": "off",
        "no-mixed-spaces-and-tabs": "error",
        "linebreak-style": "off",
        "no-multi-spaces": "error",
        "no-multi-str": "off",
        "no-multiple-empty-lines": "off",
        "no-native-reassign": "off",
        "no-negated-condition": "off",
        "no-negated-in-lhs": "error",
        "no-nested-ternary": "off",
        "no-new": "off",
        "no-new-func": "off",
        "no-new-object": "off",
        "no-new-require": "off",
        "no-new-symbol": "error",
        "no-new-wrappers": "off",
        "no-obj-calls": "error",
        "no-octal": "error",
        "no-octal-escape": "off",
        "no-param-reassign": "off",
        "no-path-concat": "off",
        "no-plusplus": "off",
        "no-process-env": "off",
        "no-process-exit": "off",
        "no-proto": "off",
        "no-redeclare": "error",
        "no-regex-spaces": "error",
        "no-restricted-globals": "off",
        "no-restricted-imports": "off",
        "no-restricted-modules": "off",
        "no-restricted-syntax": "off",
        "no-return-assign": "off",
        "no-script-url": "off",
        "no-self-assign": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-shadow": "error",
        "no-shadow-restricted-names": "off",
        "no-whitespace-before-property": "off",
        "no-spaced-func": "error",
        "no-sparse-arrays": "error",
        "no-sync": "off",
        "no-ternary": "off",
        "no-trailing-spaces": "error",
        "no-this-before-super": "error",
        "no-throw-literal": "off",
        "no-undef": "error",
        "no-undef-init": "off",
        "no-undefined": "error",
        "no-unexpected-multiline": "error",
        "no-underscore-dangle": "off",
        "no-unmodified-loop-condition": "error",
        "no-unneeded-ternary": "off",
        "no-unreachable": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-unused-vars": "off",
        "no-use-before-define": "off",
        "no-useless-call": "off",
        "no-useless-concat": "off",
        "no-useless-constructor": "off",
        "no-useless-escape": "off",
        "no-void": "off",
        "no-var": "error",
        "no-warning-comments": "off",
        "no-with": "off",
        "no-magic-numbers": "off",
        "array-bracket-spacing": "off",
        "array-callback-return": "off",
        "arrow-body-style": "off",
        "arrow-parens": "off",
        "arrow-spacing": "off",
        "accessor-pairs": "off",
        "block-scoped-var": "off",
        "block-spacing": "off",
        "brace-style": "error",
        "callback-return": "off",
        "camelcase": "error",
        "comma-dangle": "error",
        "comma-spacing": "error",
        "comma-style": "off",
        "complexity": ["off", 11],
        "computed-property-spacing": "off",
        "consistent-return": "off",
        "consistent-this": "off",
        "constructor-super": "error",
        "curly": "error",
        "default-case": "off",
        "dot-location": "off",
        "dot-notation": "off",
        "eol-last": "off",
        "eqeqeq": "off",
        "func-names": "off",
        "func-style": "off",
        "generator-star-spacing": "off",
        "global-require": "off",
        "guard-for-in": "off",
        "handle-callback-err": "off",
        "id-length": "off",
        "init-declarations": "off",
        "jsx-quotes": "off",
        "key-spacing": "off",
        "keyword-spacing": "off",
        "lines-around-comment": "off",
        "max-depth": "off",
        "max-len": "off",
        "max-nested-callbacks": "off",
        "max-params": "off",
        "max-statements": "off",
        "max-statements-per-line": "off",
        "new-cap": "off",
        "new-parens": "off",
        "newline-after-var": "off",
        "newline-before-return": "off",
        "newline-per-chained-call": "off",
        "object-curly-spacing": ["off", "never"],
        "object-shorthand": "off",
        "one-var": "off",
        "one-var-declaration-per-line": "off",
        "operator-assignment": "off",
        "operator-linebreak": "off",
        "padded-blocks": "off",
        "prefer-arrow-callback": "off",
        "prefer-const": "off",
        "prefer-reflect": "off",
        "prefer-rest-params": "off",
        "prefer-spread": "off",
        "prefer-template": "off",
        "quote-props": "off",
        "quotes": "off",
        "radix": "off",
        "id-match": "off",
        "id-blacklist": "off",
        "require-jsdoc": "off",
        "require-yield": "off",
        "semi": "off",
        "semi-spacing": "off",
        "sort-vars": "off",
        "sort-imports": "off",
        "space-before-blocks": "off",
        "space-before-function-paren": "off",
        "space-in-parens": "off",
        "space-infix-ops": "off",
        "space-unary-ops": "off",
        "spaced-comment": "off",
        "strict": "off",
        "template-curly-spacing": "off",
        "use-isnan": "error",
        "valid-jsdoc": "off",
        "valid-typeof": "error",
        "vars-on-top": "off",
        "wrap-iife": "off",
        "wrap-regex": "off",
        "yield-star-spacing": "off",
        "yoda": "off"
    }
};