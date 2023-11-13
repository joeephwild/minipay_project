import React from "react";
import { useLacentContent } from "../../context/LacentContentContext";
import Image from "next/image";
import { ClockIcon } from "@heroicons/react/solid";
import { useAccount } from "wagmi";

const PodcastCard = ({ title, host, imageUrl, description }) => {
  const { allContent, purcahseAContent } = useLacentContent();
  const account = useAccount();

  const handlePurcahse = async (id, amount) => {
    await purcahseAContent(id, amount);
  };

  return (
    <div className="md:max-w-[300px] w-full bg-white border border-gray-300 rounded-md overflow-hidden mb-16 shadow-md">
      <Image
        src="https://images.pexels.com/photos/18512532/pexels-photo-18512532/free-photo-of-a-mountain-range-with-a-small-pond-in-the-foreground.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
        alt={title}
        width={400}
        height={400}
        className="w-full h-40 object-cover object-center"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">Hosted by {host}</p>
        <p className="text-gray-700">{description}</p>
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

export default PodcastCard;
