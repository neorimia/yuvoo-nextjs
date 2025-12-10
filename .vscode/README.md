# VS Code Settings

This directory contains VS Code workspace settings and recommendations.

## Files

- `settings.json` - Workspace-specific settings
- `extensions.json` - Recommended VS Code extensions

## Recommended Extensions

Install the recommended extensions for the best development experience:

1. **ESLint** (`dbaeumer.vscode-eslint`) - Linting support
2. **Prettier** (`esbenp.prettier-vscode`) - Code formatting
3. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) - Tailwind autocomplete (when Tailwind is installed)
4. **TypeScript and JavaScript Language Features** (`ms-vscode.vscode-typescript-next`) - Enhanced TypeScript support
5. **Auto Rename Tag** (`formulahendry.auto-rename-tag`) - Auto-rename paired HTML/JSX tags
6. **Path Intellisense** (`christian-kohler.path-intellisense`) - Autocomplete for file paths
7. **JSON** (`ms-vscode.vscode-json`) - JSON language support

## Features Enabled

- **Format on Save**: Automatically formats code with Prettier on save
- **ESLint Auto-fix**: Automatically fixes ESLint errors on save
- **TypeScript**: Uses workspace TypeScript version
- **Path Aliases**: Supports `@/` path alias for imports

## Usage

VS Code will automatically use these settings when you open this workspace. You can install recommended extensions by:

1. Opening VS Code in this directory
2. VS Code will prompt you to install recommended extensions
3. Or manually install via Extensions view (Cmd+Shift+X / Ctrl+Shift+X)
