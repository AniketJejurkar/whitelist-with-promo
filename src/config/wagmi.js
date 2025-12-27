// wagmi.js
import { createConfig, http } from "wagmi";
import { mainnet, base } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

import {
  metaMaskWallet,
  rainbowWallet,
  trustWallet,
  binanceWallet,
  okxWallet,
  coinbaseWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

const connectors = connectorsForWallets(
  [
    {
      groupName: "Popular",
      wallets: [rainbowWallet, metaMaskWallet, coinbaseWallet],
    },
    {
      groupName: "Other Wallets",
      wallets: [trustWallet, binanceWallet, okxWallet, walletConnectWallet],
    },
  ],
  { appName: "My Web3 App", projectId }
);

export const wagmiConfig = createConfig({
  chains: [mainnet, base],
  connectors,
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});
