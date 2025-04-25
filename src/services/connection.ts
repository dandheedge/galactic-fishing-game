import { ref, onMounted, onUnmounted } from 'vue';

// State
const isOnline = ref(navigator.onLine);
const wasOffline = ref(false);
const lastOnlineTime = ref<number | null>(isOnline.value ? Date.now() : null);

// Adding a small comment change to test content hashing

// Connection state interface
export interface ConnectionState {
  isOnline: boolean;
  wasOffline: boolean;
  lastOnlineTime: number | null;
}

// Update online status
function updateOnlineStatus() {
  const previousStatus = isOnline.value;
  isOnline.value = navigator.onLine;
  
  // If coming back online after being offline
  if (isOnline.value && !previousStatus) {
    wasOffline.value = true;
    lastOnlineTime.value = Date.now();
    
    // Reset wasOffline after 5 seconds
    setTimeout(() => {
      wasOffline.value = false;
    }, 5000);
  }
  
  // If going offline
  if (!isOnline.value && previousStatus) {
    lastOnlineTime.value = null;
  }
}

// Hook to setup network monitoring
export function useConnection() {
  onMounted(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
  });
  
  onUnmounted(() => {
    window.removeEventListener('online', updateOnlineStatus);
    window.removeEventListener('offline', updateOnlineStatus);
  });
  
  return {
    isOnline,
    wasOffline,
    lastOnlineTime
  };
}

// Get current connection state
export function getConnectionState(): ConnectionState {
  return {
    isOnline: isOnline.value,
    wasOffline: wasOffline.value,
    lastOnlineTime: lastOnlineTime.value
  };
} 