// API configuration using environment variables for security
const SOLANA_TRACKER_API_URL = process.env.NEXT_PUBLIC_SOLANA_TRACKER_API_URL || 'https://api.solanatracker.com';
const SOLANA_TRACKER_API_KEY = process.env.NEXT_PUBLIC_SOLANA_TRACKER_API_KEY;
const DEBUG_MODE = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true';

// API headers with authentication
const getApiHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (SOLANA_TRACKER_API_KEY) {
    headers['Authorization'] = `Bearer ${SOLANA_TRACKER_API_KEY}`;
  }
  
  return headers;
};

// Log API calls in debug mode
const logApiCall = (endpoint: string, data?: unknown) => {
  if (DEBUG_MODE) {
    console.log(`API Call: ${endpoint}`, data);
  }
};

export interface TrendingToken {
  mint: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
}

export interface TokenBalance {
  mint: string;
  name?: string;
  symbol?: string;
  uiAmount: number;
  decimals: number;
}

export interface WalletInfo {
  address: string;
  solBalance: number;
  tokenBalances: TokenBalance[];
}

// Fetch trending tokens from API
export async function getTrendingTokens(): Promise<TrendingToken[]> {
  try {
    logApiCall('getTrendingTokens');
    
    // Check if we have a valid API URL
    if (!SOLANA_TRACKER_API_URL || SOLANA_TRACKER_API_URL === 'https://api.solanatracker.com') {
      console.warn('Using mock data - no valid API URL configured');
      return getMockTrendingTokens();
    }
    
    const response = await fetch(`${SOLANA_TRACKER_API_URL}/trending-tokens`, {
      headers: getApiHeaders(),
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiCall('getTrendingTokens response', data);
    
    return data;
  } catch (error) {
    console.error('Failed to fetch trending tokens:', error);
    
    // Always fallback to mock data for development/demo
    console.warn('Falling back to mock data for trending tokens');
    return getMockTrendingTokens();
  }
}

// Fetch wallet information from API
export async function getWalletInfo(address: string): Promise<WalletInfo> {
  try {
    logApiCall('getWalletInfo', { address });
    
    // Check if we have a valid API URL
    if (!SOLANA_TRACKER_API_URL || SOLANA_TRACKER_API_URL === 'https://api.solanatracker.com') {
      console.warn('Using mock data - no valid API URL configured');
      return getMockWalletInfo(address);
    }
    
    const response = await fetch(`${SOLANA_TRACKER_API_URL}/wallet/${address}`, {
      headers: getApiHeaders(),
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiCall('getWalletInfo response', data);
    
    return data;
  } catch (error) {
    console.error('Failed to fetch wallet info:', error);
    
    // Always fallback to mock data for development/demo
    console.warn('Falling back to mock data for wallet info');
    return getMockWalletInfo(address);
  }
}

// Mock data for development (remove in production)
function getMockTrendingTokens(): TrendingToken[] {
  return [
    {
      mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      name: "USD Coin",
      symbol: "USDC",
      price: 1.000000,
      priceChange24h: 0.01,
      volume24h: 1500000000,
      marketCap: 45000000000
    },
    {
      mint: "So11111111111111111111111111111111111111112",
      name: "Wrapped SOL",
      symbol: "SOL",
      price: 98.450000,
      priceChange24h: 5.23,
      volume24h: 2500000000,
      marketCap: 42000000000
    },
    {
      mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
      name: "USDT",
      symbol: "USDT",
      price: 1.000000,
      priceChange24h: -0.02,
      volume24h: 800000000,
      marketCap: 95000000000
    },
    {
      mint: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
      name: "Marinade Staked SOL",
      symbol: "mSOL",
      price: 102.34,
      priceChange24h: 4.56,
      volume24h: 450000000,
      marketCap: 3800000000
    },
    {
      mint: "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
      name: "Staked SOL",
      symbol: "stSOL",
      price: 101.89,
      priceChange24h: 3.21,
      volume24h: 320000000,
      marketCap: 2800000000
    }
  ];
}

function getMockWalletInfo(address: string): WalletInfo {
  return {
    address,
    solBalance: 2.5432,
    tokenBalances: [
      {
        mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        name: "USD Coin",
        symbol: "USDC",
        uiAmount: 100.5,
        decimals: 6
      },
      {
        mint: "So11111111111111111111111111111111111111112",
        name: "Wrapped SOL",
        symbol: "SOL",
        uiAmount: 1.25,
        decimals: 9
      },
      {
        mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        name: "USDT",
        symbol: "USDT",
        uiAmount: 50.0,
        decimals: 6
      }
    ]
  };
}
