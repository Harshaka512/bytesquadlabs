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
        <div className="card p-8 text-center animate-slide-in">
          <div className="text-6xl mb-4 animate-float">👻</div>
          <h2 className="text-2xl font-bold text-text-primary mb-4">Phantom Wallet Not Found</h2>
          <p className="text-text-secondary mb-6">
            Install Phantom Wallet extension on Google Chrome to use this feature.
          </p>
          <a
            href="https://phantom.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
          >
            Install Phantom Wallet
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card p-8 animate-slide-in">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4 animate-float">👻</div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Phantom Wallet</h2>
          <p className="text-text-secondary">
            Connect your Phantom wallet to view your public key
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 card border-l-4 border-error">
            <p className="text-sm status-negative">{error}</p>
          </div>
        )}

        {!connected ? (
          <button
            onClick={connectWallet}
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connecting...' : 'Connect Phantom Wallet'}
          </button>
        ) : (
          <div className="space-y-4">
            <div className="p-4 card border-l-4 border-success">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold status-positive">Connected</p>
                  <p className="text-xs text-text-secondary mt-1">
                    Public Key: {publicKey && shortenAddress(publicKey)}
                  </p>
                </div>
                <div className="w-3 h-3 bg-success rounded-full animate-pulse-slow"></div>
              </div>
            </div>
            
            {publicKey && (
              <div className="p-4 card">
                <label className="block text-xs font-semibold text-text-primary mb-2">
                  Full Public Key
                </label>
                <div className="text-xs font-mono text-text-secondary break-all bg-card-bg p-3 rounded border border-card-border">
                  {publicKey}
                </div>
              </div>
            )}
            
            <button
              onClick={disconnectWallet}
              className="btn-secondary w-full"
            >
              Disconnect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
