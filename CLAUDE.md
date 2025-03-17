# CLAUDE.md - Reatom DevTools UI Kit Guidelines

## Build Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production (runs TypeScript check first)
- `pnpm preview` - Preview production build

## Type Checking
- `pnpm exec tsc --noEmit` - Run TypeScript type checking

## Code Style Guidelines
- **Framework**: Preact with TypeScript and CSS-in-JS
- **Components**: Functional components with hooks
- **CSS**: Use `css` tag from 'vite-css-in-js' for styling
- **Imports**: Group by: 1) External libraries 2) Internal components/utilities
- **TypeScript**: Strict mode enabled, avoid `any` types
- **Naming**: PascalCase for components, camelCase for functions/variables
- **State Management**: Uses '@preact/signals' for reactivity
- **Error Handling**: Handle potential null/undefined cases with optional chaining

## UI Component Pattern
Components are organized in 'ui/kit/' with each component having its own directory containing:
- index.tsx (component implementation)
- types.ts (if needed)