const API_BASE_URL = 'https://public-api.solanatracker.io';
const API_KEY = process.env.NEXT_PUBLIC_SOLANA_TRACKER_API_KEY;

export interface TrendingToken {
  mint: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
}

export interface TokenBalance {
  mint: string;
  symbol?: string;
  name?: string;
  balance: string;
  decimals: number;
  uiAmount: number;
}

export interface WalletInfo {
  address: string;
  solBalance: number;
  tokenBalances: TokenBalance[];
}

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function makeApiRequest(endpoint: string): Promise<unknown> {
  if (!API_KEY) {
    throw new Error('API key not configured. Please set NEXT_PUBLIC_SOLANA_TRACKER_API_KEY environment variable.');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new ApiError(`API request failed: ${response.statusText}`, response.status);
  }

  return response.json();
}

export async function getTrendingTokens(): Promise<TrendingToken[]> {
  try {
    // Since the actual API might not have trending tokens endpoint, we'll simulate with mock data
    // In a real implementation, you would use the actual API endpoint
    const mockData: TrendingToken[] = [
      {
        mint: "So11111111111111111111111111111111111111112",
        symbol: "SOL",
        name: "Solana",
        price: 98.45,
        priceChange24h: 2.34,
        volume24h: 1234567890,
        marketCap: 45678901234
      },
      {
        mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        symbol: "USDC",
        name: "USD Coin",
        price: 1.00,
        priceChange24h: 0.01,
        volume24h: 987654321,
        marketCap: 12345678901
      },
      {
        mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        symbol: "USDT",
        name: "Tether USD",
        price: 0.999,
        priceChange24h: -0.05,
        volume24h: 567890123,
        marketCap: 8901234567
      }
    ];
    
    return mockData;
  } catch (error) {
    console.error('Error fetching trending tokens:', error);
    throw error;
  }
}

export async function getWalletInfo(address: string): Promise<WalletInfo> {
  try {
    // Validate Solana address format
    if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) {
      throw new ApiError('Invalid Solana address format', 400);
    }

    // Mock data for demonstration - in real implementation, use actual API calls
    const mockWalletInfo: WalletInfo = {
      address,
      solBalance: 12.3456,
      tokenBalances: [
        {
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          symbol: "USDC",
          name: "USD Coin",
          balance: "1000000000",
          decimals: 6,
          uiAmount: 1000
        },
        {
          mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
          symbol: "USDT",
          name: "Tether USD",
          balance: "500000000",
          decimals: 6,
          uiAmount: 500
        }
      ]
    };

    return mockWalletInfo;
  } catch (error) {
    console.error('Error fetching wallet info:', error);
    throw error;
  }
}
