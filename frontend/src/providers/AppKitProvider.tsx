'use client';

import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { hardhatNetwork } from '@/config/hardhat-network';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import type { AppKitNetwork } from '@reown/appkit/networks';

// Setup queryClient
const queryClient = new QueryClient()

// Get projectId from https://dashboard.reown.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
    throw new Error("Project ID is not defined");
}

// Create a metadata object - optional
const metadata = {
    name: "EternamID",
    description: "Préservez l'histoire de vos proches pour toujours sur la blockchain",
    url: "http://localhost:3000/",
    icons: ["https://avatars.githubusercontent.com/u/179229932"]
}

// Set the networks
const networks = [hardhatNetwork] as [AppKitNetwork, ...AppKitNetwork[]]

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
    ssr: true
})

// Create modal
createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    metadata,
    features: {
        analytics: true
    }
})

export default function AppKitProvider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}