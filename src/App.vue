<script setup lang="ts">
import ConnectionStatus from './components/ConnectionStatus.vue';
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="font-pixel min-h-screen bg-blue-100 retro-bg pixel-crisp">
    <!-- Header -->
    <header class="bg-[#5656e9] px-4 py-3 pixel-border mb-4 shadow-pixel">
      <div class="mx-auto max-w-screen-2xl">
        <div class="flex flex-col flex-wrap sm:flex-row sm:justify-between sm:items-center">
          <h1 class="text-lg sm:text-xl md:text-2xl text-white text-center sm:text-left mb-3 sm:mb-0 pixel-text [font-family:'Press_Start_2P']">Galactic Fishing Game</h1>
          <nav class="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <router-link 
              to="/" 
              class="inline-flex shrink-0 relative justify-center items-center gap-1.5 select-none rounded-lg font-press-start [font-family:'Press_Start_2P'] font-medium whitespace-nowrap outline-none text-start bg-[#990f5d] border border-black text-white transition-all duration-200 ease-in-out transform hover:shadow-button hover:-translate-y-1 hover:translate-x-1 text-sm sm:text-base h-11 py-2 px-5 group cursor-pointer"
              active-class="bg-[#ff199b] shadow-inner-pixel"
              >Home</router-link>
            <router-link 
              to="/leaderboard" 
              class="inline-flex shrink-0 relative justify-center items-center gap-1.5 select-none rounded-lg font-press-start [font-family:'Press_Start_2P'] font-medium whitespace-nowrap outline-none text-start bg-[#990f5d] border border-black text-white transition-all duration-200 ease-in-out transform hover:shadow-button hover:-translate-y-1 hover:translate-x-1 text-sm sm:text-base h-11 py-2 px-5 group cursor-pointer"
              active-class="bg-[#ff199b] shadow-inner-pixel"
              >Leaderboard</router-link>
            <router-link 
              to="/market" 
              class="inline-flex shrink-0 relative justify-center items-center gap-1.5 select-none rounded-lg font-press-start [font-family:'Press_Start_2P'] font-medium whitespace-nowrap outline-none text-start bg-[#990f5d] border border-black text-white transition-all duration-200 ease-in-out transform hover:shadow-button hover:-translate-y-1 hover:translate-x-1 text-sm sm:text-base h-11 py-2 px-5 group cursor-pointer"
              active-class="bg-[#ff199b] shadow-inner-pixel"
              >Market</router-link>
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

.shadow-button {
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.2);
}

.pixel-button {
  position: relative;
  transition: all 0.2s ease-in-out;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
}

.pixel-button:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.2);
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

.shadow-inner-pixel {
  box-shadow: inset 2px 2px 0 rgba(0, 0, 0, 0.2);
}
</style>
