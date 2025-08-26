import PhantomWalletDetector from "@/components/PhantomWalletDetector";

export default function PhantomPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Phantom Wallet Detection
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect your Phantom wallet to view your public key and wallet information.
        </p>
      </div>

      {/* Phantom Wallet Detector */}
      <PhantomWalletDetector />
    </div>
  );
}
