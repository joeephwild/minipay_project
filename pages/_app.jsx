import "../styles/globals.css";
import { FlowProvider } from "../context/FlowContext";
import { UserProvider } from "../context/ProfileContext";
import { MentorProvider } from "../context/MentorContext";
import { CommunityProvider } from "../context/CommunityContext";
import { LacentBadgeProvider } from "../context/Badge";
import { LacentContentProvider } from "../context/LacentContentContext";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import celoGroups from "@celo/rainbowkit-celo/lists";
import { Alfajores, Celo, Cannoli } from "@celo/rainbowkit-celo/chains";
import "@rainbow-me/rainbowkit/styles.css";

const { chains, publicClient } = configureChains(
  [Alfajores, Celo, Cannoli],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const projectId = "7825ba6c0326e0da37dcaafc29ed5570"; // get one at https://cloud.walletconnect.com/app

const connectors = celoGroups({
  chains,
  projectId,
  appName: (typeof document === "object" && document.title) || "Your App Name",
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: publicClient,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} coolMode={true}>
        <FlowProvider>
          <CommunityProvider>
            <MentorProvider>
              <UserProvider>
                <LacentBadgeProvider>
                  <LacentContentProvider>
                    <Component {...pageProps} />
                  </LacentContentProvider>
                </LacentBadgeProvider>
              </UserProvider>
            </MentorProvider>
          </CommunityProvider>
        </FlowProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
