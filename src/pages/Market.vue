<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { api, type MarketItem } from '../services/api'
import ItemIcon from '../components/ItemIcon.vue'

const marketItems = ref<MarketItem[]>([])
const loading = ref(true)
const error = ref('')
const hoveredItem = ref<MarketItem | null>(null)
const pinnedItem = ref<MarketItem | null>(null)
const animatingItemId = ref<string | null>(null)

// Computed property to determine which item details to display
const displayedItem = computed(() => {
  return hoveredItem.value || pinnedItem.value
})

// Function to handle item click with animation
const handleItemClick = (item: MarketItem) => {
  pinnedItem.value = item
  animatingItemId.value = item.id
  setTimeout(() => {
    animatingItemId.value = null
  }, 150) // Animation duration
}

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

// Fetch data on component mount
onMounted(() => {
  fetchMarket()
})
</script>

<template>
  <div class="px-2 sm:px-4">
    <h1 class="text-xl sm:text-2xl lg:text-3xl text-center mb-4 sm:mb-6 pixel-text">Market</h1>
    
    <div class="market-outer-container pixel-container bg-[#dfdffe] sm:max-w-5xl sm:mx-auto">
      <!-- Loading state -->
      <div v-if="loading" class="text-center py-6 sm:py-8">
        <div class="animate-bounce inline-block w-6 h-6 sm:w-8 sm:h-8 bg-[#5656e9] mb-4 shadow-pixel"></div>
        <p class="pixel-text">Loading market items...</p>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="text-center py-6 sm:py-8 text-[#ff199b]">
        <p class="pixel-text">{{ error }}</p>
        <button @click="fetchMarket" class="pixel-button mt-4">Try Again</button>
      </div>
      
      <!-- Market Layout: Grid + Info Panel -->
      <div v-else class="flex flex-col md:flex-row gap-4 p-4 min-h-[202px] items-center">
        <!-- Item Grid (Left/Top) -->
        <div 
          class="grid grid-cols-3 gap-2 flex-shrink-0 w-full sm:w-auto"
          @mouseleave="hoveredItem = null"
        >
          <div 
            v-for="item in marketItems" 
            :key="item.id"
            :class="[
              'pixel-container border-2 shadow-[2px_2px_0px] hover:bg-[#fff] transition-all duration-150 ease-in-out cursor-pointer aspect-square flex items-center justify-center',
              item.id === pinnedItem?.id 
                ? 'bg-[#e68c4f] border-[#5656e9] shadow-[#5656e9]'
                : 'bg-[#efeffe] border-[#e68c4f] shadow-[#e68c4f]',
              item.id === animatingItemId ? 'transform scale-95' : 'transform scale-100'
            ]"
            @mouseover="hoveredItem = item"
            @click="handleItemClick(item)"
          >
            <div class="emoji-container">
              <ItemIcon :item-type="item.type" />
            </div>
          </div>
          <!-- Empty state for grid -->
          <div v-if="marketItems.length === 0" class="col-span-3 text-center py-6 sm:py-8">
            <p class="pixel-text">No items available.</p>
          </div>
        </div>
        
        <!-- Info Panel (Right/Bottom) -->
        <div class="flex-1 pixel-container bg-[#5656e9] border-[#f2b973] p-4 min-h-[150px] text-[#000]">
          <div v-if="displayedItem" class="flex flex-col h-full">
            <h3 class="pixel-text text-lg mb-2 text-amber-300">{{ displayedItem.name }}</h3>
            <p class="text-sm mb-4 min-h-[3rem] text-white">{{ displayedItem.description }}</p>
            <p class="pixel-text text-base mt-auto pt-2">
              <span class="font-bold text-white">{{ displayedItem.cost.toLocaleString() }}</span> 
              <span class="text-[#f2b973]"> gold</span>
            </p>
          </div>
          <div v-else class="flex items-center justify-center h-[150px]">
            <p class="pixel-text text-center text-white">Hover to view details, click to select</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add line clamp functionality */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 8-bit emoji styling */
.emoji-container {
  aspect-ratio: 1;
  display: block;
  height: auto;
  width: auto;
  padding: 0.25rem;
}

@media (min-width: 1440px) {
  .emoji-container {
    height: 2rem;
  }
}

/* Specific styling for the main market container border */
.market-outer-container.pixel-container {
  border-color: #34348c;
  box-shadow: 2px 2px 0px #34348c;
}
</style> 