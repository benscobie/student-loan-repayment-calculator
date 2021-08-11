module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
        '*.vue',
        '*.ts'
      ],
      rules: {
        "no-shadow": "off",
        semi: 'off',
        'max-len': 'off',
        'vue/max-len': ['warn', {
          template: 80000,
        }],
        "linebreak-style": "off"
      },
      env: {
        jest: true,
      },
    },
  ],
};
