import React, { useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import PodcastCard from "../components/podcast/PodcastCard";
import { SearchIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

const Podcast = () => {
  const route = useRouter();
  const [allPodcast, setAllPodcast] = useState([1, 2, 3, 4, 5, 6]);
  
  return (
    <DefaultLayout>
      <Navbar />
      <div className="text-Black h-screen p-[20px] overflow-y-scroll">
        <span className="text-[24px] font-normal">Podcast</span>
        <div className="flex items-center justify-around space-x-4 sm:space-x-9 w-full">
          <div className="flex bg-white border border-Grey p-3 sm:p-5 items-start space-x-2 sm:space-x-5 w-full sm:w-[90%]">
            <SearchIcon className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] object-contain" />
            <input
              placeholder="Search podcasts"
              className="w-full border-none outline-none bg-transparent text-[14px] sm:text-[16px]"
            />
          </div>
          <button
            onClick={() => route.push("/uploadAPodcast")}
            className="bg-Accent w-[30%] sm:w-[10%] py-[10px] text-[14px] sm:text-[16px] font-medium text-Black flex items-center justify-center"
          >
            Upload Podcast
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-[33px] gap-y-11 mb-[60px] mt-[20px] sm:mt-[62px]">
          {allPodcast.map((item, i) => (
            <PodcastCard
              key={i}
              title="Sample Podcast"
              host="John Doe"
              imageUrl="https://images.pexels.com/photos/18512532/pexels-photo-18512532/free-photo-of-a-mountain-range-with-a-small-pond-in-the-foreground.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Podcast;
