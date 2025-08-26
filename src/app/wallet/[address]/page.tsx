import WalletInfoDisplay from "@/components/WalletInfoDisplay";
import Link from "next/link";

interface WalletPageProps {
  params: {
    address: string;
  };
}

export default function WalletPage({ params }: WalletPageProps) {
  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center">
        <Link
          href="/"
          className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Wallet Information */}
      <WalletInfoDisplay address={params.address} />
    </div>
  );
}
