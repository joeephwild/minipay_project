import { utils } from "ethers";
import { useAccount, useBalance } from "wagmi";
import { useCallback } from "react";

// Mainnet address of cUSD
const CUSD_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

export function useTransferCUSD() {
  const { address } = useAccount();

  const transferCUSD = useCallback(async (receiverAddress, amount) => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      // Get user's balance
      let balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });

      // Convert balance to Ether
      let balanceInEther = utils.formatEther(balance);

      // Check if balance is sufficient
      if (parseFloat(balanceInEther) < parseFloat(amount)) {
        alert("Insufficient balance");
        return;
      }

      let iface = new utils.Interface([
        "function transfer(address to, uint256 value)",
      ]);

      let calldata = iface.encodeFunctionData("transfer", [
        receiverAddress,
        utils.parseEther(amount), // This amount is in wei
      ]);

      // Send transaction to the injected wallet to be confirmed by the user.
      let tx = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: address,
            to: CUSD_ADDRESS, // We need to call the transfer function on the cUSD token contract
            data: calldata, // Information about which function to call and what values to pass as parameters
          },
        ],
      });

      // Wait until tx confirmation and get tx receipt
      let receipt = await tx.wait();
      return receipt;
    } else {
      throw new Error("Ethereum is not available");
    }
  }, [address]);

  return { transferCUSD };
}