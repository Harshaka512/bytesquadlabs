'use client';

import { useState, useEffect } from 'react';
import { TrendingToken, getTrendingTokens } from '@/lib/api';
import LoadingSpinner from './ui/LoadingSpinner';
import ErrorDisplay from './ui/ErrorDisplay';

export default function TrendingTokensList() {
  const [tokens, setTokens] = useState<TrendingToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTokens = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTrendingTokens();
      setTokens(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trending tokens');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={fetchTokens} />;
  }

  if (tokens.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-text-secondary text-lg">No trending tokens found.</p>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    }).format(price);
  };

  const formatChange = (change: number) => {
    const isPositive = change >= 0;
    const formatted = Math.abs(change).toFixed(2);
    return (
      <span className={isPositive ? 'status-positive' : 'status-negative'}>
        {isPositive ? '↗' : '↘'} {isPositive ? '+' : '-'}{formatted}%
      </span>
    );
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    } else if (volume >= 1e3) {
      return `$${(volume / 1e3).toFixed(2)}K`;
    }
    return `$${volume.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      <div className="table-container">
        <div className="table-header px-6 py-4">
          <h2 className="text-2xl font-bold text-text-primary">Trending Tokens</h2>
          <p className="text-text-secondary mt-1">Top performing tokens on Solana</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-card-border">
            <thead className="bg-card-bg/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Token
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  24h Change
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  24h Volume
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Market Cap
                </th>
              </tr>
            </thead>
            <tbody className="bg-card-bg divide-y divide-card-border">
              {tokens.map((token, index) => (
                <tr key={token.mint} className="table-row" style={{animationDelay: `${index * 0.1}s`}}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="token-avatar">
                          {token.symbol.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-text-primary">{token.name}</div>
                        <div className="text-sm text-text-secondary">{token.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-text-primary">
                    {formatPrice(token.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    {formatChange(token.priceChange24h)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                    {formatVolume(token.volume24h)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                    {formatVolume(token.marketCap)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
