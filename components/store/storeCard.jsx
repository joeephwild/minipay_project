import React from "react";
import { useLacentContent } from "../../context/LacentContentContext";
import Image from "next/image";
import { ClockIcon } from "@heroicons/react/solid";
import {
  useAccount,
  useParticleProvider,
} from "@particle-network/connect-react-ui";
import { Packages } from "../../utils/index";
import { ethers } from "ethers";

const StoreCard = () => {
  const { conectwithContract } = useLacentContent();
  const account = useAccount();
  const particleProvider = useParticleProvider();

  const handlePurchase = async (id, amount) => {
    try {
      // Convert the amount to Wei (the smallest unit of Ether)
      const amountInWei = ethers.utils.parseEther(amount.toString());

      // Get the signer from the provider
      const provider = new ethers.providers.Web3Provider(
        particleProvider,
        "any"
      );
      const signer = provider.getSigner();

      // Create a transaction
      const transaction = {
        to: "0xC0B95C81E256C4aACa3547903a48AC67De586499", // The address of the recipient
        value: amountInWei, // The amount of Ether to send
      };

      const selectedPackage = Packages.find((pkg) => pkg.package_id === id);

      if (!selectedPackage) {
        alert("Invalid package ID");
        return;
      }

      const userBalance = await signer.getBalance();

      if (userBalance.lt(amountInWei)) {
        alert("Insufficient funds");
        return;
      }

      // Send the transaction
      const tx = await signer.sendTransaction({
        to: transaction.to,
        value: transaction.value,
        from: account,
      });

      // Wait for the transaction to be mined
      const receipt = await tx.wait();

      console.log("Transaction successful with hash:", receipt.transactionHash);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="md:max-w-[300px] w-full bg-white border border-gray-300 rounded-md overflow-hidden shadow-md">
      <Image
        src="https://images.pexels.com/photos/18512532/pexels-photo-18512532/free-photo-of-a-mountain-range-with-a-small-pond-in-the-foreground.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
        alt="store"
        width={400}
        height={400}
        className="w-full h-40 object-cover object-center"
      />
      <div className="p-4">
        <h3 className="text-lg text-Black font-semibold mb-2">Silver Reward</h3>
        <p className="text-gray-600 mb-2">Hosted by </p>
        <p className="text-gray-700">description</p>
      </div>

      <div className="bg-Black p-3 flex justify-between items-center">
        <button className="text-sm text-Accent focus:outline-none">
          Listen Now
        </button>
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-gray-500"
          >
            <path d="M12 2s-4 8-8 8 8 12 8 12 8-8 8-12-4-12-8-12zm0 0v12m0 0s-3-4-8-4" />
          </svg>
          <span className="text-gray-500">23</span>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
