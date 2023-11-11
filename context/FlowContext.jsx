import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useConnect, useAccount } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

// Create the context with default values
const FlowContext = createContext(undefined);

// Custom hook to use the Flow context
export const useFlow = () => useContext(FlowContext);

// Provider component to wrap around components that need access to the context
export const FlowProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [active, setActive] = useState("learn");
  const [modalOpen, setModalOpen] = useState(false);
  const route = useRouter();
  const [miniPay, setMinipay] = useState(false);
  const { address } = useAccount();

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  useEffect(() => {
    const getAddress = async () => {
      if (address) {
        setCurrentUser(address);
      }
    };
    getAddress();
  }, [address]);

  useEffect(() => {
    connect();
  }, []);

  return (
    <FlowContext.Provider
      value={{
        currentUser,
        // logOut,
        setActive,
        active,
        modalOpen,
        setModalOpen,
        miniPay,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};
