import { ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum, optimism } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors';

// Get your project ID from https://cloud.walletconnect.com
const projectId = '7a7b8c9d0e0f1g2h3i4j5k6l7m8n9o0p';

const config = createConfig({
  chains: [mainnet, polygon, arbitrum, optimism],
  connectors: [
    walletConnect({ projectId }),
    injected(),
    coinbaseWallet({ appName: 'Web3 Wallet Connect' }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
});

const queryClient = new QueryClient();

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}