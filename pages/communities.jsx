import React, { useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { languageCommunity } from "../utils";
import CommunityScreen from '../components/community/CommunityScreen';

const Communities = () => {
  const [communities, setCommunities] = useState(languageCommunity);
  const [selectedCommunity, setSelectedCommunity] = useState(languageCommunity[0]);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleCommunityClick = (community) => {
    setSelectedCommunity(community);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <DefaultLayout>
        <Navbar />
        <section className="flex items-start text-black w-full min-h-screen ">
          {showSidebar && (
            <div
              className={`${
                showSidebar ? "md:w-[10%] w-[50%]" : "w-0"
              } bg-Black min-h-screen p-4 border-l border-Grey flex flex-col items-center transition-all duration-300 ease-in-out`}
            >
              {communities.slice(0, 4).map((community) => (
                <div
                  key={community.id}
                  onClick={() => handleCommunityClick(community)}
                  className={`cursor-pointer ${
                    selectedCommunity?.name === community.name
                      ? "border-Accent border-2 rounded-full"
                      : "hover:bg-gray-100"
                  } p- mb-2 rounded-md w-[90px] h-[90px]`}
                >
                  <Image
                    src={community.image}
                    alt={community.name}
                    width={400}
                    height={400}
                    className="w-[90px] h-[90px] rounded-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex-1 p-4">
            {selectedCommunity ? (
              <div className="overflow-y-scroll h-screen flex-1">
                <CommunityScreen selectedCommunity={selectedCommunity} />
              </div>
            ) : (
              <p className="">Select a community to view its posts</p>
            )}
          </div>
        </section>

        {/* Mobile view toggle button */}
        <button
          className="fixed bottom-4 right-4 p-2 bg-blue-500  text-white rounded-full"
          onClick={toggleSidebar}
        >
          {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
        </button>
      </DefaultLayout>
    </div>
  );
};

export default Communities;
