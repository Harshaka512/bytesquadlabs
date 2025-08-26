import TrendingTokensList from "@/components/TrendingTokensList";
import WalletInfoForm from "@/components/WalletInfoForm";

export default function Home() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold gradient-text mb-6 animate-slide-in">
          Welcome to SolanaTracker
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
          Track trending Solana tokens and explore wallet information with real-time data from the Solana blockchain.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow"></div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse-slow" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse-slow" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>

      {/* Wallet Search Section */}
      <div className="card p-8 animate-slide-in" style={{animationDelay: '0.2s'}}>
        <h2 className="text-3xl font-bold text-text-primary mb-6 text-center">
          Search Wallet Information
        </h2>
        <WalletInfoForm />
      </div>

      {/* Trending Tokens Section */}
      <div className="animate-slide-in" style={{animationDelay: '0.4s'}}>
        <TrendingTokensList />
      </div>
    </div>
  );
}
