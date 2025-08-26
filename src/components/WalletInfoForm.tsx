'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WalletInfoForm() {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic Solana address validation
    if (!address.trim()) {
      setError('Please enter a wallet address');
      return;
    }

    if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address.trim())) {
      setError('Please enter a valid Solana wallet address');
      return;
    }

    // Navigate to wallet info page
    router.push(`/wallet/${address.trim()}`);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Wallet Information</h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter a Solana wallet address to view its balance and token holdings.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Wallet Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Solana wallet address..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            View Wallet Info
          </button>
        </form>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Example Address</h3>
          <p className="text-xs text-blue-700 font-mono break-all">
            9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM
          </p>
        </div>
      </div>
    </div>
  );
}
