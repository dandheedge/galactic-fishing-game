<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { api, type LeaderboardItem } from '../services/api'

const leaderboard = ref<LeaderboardItem[]>([])
const loading = ref(true)
const error = ref('')
let intervalId: number | null = null

// Function to fetch leaderboard data
const fetchLeaderboard = async () => {
  try {
    loading.value = true
    leaderboard.value = await api.getLeaderboard()
  } catch (err) {
    error.value = 'Failed to load leaderboard data'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Setup polling on component mount
onMounted(() => {
  fetchLeaderboard() // Initial fetch
  
  // Set up polling every 5 seconds
  intervalId = window.setInterval(() => {
    fetchLeaderboard()
  }, 5000)
})

// Clear interval on component unmount
onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="px-2 sm:px-4">
    <h1 class="text-xl sm:text-2xl lg:text-3xl text-center mb-4 sm:mb-6 pixel-text">Galactic Fishing Leaderboard</h1>
    
    <div class="pixel-container overflow-hidden shadow-pixel">
      <!-- Loading state -->
      <div v-if="loading && leaderboard.length === 0" class="text-center py-6 sm:py-8">
        <div class="animate-bounce inline-block w-6 h-6 sm:w-8 sm:h-8 bg-primary mb-4 shadow-pixel"></div>
        <p class="pixel-text">Loading leaderboard data...</p>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="text-center py-6 sm:py-8 text-red-500">
        <p class="pixel-text">{{ error }}</p>
        <button @click="fetchLeaderboard" class="pixel-button mt-4">Try Again</button>
      </div>
      
      <!-- Leaderboard data -->
      <div v-else class="overflow-hidden">
        <!-- Mobile card view (visible on small screens only) -->
        <div class="md:hidden space-y-3">
          <div 
            v-for="(player, index) in leaderboard" 
            :key="index"
            :class="{'bg-yellow-100': index % 2 === 0, 'bg-white': index % 2 !== 0}"
            class="pixel-container p-3 transition-colors hover:bg-blue-100"
          >
            <div class="flex justify-between items-center mb-2">
              <span class="font-bold pixel-text">Rank: {{ player.rank || index + 1 }}</span>
              <span class="font-bold text-right pixel-text">{{ player.username || 'Unknown' }}</span>
            </div>
            <div class="grid grid-cols-3 gap-2 text-sm">
              <div class="text-center">
                <div class="text-xs text-gray-600">Level</div>
                <span class="inline-block bg-blue-200 px-2 py-1 rounded shadow-inner-pixel">{{ player.level }}</span>
              </div>
              <div class="text-center">
                <div class="text-xs text-gray-600">XP</div>
                <div class="pixel-text">{{ player.xp.toLocaleString() }}</div>
              </div>
              <div class="text-center">
                <div class="text-xs text-gray-600">Gold</div>
                <div class="font-medium text-yellow-600 pixel-text">{{ player.gold.toLocaleString() }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Desktop table view (hidden on small screens) -->
        <div class="hidden md:block overflow-x-auto">
          <table class="w-full border-collapse">
            <thead class="bg-primary text-sm sm:text-base">
              <tr>
                <th class="p-2 sm:p-3 lg:p-4 text-left">Rank</th>
                <th class="p-2 sm:p-3 lg:p-4 text-left">Player</th>
                <th class="p-2 sm:p-3 lg:p-4 text-center">Level</th>
                <th class="p-2 sm:p-3 lg:p-4 text-right">XP</th>
                <th class="p-2 sm:p-3 lg:p-4 text-right">Gold</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(player, index) in leaderboard" 
                :key="index" 
                :class="{'bg-yellow-100': index % 2 === 0, 'bg-white': index % 2 !== 0}"
                class="border-b border-gray-200 transition-colors hover:bg-blue-100"
              >
                <td class="p-2 sm:p-3 lg:p-4 pixel-text">{{ player.rank || index + 1 }}</td>
                <td class="p-2 sm:p-3 lg:p-4 font-medium pixel-text">{{ player.username || 'Unknown' }}</td>
                <td class="p-2 sm:p-3 lg:p-4 text-center">
                  <span class="inline-block bg-blue-200 px-2 py-1 rounded shadow-inner-pixel">{{ player.level }}</span>
                </td>
                <td class="p-2 sm:p-3 lg:p-4 text-right pixel-text">{{ player.xp.toLocaleString() }}</td>
                <td class="p-2 sm:p-3 lg:p-4 text-right font-medium text-yellow-600 pixel-text">{{ player.gold.toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Auto refresh indicator -->
      <div class="text-xs text-center mt-3 p-2 text-gray-600 bg-blue-50 border-t border-gray-200">
        <div class="flex items-center justify-center gap-1">
          <span class="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Auto-refreshes every 5 seconds
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-inner-pixel {
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}

@media (min-width: 1440px) {
  table {
    font-size: 1.1rem;
  }
}

@media (min-width: 2560px) {
  table {
    font-size: 1.25rem;
  }
  
  .pixel-container {
    border-width: 3px;
  }
}
</style> 