import { createConfig, http } from "wagmi";
import { mainnet, base } from "wagmi/chains";

const projectId = import.meta.env.Project_ID;

export const wagmiConfig = createConfig({
  chains: [mainnet, base],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});
