// connectors.js
import {
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  coinbaseWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { chains } from "./wagmi";

const { wallets: defaultWallets } = getDefaultWallets({
  appName: "My Web3 App",
  chains,
});

export const connectors = connectorsForWallets([
  ...defaultWallets,
  {
    groupName: "Other wallets",
    wallets: [
      metaMaskWallet({ chains }),
      coinbaseWallet({ chains }),
      injectedWallet({ chains }),
    ],
  },
]);
