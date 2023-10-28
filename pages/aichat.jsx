import React, { useEffect, useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import { ChatCompoents, InputBox } from "../components/AiChat";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useFlow } from "../context/FlowContext";
import { useAccount } from "@particle-network/connect-react-ui";


const AiChat = () => {
  const [chatHistories, setChatHistories] = useState([]);
  console.log(chatHistories)
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [text, setText] = useState("");
  const { currentUser } = useFlow();
  const account = useAccount()

  useEffect(() => {
    const fetchChat = async () => {
      if (account) {
        const q = query(
          collection(db, "chatrooms"),
          where("userId", "==", account),
          orderBy("created_at")
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let chat = [];
          querySnapshot.forEach((doc) => {
            chat.push({ ...doc.data(), id: doc.id });
          });
          setChatHistories(chat);
        });

        return () => {
          unsubscribe();
        };
      }
    };
    fetchChat();
  }, [account]);

  return (
    <DefaultLayout>
      <Navbar />
      <div className="flex items-start">
        <div className="md:w-[80%] w-full overflow-y-scroll scrollbar-hide text-Black md:m-[10px]">
          <span className="text-[28px] my-[31px] mx-[37px] text-Black">
            Learn with AI
          </span>
          <div className="flex-1 min-h-screen w-full mt-[20px] scrollbar m-9">
            {chatHistories.map((item, i) => (
              <ChatCompoents key={i} {...item} />
            ))}
          </div>
          <InputBox text={text} setText={setText} />
        </div>
        <div className="md:w-[20%] hidden bg-black h-screen"></div>
      </div>
    </DefaultLayout>
  );
};

export default AiChat;
