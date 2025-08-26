'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Trending Tokens' },
    { href: '/phantom', label: 'Phantom Wallet' },
  ];

  return (
    <nav className="bg-card-bg border-b border-card-border backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="text-2xl font-bold gradient-text animate-float">🌞</div>
              <span className="ml-3 text-xl font-bold gradient-text">SolanaTracker</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? 'bg-primary text-white glow-primary'
                    : 'text-text-secondary hover:text-primary hover:bg-primary/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
