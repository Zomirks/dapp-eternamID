import { defineChain } from '@reown/appkit/networks'

export const hardhatNetwork = defineChain({
    id: 31337,
    caipNetworkId: 'eip155:31337',
    chainNamespace: 'eip155',
    name: 'Hardhat',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['http://127.0.0.1:8545'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Hardhat Explorer',
            url: 'http://localhost:8545',
        },
    },
    testnet: true,
})