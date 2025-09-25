import React, { useState,useEffect } from "react";
import { auth, db } from "../../config/firebase";
import { v4 as uuid} from "uuid";

import {
  setDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

function ChatList({chatId,setChatId,setIsFirstLoad}) {

  const [chats, setChats] = useState([]);
  const userId = localStorage.getItem("user")

  const handleNewChat = () => {
    setChatId(null);
  };
  useEffect(() =>  {

    let unsubscribe= () => {}; 
    const getChats = async () => {
      const conversationDocRef = doc(db, "conversations", userId);

      const snapshot =await getDoc(conversationDocRef);

      if (!snapshot.exists()) {
        const newChatId = uuid();
          await setDoc(doc(db,"conversations",userId), {
            [newChatId]: {
              email:userId,
              firstMessage: "New Conversation",
              lastMessageTimestamp: Date.now(),
            }
          })
      }

       unsubscribe = onSnapshot(conversationDocRef, async (doc) =>  {
      
        if (doc.exists()) {
          const data = doc.data();
          const messageList = [];
          Object.keys(data).forEach((key) => {
            if(data[key].email!=null){
              return;
            }
            messageList.push({
              message:  data[key].firstMessage,
              lastMessageTimestamp: data[key].lastMessageTimestamp,
              id: key,
            });
          })
          setChats(messageList);
        } 
      });
    }

      getChats();
      return () => unsubscribe();
  }, []);

  const handleChatClick = (id) => {
    setIsFirstLoad(true)
    setChatId(id);
  };

  return (
    <div className=" h-full w-full pt-4 px-2 text-white overflow-y-auto">
      <div className="flex justify-center p-4 ">
        <button className="p-2 md:p-4 bg-gray-700 flex gap-2 hover:bg-gray-800 hover:cursor-pointer rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>
          <p className="text-sm md:text-base font-bold" onClick={handleNewChat} >Create New Chat</p>
        </button>
      </div>
      {chats.length > 0 &&
        chats.sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp).map((chat, key) => (
        <div
          key={key}
          onClick={() => handleChatClick(chat.id)}
          className=" p-4 border-b border-gray-500 hover:bg-gray-800 hover:cursor-pointer hover:rounded-lg"
        >
          <p className="truncate">{chat.message}</p>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
