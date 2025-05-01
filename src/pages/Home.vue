<script setup lang="ts">
// No imports needed
</script>

<template>
  <div class="px-2 sm:px-4">
    <div class="pixel-container overflow-hidden shadow-pixel">
      <h1 class="text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6 text-center pixel-text">Welcome to Galactic Fishing Game</h1>
      
      <div class="flex flex-col gap-3 sm:gap-4 md:flex-row">
        <div class="flex-1 pixel-container bg-blue-200 p-3 sm:p-4 transform hover:scale-[1.02] transition-transform">
          <h2 class="text-base sm:text-lg mb-2 sm:mb-4 pixel-text">About the Game</h2>
          <p class="mb-3 sm:mb-4 text-sm sm:text-base">
            Explore the cosmic oceans and catch the rarest space fish!
          </p>
          <div class="grid place-items-center py-2 sm:py-4">
            <div class="fish-icon">
              <div class="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-blue-500 animate-pulse rounded-full relative">
                <div class="absolute inset-0 bg-blue-400 rounded-full transform translate-x-1/4 scale-75"></div>
                <div class="absolute top-1/4 left-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex-1 pixel-container bg-green-200 p-3 sm:p-4 transform hover:scale-[1.02] transition-transform">
          <h2 class="text-base sm:text-lg mb-2 sm:mb-4 pixel-text">Get Started</h2>
          
          <p class="text-sm sm:text-base mb-4">
            Check out our leaderboard to see the top fishers in the galaxy, or visit the market to upgrade your gear!
          </p>
          
          <div class="flex flex-col gap-2 sm:gap-3 mt-4">
            <router-link to="/leaderboard" class="inline-flex shrink-0 relative justify-center items-center gap-1.5 select-none rounded-lg font-button font-medium whitespace-nowrap outline-none text-start bg-primary border border-black text-white transition-all duration-200 ease-in-out transform hover:shadow-button hover:-translate-y-1 hover:translate-x-1 text-lg h-11 py-2 px-5 group">
              <span class="flex items-center justify-center gap-2">
                <span class="text-sm sm:text-base">🏆</span>
                <span>Leaderboard</span>
              </span>
            </router-link>
            <router-link to="/market" class="inline-flex shrink-0 relative justify-center items-center gap-1.5 select-none rounded-lg font-button font-medium whitespace-nowrap outline-none text-start bg-primary border border-black text-white transition-all duration-200 ease-in-out transform hover:shadow-button hover:-translate-y-1 hover:translate-x-1 text-lg h-11 py-2 px-5 group">
              <span class="flex items-center justify-center gap-2">
                <span class="text-sm sm:text-base">🛒</span>
                <span>Market</span>
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fish-icon {
  image-rendering: pixelated;
}

@media (min-width: 2560px) {
  .pixel-container {
    border-width: 3px;
    box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.15);
  }
  
  .pixel-button {
    border-width: 3px;
    box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.2);
  }
}
</style> 