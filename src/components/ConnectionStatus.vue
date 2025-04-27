<script setup lang="ts">
import { computed, ref } from 'vue';
import { useConnection } from '../services/connection';

// Use connection service
const { isOnline, wasOffline } = useConnection();

// Status message
const statusMessage = computed(() => {
  return isOnline.value ? 'Online' : 'Offline - Limited Functionality';
});

// Status message class
const statusClass = computed(() => {
  return isOnline.value ? 'bg-green-500' : 'bg-yellow-500';
});

// New test property to change content hash
const testProperty = ref('This will change the content hash');
</script>

<template>
  <div class="fixed bottom-0 p-2 z-50 right-0">
    <!-- Status indicator -->
    <div 
      class="px-3 py-1 rounded text-white text-sm opacity-70 hover:opacity-100 transition-opacity"
      :class="statusClass"
    >
      {{ statusMessage }}
      <!-- Hidden span for testing content hash -->
      <span class="hidden">{{ testProperty }}</span>
    </div>
    
    <!-- Reconnection notification -->
    <div v-if="wasOffline" class="mt-1 bg-green-100 border border-green-400 text-green-700 px-3 py-1 rounded text-xs animate-fade-in">
      Connection restored!
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style> 