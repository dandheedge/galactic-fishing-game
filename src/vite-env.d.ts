/// <reference types="vite/client" />

// Declare Vue component types to fix TypeScript errors
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
