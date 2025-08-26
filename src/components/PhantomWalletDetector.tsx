'use client';

import { useState, useEffect } from 'react';

interface PhantomProvider {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  publicKey: { toString: () => string } | null;
}

declare global {
  interface Window {
    phantom?: {
      solana?: PhantomProvider;
    };
  }
}

export default function PhantomWalletDetector() {
  const [provider, setProvider] = useState<PhantomProvider | null>(null);
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Phantom is installed
    if ('phantom' in window) {
      const phantomProvider = window.phantom?.solana;
      if (phantomProvider?.isPhantom) {
        setProvider(phantomProvider);
        
        // Check if already connected
        if (phantomProvider.publicKey) {
          setConnected(true);
          setPublicKey(phantomProvider.publicKey.toString());
        }
      }
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      setError('Phantom wallet is not installed');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await provider.connect();
      setConnected(true);
      setPublicKey(response.publicKey.toString());
    } catch (err) {
      setError('Failed to connect to Phantom wallet');
      console.error('Connection error:', err);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = async () => {
    if (!provider) return;

    try {
      await provider.disconnect();
      setConnected(false);
      setPublicKey(null);
    } catch (err) {
      setError('Failed to disconnect from Phantom wallet');
      console.error('Disconnection error:', err);
    }
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (!provider) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-6xl mb-4">👻</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Phantom Wallet Not Found</h2>
          <p className="text-gray-600 mb-6">
            Install Phantom Wallet extension on Google Chrome to use this feature.
          </p>
          <a
            href="https://phantom.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Install Phantom Wallet
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">👻</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Phantom Wallet</h2>
          <p className="text-sm text-gray-600">
            Connect your Phantom wallet to view your public key
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!connected ? (
          <button
            onClick={connectWallet}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connecting...' : 'Connect Phantom Wallet'}
          </button>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">Connected</p>
                  <p className="text-xs text-green-600 mt-1">
                    Public Key: {publicKey && shortenAddress(publicKey)}
                  </p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            
            {publicKey && (
              <div className="p-4 bg-gray-50 rounded-md">
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Full Public Key
                </label>
                <div className="text-xs font-mono text-gray-600 break-all bg-white p-2 rounded border">
                  {publicKey}
                </div>
              </div>
            )}
            
            <button
              onClick={disconnectWallet}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Disconnect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
