<script setup lang="ts">
import ConnectionStatus from './components/ConnectionStatus.vue';
</script>

<template>
  <div class="font-pixel min-h-screen bg-blue-100 retro-bg pixel-crisp">
    <!-- Header -->
    <header class="bg-primary px-4 py-3 pixel-border mb-4 shadow-pixel">
      <div class="mx-auto max-w-screen-2xl">
        <div class="flex flex-col flex-wrap sm:flex-row sm:justify-between sm:items-center">
          <h1 class="text-lg sm:text-xl md:text-2xl text-black text-center sm:text-left mb-3 sm:mb-0 pixel-text">Galactic Fishing Game</h1>
          <nav class="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <router-link to="/" class="pixel-button text-sm text-center">Home</router-link>
            <router-link to="/leaderboard" class="pixel-button text-sm text-center">Leaderboard</router-link>
            <router-link to="/market" class="pixel-button text-sm text-center">Market</router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="px-4 pb-8 overflow-x-hidden mx-auto max-w-screen-2xl">
      <router-view />
    </main>
    
    <!-- Connection Status -->
    <ConnectionStatus />
  </div>
</template>

<style>
/* Global styles */
html, body {
  image-rendering: pixelated;
  -webkit-font-smoothing: none; /* For crisp pixel fonts */
  -moz-osx-font-smoothing: none;
}

body {
  background-color: #c6e4f8;
}

.pixel-crisp {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

.pixel-text {
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.5px;
}

.shadow-pixel {
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.15);
}

.pixel-button {
  position: relative;
  transition: all 0.1s ease;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
}

.pixel-button:active {
  transform: translate(2px, 2px);
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2);
}

.pixel-border {
  border: 2px solid rgba(0, 0, 0, 0.2);
  image-rendering: pixelated;
}

.pixel-container {
  border: 2px solid rgba(0, 0, 0, 0.2);
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.15);
  background-color: white;
  border-radius: 2px;
  padding: 0.5rem;
}

a.router-link-active {
  @apply bg-yellow-300;
  box-shadow: inset 2px 2px 0px rgba(0, 0, 0, 0.1);
}

/* 8-bit style background pattern */
.retro-bg {
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 16px 16px;
}

/* Responsive utilities */
@media (min-width: 2560px) {
  .max-w-screen-2xl {
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
