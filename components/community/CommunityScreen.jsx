import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PostCard from "../../components/PostCard";

const CommunityScreen = ({ selectedCommunity }) => {
  const [communityPost, setCommunityPost] = useState([1, 2, 3, 4, 5, 6]);
  return (
    <div>
      <div className="flex items-center space-x-9">
        <AiOutlineArrowLeft size={24} />
        <span className="text-[26px] font-bold">Community</span>
      </div>
      <div className="mb-[200px]">
        <Image
          src={selectedCommunity?.image}
          alt={selectedCommunity.name}
          width={400}
          height={400}
          className="w-full h-[190px] object-cover"
        />
        <div className="flex flex-col items-start">
          <span className="text-[16px] font-semibold">
            {selectedCommunity?.name}
          </span>
          <span>{selectedCommunity.num_people}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center md:items-start md:justify-start gap-[20px] ">
          {communityPost.map((item, index) => (
            <PostCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityScreen;
