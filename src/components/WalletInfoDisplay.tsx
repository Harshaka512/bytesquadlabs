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
      <div className="text-center py-8">
        <p className="text-gray-600">No wallet information found.</p>
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
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Wallet Information</h2>
            <p className="text-sm text-gray-600 mt-1 font-mono">
              {shortenAddress(walletInfo.address)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {formatSolBalance(walletInfo.solBalance)} SOL
            </div>
            <div className="text-sm text-gray-500">Available Balance</div>
          </div>
        </div>
      </div>

      {/* Token Holdings */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Token Holdings</h3>
          <p className="text-sm text-gray-600 mt-1">
            {walletInfo.tokenBalances.length} token{walletInfo.tokenBalances.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {walletInfo.tokenBalances.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="text-gray-500">No token holdings found for this wallet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Token
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mint Address
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                                 {walletInfo.tokenBalances.map((token) => (
                  <tr key={token.mint} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                            {token.symbol ? token.symbol.charAt(0) : 'T'}
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {token.name || token.symbol || 'Unknown Token'}
                          </div>
                          {token.symbol && (
                            <div className="text-sm text-gray-500">{token.symbol}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatTokenAmount(token.uiAmount, token.decimals)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
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
