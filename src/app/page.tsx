import TrendingTokensList from "@/components/TrendingTokensList";
import WalletInfoForm from '@/components/WalletInfoForm';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to SolanaTracker
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Track trending Solana tokens and explore wallet information with real-time data from the Solana blockchain.
        </p>
      </div>

      {/* Wallet Search Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Search Wallet Information
        </h2>
        <WalletInfoForm />
      </div>

      {/* Trending Tokens Section */}
      <div>
        <TrendingTokensList />
      </div>
    </div>
  );
}
