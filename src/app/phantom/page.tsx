import PhantomWalletDetector from "@/components/PhantomWalletDetector";

export default function PhantomPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold gradient-text mb-6 animate-slide-in">
          Phantom Wallet Detection
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
          Connect your Phantom wallet to view your public key and wallet information.
        </p>
      </div>

      {/* Phantom Wallet Detector */}
      <div className="animate-slide-in" style={{animationDelay: '0.2s'}}>
        <PhantomWalletDetector />
      </div>
    </div>
  );
}
