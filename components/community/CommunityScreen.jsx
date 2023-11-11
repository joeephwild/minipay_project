import Image from "next/image";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const CommunityScreen = ({ selectedCommunity }) => {
  return (
    <div>
      <div className="flex items-center space-x-9">
        <AiOutlineArrowLeft size={24} />
        <span className="text-[26px] font-bold">Community</span>
      </div>
      <div>
        <Image
          src={selectedCommunity?.image}
          alt={selectedCommunity.name}
          width={40}
          height={40}
          className="w-full h-[199px] object-cover"
        />
        <div className="flex flex-col items-start">
            <span className="text-[16px] font-semibold">{selectedCommunity?.name}</span>
            <span>{selectedCommunity.num_people}</span>
        </div>
      </div>
    </div>
  );
};

export default CommunityScreen;
