import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useConnect, useAccount, configureChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ethers } from "ethers";
import { communityAbi, communityAddress } from "../constants/contract";
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";
import { publicProvider } from "wagmi/providers/public";

// Create the context with default values
const FlowContext = createContext(undefined);

// Custom hook to use the Flow context
export const useFlow = () => useContext(FlowContext);

// Provider component to wrap around components that need access to the context
export const FlowProvider = ({ children }) => {
  const [allCommunity, setAllCommunity] = useState([]);
  const [active, setActive] = useState("learn");
  const [modalOpen, setModalOpen] = useState(false);
  const [isUserMember, setIsUserMember] = useState(false);
  const { address, isConnected } = useAccount();
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  // console.log(address);
  // const { chains, publicClient } = configureChains(
  //   [Alfajores, Celo],
  //   [publicProvider()]
  // );
  // const { connect } = useConnect({
  //   connector: new InjectedConnector({}),
  // });

  // useEffect(() => {
  //   setHideConnectBtn(true);
  //   connect();
  // }, []);

  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setHideConnectBtn(true);
        }
      });
    } else {
      alert("Ethereum desnt exist");
    }
  }, []);

  const walletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setHideConnectBtn(true);
        } else {
          setWalletAddress(null);
          setHideConnectBtn(false);
        }
      });
    }
  };

  useEffect(() => {
    walletListener();
  }, [walletAddress]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const conectwithContract = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window?.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          communityAddress,
          communityAbi,
          signer
        );
        return contract;
      } else {
        alert("no ethereum provider");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to create a new community
  const createCommunity = async (name, description, image) => {
    try {
      const contract = await conectwithContract();
      if (contract) {
        const tx = await contract.createCommunity(name, description, image);
        // Wait for the tx to be mined
        const receipt = await tx.wait();

        // Retrieve the tx hash from the receipt
        const transactionHash = receipt.transactionHash;

        if (transactionHash) {
          location.reload();
        }

        // You may want to add additional logic here, such as updating state or showing a success message.
        return transactionHash;
      }
    } catch (error) {
      console.error("Error creating community:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  // Function to join an existing community
  const joinCommunity = async (communityId) => {
    try {
      const contract = await conectwithContract();
      if (contract) {
        const tx = await contract.joinACommunity(communityId);

        const receipt = tx.wait();

        if (receipt) {
          location.reload();
        }
        // You may want to add additional logic here, such as updating state or showing a success message.
      }
    } catch (error) {
      console.error("Error joining community:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const retriveUserCommunity = async () => {
    try {
      const contract = await conectwithContract();
      // Call the retreiveCommunity function
      const communities = await contract.retreiveAllCommunities();
      // Return the result
      setAllCommunity(communities);
      return communities;
    } catch (error) {
      console.log(error.message);
    }
  };

  const ifMember = async (_communityId) => {
    try {
      if (address) {
        const contract = await conectwithContract();
        const isMember = contract.isUserMemberOfCommunity(_communityId, walletAddress);
        setIsUserMember(isMember);
        return isMember
      }
    } catch (error) {
      console.log("error checking if memeber", error.message);
    }
  };

  useEffect(() => {
    retriveUserCommunity();
    ifMember();
  }, [walletAddress]);

  return (
    <FlowContext.Provider
      value={{
        allCommunity,
        active,
        modalOpen,
        setModalOpen,
        isUserMember,
        createCommunity,
        joinCommunity,
        setActive,
        hideConnectBtn,
        setHideConnectBtn,
        walletAddress,
        connectWallet,
        setWalletAddress,
        ifMember
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};
