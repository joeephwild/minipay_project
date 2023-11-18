import { useState, useEffect } from "react";
import Link from "next/link";
import Avatar from "react-avatar";
import { BiMenu } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { SidebarTab } from "../utils";
import { useFlow } from "../context/FlowContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { logo } from "../assets/images";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const {
    setActive,
    active,
    walletAddress,
    hideConnectBtn,
    setHideConnectBtn,
    setWalletAddress,
    connectWallet,
  } = useFlow();
  const route = useRouter();
  const { address } = useAccount();

  const handleRoute = (item, routePath) => {
    setActive(item);
    route.push(routePath);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setHideConnectBtn(true);
        }
      });
    }
  }, []);

  return (
    <nav className="bg-Black shadow-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image src={logo} alt="logo" className="object-contain md:hidden" />
          </Link>
          {address && (
            <div className="hidden md:flex space-x-4">
              <Link href="/beAMentor">
                <button className="text-Black bg-Accent px-6 py-2.5 rounded-lg">
                  Become a Mentor
                </button>
              </Link>
              <Link href="/profileOnboarding">
                <button className="text-Black bg-Accent px-6 py-2.5 rounded-lg">
                  Select Language
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="md:flex items-center hidden space-x-4">
          {!hideConnectBtn && (
            <button
              onClick={connectWallet}
              className="bg-Accent text-Black px-[20px] py-[12px] rounded-[8px] text-[12px] lg:text-[16px] lg:px-[26px] font-bold"
            >
              Connect Wallet
            </button>
          )}
          {hideConnectBtn && (
            <button className="text-Black flex items-center bg-Accent px-6 py-2.5 rounded-lg">
              <Image
                src="https://images.pexels.com/photos/18311326/pexels-photo-18311326/free-photo-of-a-woman-with-red-hair-and-green-jacket.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                alt="profile"
                width={400}
                height={400}
                className="w-[28px] h-[28px] object-contain rounded-full"
              />
              {walletAddress.slice(0, 9)}...{walletAddress.slice(36, 40)}
            </button>
          )}
        </div>
        <div className="md:hidden">
          <BiMenu size={28} onClick={toggleMenu} />
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 right-0 bg-Black z-[9999] h-[600px]  p-4">
          <div className="flex items-center justify-between w-full">
            <span>Home</span>
            <AiOutlineClose size={28} onClick={() => setIsMenuOpen(false)} />
          </div>
          <div className="flex flex-col space-y-[14px] items-center py-[54px]">
            {SidebarTab.map((item, i) => (
              <div
                onClick={() => handleRoute(item.active, item.route)}
                key={i}
                className={`${
                  active === item.active && "bg-Shade/White/40 "
                } w-full px-[24px] py-[12px] flex items-center space-x-[12px] cursor-pointer`}
              >
                <item.icons
                  color="white"
                  fontSize={20}
                  // color={active === item.active ? "#30F2A1" : "#98A2B3"}
                  className={`${
                    active === item.active ? "text-Accent" : "text-Grey"
                  } h-[20px] w-[20px] object-contain`}
                />
                <span
                  className={`${
                    active === item.active ? "text-[#fff]" : "text-Grey"
                  }`}
                >
                  {item.name}
                </span>
              </div>
            ))}
            {address && (
              <div className="flex space-x-3">
                <Link href="/beAMentor">
                  <button className="text-Black text-sm bg-Accent px-6 py-2 rounded-lg">
                    Become a Mentor
                  </button>
                </Link>
                <Link href="/profileOnboarding">
                  <button className="text-Black text-sm bg-Accent px-6 py-2 rounded-lg">
                    Select Language
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Add more links as needed */}
          <div className="flex items-center absolute bottom-9">
            {!address && (
              <button
                onClick={() => connect()}
                className="bg-Accent text-Black px-[20px] py-[12px] rounded-[8px] text-[12px] lg:text-[16px] lg:px-[26px] font-bold"
              >
                Connect Wallet
              </button>
            )}
            {address && (
              <button className="text-Black flex items-center bg-Accent px-6 py-2.5 rounded-lg">
                <Image
                  src="https://images.pexels.com/photos/18311326/pexels-photo-18311326/free-photo-of-a-woman-with-red-hair-and-green-jacket.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                  alt="profile"
                  width={400}
                  height={400}
                  className="w-[28px] h-[28px] object-contain rounded-full"
                />
                {address.slice(0, 9)}...{address.slice(36, 40)}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
