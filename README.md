# SolanaTracker 🔍

A modern, responsive web application for tracking trending Solana tokens and exploring wallet information with real-time data from the Solana blockchain.

## ✨ Features

- **Trending Tokens Dashboard**: View real-time trending Solana tokens with price, volume, and market cap data
- **Wallet Information Explorer**: Search and analyze any Solana wallet address
- **Phantom Wallet Integration**: Connect your Phantom wallet to view your public key
- **Real-time Data**: Live data from Solana blockchain APIs
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **TypeScript Support**: Full type safety and better development experience

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.0 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Blockchain**: Solana Web3.js
- **Wallet Integration**: Phantom Wallet Adapter
- **Development**: ESLint, Turbopack

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Harshaka512/bytesquadlabs.git
   cd bytesquadlabs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SOLANA_TRACKER_API_URL=your_api_url_here
   NEXT_PUBLIC_SOLANA_TRACKER_API_KEY=your_api_key_here
   NEXT_PUBLIC_DEBUG_MODE=false
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── phantom/           # Phantom wallet page
│   └── wallet/[address]/  # Dynamic wallet info page
├── components/            # React components
│   ├── Navigation.tsx     # Navigation component
│   ├── PhantomWalletDetector.tsx
│   ├── TrendingTokensList.tsx
│   ├── WalletInfoDisplay.tsx
│   ├── WalletInfoForm.tsx
│   └── ui/               # UI components
└── lib/                  # Utility functions
    └── api.ts           # API integration
```

## 🔑 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_SOLANA_TRACKER_API_URL` | API endpoint for Solana data | No | `https://api.solanatracker.com` |
| `NEXT_PUBLIC_SOLANA_TRACKER_API_KEY` | API key for authentication | No | - |
| `NEXT_PUBLIC_DEBUG_MODE` | Enable debug logging | No | `false` |

## 🎯 Usage

### Viewing Trending Tokens
- Navigate to the home page to see trending Solana tokens
- View real-time price, volume, and market cap data
- Data automatically refreshes and falls back to mock data if API is unavailable

### Searching Wallet Information
- Use the wallet search form on the home page
- Enter any valid Solana wallet address
- View SOL balance and token holdings

### Connecting Phantom Wallet
- Install the Phantom Wallet browser extension
- Click "Connect Phantom Wallet" on the Phantom page
- View your public key and wallet information

## 🔒 Security

- API keys are stored in environment variables
- No sensitive data is exposed in client-side code
- `.env*` files are properly gitignored
- HTTPS is enforced in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Solana Labs](https://solana.com/) for the blockchain infrastructure
- [Phantom](https://phantom.app/) for wallet integration
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system

## 🌐 Live Demo

Check out the live application: **[SolanaTracker on Vercel](https://bytesquadlabs.vercel.app/)**

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ by ByteSquad Labs**
