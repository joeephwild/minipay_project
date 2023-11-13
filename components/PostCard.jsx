import React from "react";
import Image from "next/image";
import {
  AiOutlineLike,
  AiOutlineShareAlt,
  AiOutlineComment,
} from "react-icons/ai";
import { MdOutlineAttachMoney } from "react-icons/md";

const PostCard = () => {
  const likePost = () => {
    console.log("Liked!");
  };

  const sharePost = () => {
    console.log("Shared!");
  };

  const commentPost = () => {
    console.log("Commented!");
  };

  const tipPost = () => {
    console.log("Tipped!");
  };

  return (
    <div className="w-full  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <Image
        className="w-full"
        width={300}
        height={300}
        src="https://images.pexels.com/photos/8486108/pexels-photo-8486108.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
        alt="PostCard Image"
      />
      <div className="p-4">
        <p className="text-xl font-semibold">Post Text goes here...</p>
        <p className="text-gray-600">Post Owner: John Doe</p>

        <div className="flex justify-between mt-4">
          <button className="btn" onClick={likePost}>
            <AiOutlineLike size={24} />
          </button>
          <button className="btn" onClick={sharePost}>
            <AiOutlineShareAlt size={24} />
          </button>
          <button className="btn" onClick={commentPost}>
            <AiOutlineComment size={24} />
          </button>
          <button className="btn" onClick={tipPost}>
            <MdOutlineAttachMoney size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
