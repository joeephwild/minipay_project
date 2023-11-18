import { ethers, utils } from "ethers";
import { useAccount, useBalance } from "wagmi";
import { useCallback } from "react";
import { useFlow } from "../context/FlowContext";

// Mainnet address of cUSD
const CUSD_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

export function useTransferCUSD() {
  const { walletAddress } = useFlow();

  const transferCUSD = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(walletAddress);
      
    }
  };

  return { transferCUSD };
}
