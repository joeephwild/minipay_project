import { ConnectButton, useAccount } from "@particle-network/connect-react-ui";
import { boy, plant, main, logo } from "../assets/images";
import "@particle-network/connect-react-ui/dist/index.css";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useFlow } from "../context/FlowContext";

const Hero = () => {
  const account = useAccount();
  const route = useRouter();
  const { miniPay } = useFlow();
  return (
    <div className="w-screen mt-[20px] px-[18px] md:mr-[145px] md:ml-[85.71px] flex flex-col md:flex-row items-center">
      <div className="flex flex-col md:w-[50%] md:mt-[89px] gap-[20px] mt-[40px] items-center justify-center">
        <span className="text-Accent text-[16px] font-bold items-center text-center md:text-start md:self-start">
          E-COURSE PLATFORM
        </span>
        <h1 className="text-black text-5xl md:text-6xl lg:text-7xl font-black text-center md:self-start md:text-start">
          Learning and teaching online, made easy.
        </h1>
        <span className="text-[14px] text-Black font-semibold text-center  md:self-start md:text-start">
          Practice and learn new things with the platform.
        </span>
        <div className="flex items-center space-x-7  md:self-start md:text-start">
          {!miniPay && (
            <div>
              {!account && (
                <div className=" flex items-center">
                  <ConnectButton />
                </div>
              )}
            </div>
          )}

          {account && (
            <button
              onClick={() => route.push("/dashboard")}
              className="bg-Accent text-Black px-[20px] py-[12px] rounded-[8px] text-[12px] font-bold"
            >
              Dashboard
            </button>
          )}

          {miniPay && (
            <button
              onClick={() => route.push("/dashboard")}
              className="bg-Accent text-Black px-[20px] py-[12px] rounded-[8px] text-[12px] font-bold"
            >
              Dashboard
            </button>
          )}

          <button className="border-2 border-Accent text-Black px-[20px] py-[12px] rounded-[8px] text-[12px] font-bold">
            Learn More
          </button>
        </div>

        <div className="flex items-center text-center  md:self-start md:text-start gap-[40px]">
          <div className="flex flex-col items-center">
            <span className="text-[20px] font-bold text-Black leading-[100%] flex text-center items-center">
              $750k<span className="text-Accent">+</span>
            </span>
            <span className="text-Black text-xl">Earned by 2024</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[20px] font-bold text-Black leading-[100%] flex items-center">
              $750k<span className="text-Accent">+</span>
            </span>
            <span className="text-Black text-xl">Earned by 2024</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col relative items-center mt-[40px] md:w-[50%] md:mr-[85px]">
        <Image
          src={boy}
          alt="main"
          className="w-[278.699px] h-[236px] md:w-[476px] md:h-[397.551px]  top-[197px] right-[97px] object-fill"
        />
        <Image
          src={plant}
          alt="main"
          className="w-[172px] h-[266px] md:h-[447px] object-fill absolute  top-[0px] right-0"
        />
      </div>
    </div>
  );
};

export default Hero;

/**
 * 
 *  <div className="text-container">
        <div className="flex items-start space-x-8">
          <Image
            src={logo}
            alt="logo"
            className="w-[48px] h-[48px] object-contain"
          />
          <span className="text-[38px] font-bold text-Black">Lacent</span>
        </div>
        <h2 className="w-[780px] text-Black text-8xl font-black">
          Learning and teaching, made{" "}
          <span className="text-Accent">decentralized.</span>
        </h2>
        <span className="w-[780px] text-Grey text-xl font-normal">
          Enter the decentralized world in style as a langauge enthusiast, Earn
          and learn with smooth transaction all made possible with Verbal.
        </span>
        <div className="flex items-center space-x-7">
          {!miniPay && (
            <div>
              {!account && (
                <div className=" flex items-center">
                  <ConnectButton />
                </div>
              )}
            </div>
          )}

          {account && (
            <button
              onClick={() => route.push("/dashboard")}
              className="bg-Accent text-Black px-[20px] py-[12px] rounded-[8px] text-[16px] font-bold"
            >
              Dashboard
            </button>
          )}

          {miniPay && (
            <button
              onClick={() => route.push("/dashboard")}
              className="bg-Accent text-Black px-[56px] py-[16px] rounded-[8px] text-[16px] font-bold"
            >
              Dashboard
            </button>
          )}

          <button className="border-2 border-Accent text-Black px-[56px] py-[16px] rounded-[8px] text-[16px] font-bold">
            Learn More
          </button>
        </div>
        <div className="flex items-center space-x-[80px]">
          <div className="flex flex-col items-start">
            <span className="text-5xl text-Black leading-[100%] flex items-center">
              700<span className="text-Accent">+</span>
            </span>
            <span className="text-Black text-xl">Hours of Content by 2024</span>
          </div>

          <div className="flex flex-col items-start">
            <span className="text-5xl text-Black leading-[100%] flex items-center">
              575k<span className="text-Accent">+</span>
            </span>
            <span className="text-Black text-xl">Active Users by 2024</span>
          </div>

          <div className="flex flex-col items-start">
            <span className="text-5xl text-Black leading-[100%] flex items-center">
              $750k<span className="text-Accent">+</span>
            </span>
            <span className="text-Black text-xl">Earned by 2024</span>
          </div>
        </div>
      </div>
      <div className="image-container">
        <Image
          src={main}
          alt="main"
          className="w-[312px] h-[234px]  top-[447px] right-[607px] object-contain"
        />
        <Image
          src={boy}
          alt="main"
          className="w-[705.699px] h-[597px]  top-[197px] right-[97px] object-fill"
        />
        <Image
          src={plant}
          alt="main"
          className="w-[494px] h-[747px] object-fill  top-[197px] right-0"
        />
      </div>
 */
