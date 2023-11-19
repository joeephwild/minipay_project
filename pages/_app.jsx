import "../styles/globals.css";
import { FlowProvider } from "../context/FlowContext";
import { UserProvider } from "../context/ProfileContext";
import { MentorProvider } from "../context/MentorContext";
import { CommunityProvider } from "../context/CommunityContext";
import { LacentBadgeProvider } from "../context/Badge";
import { LacentContentProvider } from "../context/LacentContentContext";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { Alfajores, Celo, Cannoli } from "@celo/rainbowkit-celo/chains";
import "@rainbow-me/rainbowkit/styles.css";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";

const { chains, publicClient } = configureChains(
  [Alfajores, Celo],
  [publicProvider()]
);

const connectors = [new InjectedConnector({ chains })];

const wagmiConfig = createConfig({
  connectors,
  publicClient: publicClient,
});

const appInfo = {
  appName: "Celo Composer",
};

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
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
    </WagmiConfig>
  );
}

export default MyApp;
