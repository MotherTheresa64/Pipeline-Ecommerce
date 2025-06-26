import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin'; // Usually the package name is '@typescript-eslint/eslint-plugin'

// NOTE: If you mean to use @typescript-eslint/parser for parsing, import it separately.

export default tseslint.config(
  { ignores: ['dist'] }, // Files/folders to ignore
  {
    extends: [
      js.configs.recommended,              // ESLint recommended rules
      ...tseslint.configs.recommended      // TypeScript ESLint recommended rules
    ],
    files: ['**/*.{ts,tsx}'],             // Target TS and TSX files
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,           // Browser global variables
      // You may want to specify parser here if not default
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Add or override rules here as needed
    },
  },
);
