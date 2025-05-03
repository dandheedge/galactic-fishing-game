import ky from 'ky'
import { db } from './db'
import { getConnectionState } from './connection'

const API_BASE_URL = 'https://api-game.bloque.app/game'

// Define response types
export interface LeaderboardItem {
  rank: number
  username: string
  level: number
  xp: number
  gold: number
  fishEmojis?: string
  isInfected?: boolean
  originalRank?: number
}

export interface LeaderboardResponse {
  players: LeaderboardItem[]
}

export interface MarketItem {
  id: string
  name: string
  type: string
  description: string
  cost: number
}

export interface MarketResponse {
  items: MarketItem[]
}

// API endpoints
export const api = {
  /**
   * Get leaderboard data with offline support
   */
  getLeaderboard: async () => {
    const { isOnline } = getConnectionState();
    
    try {
      if (isOnline) {
        // Online: Try to fetch from API first
        const response = await ky.get(`${API_BASE_URL}/leaderboard`, {
          timeout: 5000,
          retry: 1
        }).json<LeaderboardResponse>();
        
        const players = response.players || [];
        
        // Save to local database for offline use
        await db.saveLeaderboard(players);
        
        return players;
      } else {
        // Offline: Get from local database
        return await db.getLeaderboard();
      }
    } catch (error) {
      console.warn('Error fetching leaderboard, falling back to cached data:', error);
      
      // If API request fails, try to get cached data
      return await db.getLeaderboard();
    }
  },
  
  /**
   * Get market data with offline support
   */
  getMarket: async () => {
    const { isOnline } = getConnectionState();
    
    try {
      if (isOnline) {
        // Online: Try to fetch from API first
        const response = await ky.get(`${API_BASE_URL}/market`, {
          timeout: 5000,
          retry: 1
        }).json<MarketResponse>();
        
        const items = response.items || [];
        
        // Save to local database for offline use
        await db.saveMarket(items);
        
        return items;
      } else {
        // Offline: Get from local database
        return await db.getMarket();
      }
    } catch (error) {
      console.warn('Error fetching market data, falling back to cached data:', error);
      
      // If API request fails, try to get cached data
      return await db.getMarket();
    }
  }
} 