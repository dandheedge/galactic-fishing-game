# Bloque Fishing Game

A fishing game market and leaderboard information built with Vue 3, TypeScript, and Vite.

## Project Overview

This is a fishing game built using modern web technologies:
- Vue 3 with Composition API and `<script setup>` syntax
- TypeScript for type safety
- Vite for fast development and optimized builds
- UnoCSS for utility-first styling
- PWA support for offline support

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- bun or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd galactic-fishing-game

# Install dependencies
bun install
# or
yarn install
```

### Development

```bash
# Start the development server
bun run dev
# or
yarn dev
```

This will start the development server at `http://localhost:5173` (default Vite port).

### Build

```bash
# Build for production
bun run build
# or
yarn build
```

### Preview Production Build

```bash
# Preview the production build
bun run preview
# or
yarn preview
```

## Development Approach

### Architecture

- **Component-Based**: Build reusable Vue components for game elements
- **State Management**: Use Vue's Composition API for state management
- **Routing**: Vue Router for any multi-page aspects of the game
- **API Handling**: Using ky for network requests every 5 seconds

### Styling

This project uses UnoCSS with several presets:
- Uno preset (Tailwind-like utilities)
- Attributify preset for attribute-based styling
- Icons preset for easy icon usage
- Typography preset for text styling
- Web Fonts preset for custom fonts

### Best Practices

- Write clean, typed components with proper interfaces
- Break down UI into small, reusable components
- Use TypeScript interfaces for game objects and state
- Follow Vue's best practices for reactivity
- Implement responsive design for different screen sizes

### Progressive Web App

The project is configured with `vite-plugin-pwa` to enable PWA capabilities:
- Offline support
- Installable on devices
- Fast loading times

## Project Structure

```
bloque-fishing-game/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Project assets
│   ├── components/         # Vue components
│   ├── composables/        # Reusable composition functions
│   ├── game/               # Game logic
│   ├── pages/              # Page components
│   ├── router/             # Vue Router configuration
│   ├── App.vue             # Root component
│   └── main.ts             # Application entry point
├── index.html              # HTML entry point
├── tsconfig.json           # TypeScript configuration
├── uno.config.ts           # UnoCSS configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Project dependencies
```

## License

[MIT License](LICENSE)
