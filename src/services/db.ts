import type { LeaderboardItem, MarketItem } from './api';

// Database configuration
const DB_NAME = 'galaxy-fishing-db';
const DB_VERSION = 1;
const STORES = {
  LEADERBOARD: 'leaderboard',
  MARKET: 'market'
};

// Open database connection
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains(STORES.LEADERBOARD)) {
        db.createObjectStore(STORES.LEADERBOARD, { keyPath: 'id', autoIncrement: true });
      }
      
      if (!db.objectStoreNames.contains(STORES.MARKET)) {
        db.createObjectStore(STORES.MARKET, { keyPath: 'id' });
      }
    };
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Database service
export const db = {
  // Save leaderboard data
  saveLeaderboard: async (leaderboardData: LeaderboardItem[]): Promise<void> => {
    try {
      const db = await openDB();
      const transaction = db.transaction(STORES.LEADERBOARD, 'readwrite');
      const store = transaction.objectStore(STORES.LEADERBOARD);
      
      // Clear existing data
      await clearStore(store);
      
      // Add timestamp to track data freshness
      const timestamp = Date.now();
      
      // Add new data with IDs for storage
      for (const item of leaderboardData) {
        store.add({
          ...item,
          _timestamp: timestamp
        });
      }
      
      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => {
          db.close();
          resolve();
        };
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      console.error('Error saving leaderboard data:', error);
    }
  },
  
  // Get leaderboard data
  getLeaderboard: async (): Promise<LeaderboardItem[]> => {
    try {
      const db = await openDB();
      const transaction = db.transaction(STORES.LEADERBOARD, 'readonly');
      const store = transaction.objectStore(STORES.LEADERBOARD);
      
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        
        request.onsuccess = () => {
          db.close();
          // Sort by rank and remove timestamp
          const items = request.result
            .sort((a, b) => (a.rank || 0) - (b.rank || 0))
            .map(({ _timestamp, ...item }) => item);
          resolve(items);
        };
        
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error getting leaderboard data:', error);
      return [];
    }
  },
  
  // Save market data
  saveMarket: async (marketData: MarketItem[]): Promise<void> => {
    try {
      const db = await openDB();
      const transaction = db.transaction(STORES.MARKET, 'readwrite');
      const store = transaction.objectStore(STORES.MARKET);
      
      // Clear existing data
      await clearStore(store);
      
      // Add timestamp to track data freshness
      const timestamp = Date.now();
      
      // Add new data
      for (const item of marketData) {
        store.add({
          ...item,
          _timestamp: timestamp
        });
      }
      
      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => {
          db.close();
          resolve();
        };
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      console.error('Error saving market data:', error);
    }
  },
  
  // Get market data
  getMarket: async (): Promise<MarketItem[]> => {
    try {
      const db = await openDB();
      const transaction = db.transaction(STORES.MARKET, 'readonly');
      const store = transaction.objectStore(STORES.MARKET);
      
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        
        request.onsuccess = () => {
          db.close();
          // Remove timestamp
          const items = request.result.map(({ _timestamp, ...item }) => item);
          resolve(items);
        };
        
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error getting market data:', error);
      return [];
    }
  }
};

// Helper function to clear an object store
function clearStore(store: IDBObjectStore): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
} 