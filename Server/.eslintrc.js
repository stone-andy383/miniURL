module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    // Indent with 4 spaces
'indent': ['error', 4],

// Indent JSX with 4 spaces
'react/jsx-indent': ['error', 4],

// Indent props with 4 spaces
'react/jsx-indent-props': ['error', 4],
  },
};
