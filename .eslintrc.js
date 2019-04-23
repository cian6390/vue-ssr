module.exports = {
  env: {
    es6: true,
    browser: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 8,
    sourceType: 'module'
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    'vue/max-attributes-per-line': false,
    '@typescript-eslint/no-explicit-any': false,
    '@typescript-eslint/no-var-requires': false,
    '@typescript-eslint/explicit-member-accessibility': 'no-public',
    '@typescript-eslint/explicit-function-return-type': false,
    'vue/singleline-html-element-content-newline': false
  }
};
