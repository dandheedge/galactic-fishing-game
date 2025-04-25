<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api, type MarketItem } from '../services/api'

const marketItems = ref<MarketItem[]>([])
const loading = ref(true)
const error = ref('')

// Function to fetch market data
const fetchMarket = async () => {
  try {
    loading.value = true
    marketItems.value = await api.getMarket()
  } catch (err) {
    error.value = 'Failed to load market data'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Get item emoji based on type
const getItemEmoji = (type: string) => {
  switch (type) {
    case 'fishing_rod':
      return '🎣'
    case 'poison_leveling':
      return '☠️'
    case 'poison_delay':
      return '⏱️'
    case 'poison_recovery':
      return '💊'
    default:
      return '❓'
  }
}

// Get color based on item type
const getItemColor = (type: string) => {
  switch (type) {
    case 'fishing_rod':
      return 'bg-blue-100'
    case 'poison_leveling':
      return 'bg-purple-100'
    case 'poison_delay':
      return 'bg-red-100'
    case 'poison_recovery':
      return 'bg-green-100'
    default:
      return 'bg-gray-100'
  }
}

// Fetch data on component mount
onMounted(() => {
  fetchMarket()
})
</script>

<template>
  <div class="px-2 sm:px-4">
    <h1 class="text-xl sm:text-2xl lg:text-3xl text-center mb-4 sm:mb-6 pixel-text">Market</h1>
    
    <div>
      <!-- Loading state -->
      <div v-if="loading" class="text-center py-6 sm:py-8">
        <div class="animate-bounce inline-block w-6 h-6 sm:w-8 sm:h-8 bg-primary mb-4 shadow-pixel"></div>
        <p class="pixel-text">Loading market items...</p>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="text-center py-6 sm:py-8 text-red-500">
        <p class="pixel-text">{{ error }}</p>
        <button @click="fetchMarket" class="pixel-button mt-4">Try Again</button>
      </div>
      
      <!-- Market list -->
      <div v-else class="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-pixel">
        <ul class="divide-y divide-gray-200 list-none m-0 p-0">
          <li 
            v-for="item in marketItems" 
            :key="item.id"
            class="p-3 sm:p-4 hover:bg-gray-50 transition-all"
            :class="getItemColor(item.type)"
          >
            <div class="flex items-start gap-3">
              <div class="emoji-container text-2xl sm:text-3xl lg:text-4xl w-10 sm:w-12 flex-shrink-0 pt-1">
                {{ getItemEmoji(item.type) }}
              </div>
              <div class="flex-1">
                <p class="font-medium text-sm sm:text-base lg:text-lg pixel-text">{{ item.name }}</p>
                <p class="text-xs sm:text-sm text-gray-600 mb-2 lg:mb-3">{{ item.description }}</p>
                <div class="flex items-center justify-between">
                  <p class="text-sm sm:text-base">
                    <span class="font-bold pixel-text">{{ item.cost.toLocaleString() }}</span> 
                    <span class="text-yellow-600">coins</span>
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
        
        <!-- Empty state -->
        <div v-if="marketItems.length === 0" class="text-center py-6 sm:py-8">
          <p class="pixel-text">No items available in the market.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add line clamp functionality */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Remove list styles */
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

/* 8-bit emoji styling */
.emoji-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  aspect-ratio: 1;
  background: white;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
}

@media (min-width: 1440px) {
  .emoji-container {
    height: 3rem;
  }
}

@media (min-width: 2560px) {
  .emoji-container {
    height: 4rem;
  }
}
</style> 