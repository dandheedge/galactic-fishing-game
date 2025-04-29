<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { api, type LeaderboardItem } from '../services/api'

const leaderboard = ref<LeaderboardItem[]>([])
const loading = ref(true)
const error = ref('')
let intervalId: number | null = null

// Search state
const searchQuery = ref('')

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(20)

// Computed property for filtered leaderboard
const filteredLeaderboard = computed(() => {
  if (!searchQuery.value) return leaderboard.value
  
  const query = searchQuery.value.toLowerCase()
  return leaderboard.value.filter(player => 
    player.username.toLowerCase().includes(query)
  )
})

// Computed property for total pages
const totalPages = computed(() => Math.ceil(filteredLeaderboard.value.length / itemsPerPage.value))

// Computed property for paginated data
const paginatedLeaderboard = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredLeaderboard.value.slice(start, end)
})

// Reset page when search query changes
watch(searchQuery, () => {
  currentPage.value = 1
})

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

// Pagination controls
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Setup polling on component mount
onMounted(() => {
  fetchLeaderboard() // Initial fetch
  
  // Set up polling every 10 seconds
  intervalId = window.setInterval(() => {
    fetchLeaderboard()
  }, 10000)
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
      <!-- Search input -->
      <div class="p-4 border-b border-gray-200">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search player..."
            class="w-auto pixel-input pl-10 pr-4 py-2 bg-white border-2 border-gray-800 focus:border-primary focus:ring-0 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] transition-all duration-200 font-press-start text-xs sm:text-sm [font-family:'Press_Start_2P']"
          />
          <span class="absolute left-3 top-2 text-gray-500 font-press-start text-xs sm:text-sm [font-family:'Press_Start_2P']">🔍</span>
        </div>
      </div>

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
      
      <!-- No results state -->
      <div v-else-if="filteredLeaderboard.length === 0" class="text-center py-6 sm:py-8">
        <p class="pixel-text">No players found matching "{{ searchQuery }}"</p>
      </div>
      
      <!-- Leaderboard data -->
      <div v-else class="overflow-hidden">
        <!-- Mobile card view (visible on small screens only) -->
        <div class="md:hidden space-y-3 overflow-x-hidden">
          <div 
            v-for="(player, index) in paginatedLeaderboard" 
            :key="index"
            :class="{'bg-yellow-100': index % 2 === 0, 'bg-white': index % 2 !== 0}"
            class="pixel-container p-3 transition-colors hover:bg-blue-100"
          >
            <div class="flex flex-col sm:flex-row sm:justify-between items-center mb-2 gap-2">
              <span class="font-bold pixel-text">Rank: {{ player.rank || index + 1 }}</span>
              <div class="flex items-center">
                {{ player.username || 'Unknown' }}
                <span v-if="player.isInfected" class="ml-2 text-red-500"> ☢️</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 text-sm">
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
              <div class="text-center">
                <div class="text-xs text-gray-600">Tier</div>
                <div class="text-lg font-press-start [font-family:'Press_Start_2P']">{{ player.fishEmojis || '🐟' }}</div>
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
                <th class="p-2 sm:p-3 lg:p-4 text-center">Tier</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(player, index) in paginatedLeaderboard" 
                :key="index" 
                :class="{'bg-yellow-100': index % 2 === 0, 'bg-white': index % 2 !== 0}"
                class="border-b border-gray-200 transition-colors hover:bg-blue-100"
              >
                <td class="p-2 sm:p-3 lg:p-4 pixel-text">{{ player.rank || index + 1 }}</td>
                <td class="p-2 sm:p-3 lg:p-4 font-medium pixel-text">
                  <div class="flex items-center">
                    {{ player.username || 'Unknown' }}
                    <span v-if="player.isInfected" class="ml-2 text-red-500"> ☢️</span>
                  </div>
                </td>
                <td class="p-2 sm:p-3 lg:p-4 text-center">
                  <span class="inline-block bg-blue-200 px-2 py-1 rounded shadow-inner-pixel">{{ player.level }}</span>
                </td>
                <td class="p-2 sm:p-3 lg:p-4 text-right pixel-text">{{ player.xp.toLocaleString() }}</td>
                <td class="p-2 sm:p-3 lg:p-4 text-right font-medium text-yellow-600 pixel-text">{{ player.gold.toLocaleString() }}</td>
                <td class="p-2 sm:p-3 lg:p-4 text-center font-press-start [font-family:'Press_Start_2P'] text-lg">
                  {{ player.fishEmojis || '🐟' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination controls -->
        <div class="flex flex-col items-center gap-3 mt-4 p-4 border-t border-gray-200">
          <div class="flex items-center gap-2">
            <button 
              @click="prevPage" 
              :disabled="currentPage === 1"
              class="pixel-button px-3 py-1 text-xs sm:text-sm font-press-start [font-family:'Press_Start_2P']"
              :class="{'opacity-50 cursor-not-allowed': currentPage === 1}"
            >
              ←
            </button>
            
            <div class="overflow-x-auto whitespace-nowrap max-w-[90vw] sm:max-w-none">
              <div class="flex gap-1 px-2">
                <button
                  v-for="page in totalPages"
                  :key="page"
                  @click="goToPage(page)"
                  class="pixel-button px-3 py-1 text-xs sm:text-sm font-press-start [font-family:'Press_Start_2P'] min-w-[2.5rem]"
                  :class="{
                    'bg-primary text-white': currentPage === page,
                    'hover:bg-gray-100': currentPage !== page
                  }"
                >
                  {{ page }}
                </button>
              </div>
            </div>
            
            <button 
              @click="nextPage" 
              :disabled="currentPage === totalPages"
              class="pixel-button px-3 py-1 text-xs sm:text-sm font-press-start [font-family:'Press_Start_2P']"
              :class="{'opacity-50 cursor-not-allowed': currentPage === totalPages}"
            >
              →
            </button>
          </div>
          
          <div class="text-xs text-gray-600 pixel-text font-press-start [font-family:'Press_Start_2P']">
            Page {{ currentPage }} of {{ totalPages }}
          </div>
        </div>
      </div>
      
      <!-- Auto refresh indicator -->
      <div class="text-xs text-center mt-3 p-2 text-gray-600 bg-blue-50 border-t border-gray-200">
        <div class="flex items-center justify-center gap-1">
          <span class="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Auto-refreshes every 10 seconds
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