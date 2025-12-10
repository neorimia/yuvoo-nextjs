# Git Hooks

This directory contains Git hooks managed by [Husky](https://typicode.github.io/husky/).

## Hooks

### pre-commit

Runs before each commit to:

- Format staged files with Prettier
- Lint staged files with ESLint (auto-fix)

This ensures code quality and consistency before commits.

## Setup

Husky is automatically set up when you run `npm install` (via the `prepare` script).

## How It Works

1. When you commit files, Husky runs the `pre-commit` hook
2. The hook runs `lint-staged`, which only processes staged files
3. `lint-staged` runs ESLint and Prettier on staged files
4. If there are errors that can't be auto-fixed, the commit is blocked
5. You can fix the errors and commit again

## Bypassing Hooks (Not Recommended)

If you need to bypass hooks in an emergency:

```bash
git commit --no-verify
```

**Warning**: Only use this when absolutely necessary. It bypasses all quality checks.

## Disabling Hooks

To temporarily disable hooks:

```bash
# Uninstall husky hooks
npm run prepare -- --uninstall

# Reinstall hooks
npm run prepare
```

## Configuration

- **lint-staged config**: `.lintstagedrc.json`
- **Prettier config**: `.prettierrc`
- **ESLint config**: `eslint.config.mjs`
