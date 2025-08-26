'use client';

import { useState, useEffect, useCallback } from 'react';
import { WalletInfo, getWalletInfo } from '@/lib/api';
import LoadingSpinner from './ui/LoadingSpinner';
import ErrorDisplay from './ui/ErrorDisplay';

interface WalletInfoDisplayProps {
  address: string;
}

export default function WalletInfoDisplay({ address }: WalletInfoDisplayProps) {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWalletInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWalletInfo(address);
      setWalletInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch wallet information');
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchWalletInfo();
  }, [fetchWalletInfo]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={fetchWalletInfo} />;
  }

  if (!walletInfo) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-text-secondary text-lg">No wallet information found.</p>
      </div>
    );
  }

  const formatSolBalance = (balance: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(balance);
  };

  const formatTokenAmount = (amount: number, decimals: number) => {
    const adjustedAmount = amount / Math.pow(10, decimals);
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(adjustedAmount);
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="space-y-6">
      {/* Wallet Header */}
      <div className="card p-6 animate-slide-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Wallet Information</h2>
            <p className="text-text-secondary mt-1 font-mono">
              {shortenAddress(walletInfo.address)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold gradient-text">
              {formatSolBalance(walletInfo.solBalance)} SOL
            </div>
            <div className="text-text-secondary">Available Balance</div>
          </div>
        </div>
      </div>

      {/* Token Holdings */}
      <div className="table-container animate-slide-in" style={{animationDelay: '0.2s'}}>
        <div className="table-header px-6 py-4">
          <h3 className="text-xl font-bold text-text-primary">Token Holdings</h3>
          <p className="text-text-secondary mt-1">
            {walletInfo.tokenBalances.length} token{walletInfo.tokenBalances.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {walletInfo.tokenBalances.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="text-6xl mb-4">💎</div>
            <p className="text-text-secondary">No token holdings found for this wallet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-card-border">
              <thead className="bg-card-bg/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Token
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Mint Address
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card-bg divide-y divide-card-border">
                {walletInfo.tokenBalances.map((token, index) => (
                  <tr key={token.mint} className="table-row" style={{animationDelay: `${index * 0.1}s`}}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="token-avatar">
                            {token.symbol ? token.symbol.charAt(0) : 'T'}
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-semibold text-text-primary">
                            {token.name || token.symbol || 'Unknown Token'}
                          </div>
                          {token.symbol && (
                            <div className="text-sm text-text-secondary">{token.symbol}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-text-primary">
                      {formatTokenAmount(token.uiAmount, token.decimals)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary font-mono">
                      {shortenAddress(token.mint)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
