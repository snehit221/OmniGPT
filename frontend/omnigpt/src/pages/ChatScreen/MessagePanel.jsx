import React, { useEffect, useState, useRef } from "react";
import UserBubble from "./UserBubble";
import GPTMessageBubble from "./GPTMessageBubble";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../config/firebase";
// import { exportPDFWithComponent } from "../../util/pdfLib";
import { importFile } from "../../util/importExportLib";
import {
  setDoc,
  doc,
  collection,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { getLlamaResponse } from "../../util/getLlamaResponse";
import { getGeminiResponse } from "../../util/gptUtil";
import { PDFExport } from "@progress/kendo-react-pdf";
import pdfLogo from "../../assets/images/pdf.svg";
import { exportFile } from "../../util/importExportLib";
import { UserPlusIcon } from "@heroicons/react/20/solid";
import AddUserModal from "./AddUserModal";

function MessagePanel({ chatId, setChatId, isFirstLoad, setIsFirstLoad }) {
  const [messages, setMessages] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const messageSubRef = useRef(null);
  const pdfExportComponent = React.useRef(null);

  useEffect(() => {
    if (messageSubRef.current) {
      messageSubRef.current();
    }

    if (chatId == null) {
      setMessages([]);
    } else {
      setMessages([]);
      const chatDocRef = doc(db, "chats", chatId);
      const unsubscribe = onSnapshot(chatDocRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          const messageList = [];
          const members = data.members;
          const result = data.messages;
          result.map((msg, index) => {
            if (msg.sender == "user") {
              messageList.push({
                message: msg.message,
                sender: msg.sender,
                timestamp: msg.timestamp,
                id: msg.id,
              });
            } else {
              messageList.push({
                message1: msg.message1,
                message2: msg.message2,
                gpt1: msg.gpt1,
                gpt2: msg.gpt2,
                sender: msg.sender,
                likedResponse: msg?.likedResponse,
                timestamp: msg.timestamp,
                id: msg.id,
              });
            }
          });

          setMessages(messageList);
          setMemberList(members);
        } else {
          console.log("No such document!");
        }
      });
      messageSubRef.current = unsubscribe;

      return () => {
        if (messageSubRef.current) {
          messageSubRef.current();
        }
      };
    }
  }, [chatId]);

  const handleDialogShow = () => {
    setShowDialog(!showDialog);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    setIsFirstLoad(false);
    const userId = localStorage.getItem("user");
    if (isFormSubmitted) return;

    setIsFormSubmitted(true);
    if (!userInput) {
      toast.error("Please enter a message");
      return;
    }
    // Construct the message object
    const newMessage = {
      id: (messages.length + 1).toString(),
      sender: "user",
      message: userInput,
      timestamp: Date.now(), // Using current time in milliseconds
    };
    let firebaseId = null;

    if (chatId == null) {
      const newDocRef = doc(collection(db, "chats")); // Correctly generating a new document reference
      firebaseId = newDocRef.id;

      // Construct the document data
      const docData = {
        members: [userId],
        messages: [newMessage],
      };

      try {
        // Insert the document into Firestore
        await setDoc(newDocRef, docData);
        setChatId(firebaseId);

        const conversationDocRef = doc(db, "conversations", userId);
        const conversationDoc = await getDoc(conversationDocRef);
        if (conversationDoc.exists()) {
          // If document exists, update it
          await setDoc(
            conversationDocRef,
            {
              [firebaseId]: {
                firstMessage: newMessage.message,
                lastMessageTimestamp: newMessage.timestamp,
              },
            },
            { merge: true }
          );
        } else {
          // If document does not exist, create a new one

          await setDoc(conversationDocRef, {
            [firebaseId]: {
              firstMessage: newMessage.message,
              lastMessageTimestamp: newMessage.timestamp,
            },
          });
        }
      } catch (error) {
        console.error("Error adding document: ", error);
        toast.error("Error sending message. Please try again.");
      }
    } else {
      // console.log("chatId for second message:", chatId);
      const chatDocRef = doc(db, "chats", chatId);

      try {
        await updateDoc(chatDocRef, {
          messages: arrayUnion(newMessage),
        });

        memberList.map(async (memberId) => {
          // console.log("Updating for memberId:", memberId);
          const conversationDocRef = doc(db, "conversations", memberId);
          await updateDoc(conversationDocRef, {
            [`${chatId}.lastMessageTimestamp`]: newMessage.timestamp,
            [`${chatId}.firstMessage`]: newMessage.message,
          });
        });
      } catch (error) {
        console.error("Error updating document: ", error);
        toast.error("Error sending message. Please try again.");
      }
    }

    //
    const message1 = await getLlamaResponse(userInput);
    // const message1 = await getGeminiResponse(userInput);
    const message2 = await getGeminiResponse(userInput);
    if (firebaseId != null) {
      addBotMessage(
        firebaseId, // chatId
        "bot", // sender
        "Lllama", // gpt1
        "Gemini", // gpt2
        message1, // message1
        message2, // message2
        Date.now() // timestamp
      );
    } else if (chatId != null) {
      addBotMessage(
        chatId, // chatId
        "bot", // sender
        "Lllama", // gpt1
        "Gemini", // gpt2
        message1, // message1
        message2, // message2
        Date.now() // timestamp
      );
    }
    setUserInput("");
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const result = await importFile(file);
        console.log("File imported successfully:", result);
      } catch (err) {
        console.error("Error importing file:", err);
      }
    }
    event.target.value = null;
  };
  const addBotMessage = async (
    chatId,
    sender,
    gpt1,
    gpt2,
    message1,
    message2,
    timestamp
  ) => {
    const userId = localStorage.getItem("user");

    const newMessage = {
      id: (messages.length + 2).toString(),
      sender,
      gpt1,
      gpt2,
      message1,
      message2,
      timestamp,
      likedResponse: null,
    };

    try {
      const chatDocRef = doc(db, "chats", chatId);
      await updateDoc(chatDocRef, {
        messages: arrayUnion(newMessage),
      });

      // Update the conversation document
      const conversationDocRef = doc(db, "conversations", userId);
      await updateDoc(conversationDocRef, {
        [`${chatId}.lastMessageTimestamp`]: newMessage.timestamp,
      });
    } catch (error) {
      console.error("Error updating documents: ", error);
    }
    setIsFormSubmitted(false);
  };

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  const handleAddUser = async (useremail) => {
    console.log("Inside handleAddUser", useremail);
    const chatDocRef = doc(db, "chats", chatId);
    try {
      // Adding the new user to the "members" array
      await updateDoc(chatDocRef, {
        members: arrayUnion(useremail),
      });

      const conversationDocRef = doc(db, "conversations", useremail);
      const conversationDoc = await getDoc(conversationDocRef);
      const lastMessage=messages[messages.length-2]
      if (conversationDoc.exists()) {
        // If document exists, update it
        await setDoc(
          conversationDocRef,
          {
            [chatId]: {
              firstMessage: lastMessage.message,
              lastMessageTimestamp: lastMessage.timestamp,
            },
          },
          { merge: true }
        );
      } else {
        // If document does not exist, create a new one

        await setDoc(conversationDocRef, {
          [chatId]: {
            firstMessage: lastMessage.message,
            lastMessageTimestamp: lastMessage.timestamp,
          },
        });
      }
      toast.success("User added successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
    handleDialogShow();
  };

  return (
    <div className="flex flex-col  w-full h-full">
      {showDialog && (
        <AddUserModal
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          handleAddUser={handleAddUser}
        />
      )}
      <div className="flex justify-between sticky w-full h-14 items-center bg-gray-600">
        <div className="p-3">
          <button
            onClick={() => handleDialogShow()}
            className="flex items-center gap-2 text-white rounded-lg bg-gray-700 hover:bg-gray-800 hover:cursor-pointer p-2"
          >
            <UserPlusIcon className="w-6 h-6 " />
            Add User
          </button>
        </div>
        <div className="flex px-3 gap-6 ">
          <button
            className="text-sm hover:scale-125 transition ease-in-out duration-500  cursor-pointer"
            onClick={exportPDFWithComponent}
          >
            <img src={pdfLogo} className="h-8" alt="pdf logo" />
          </button>
          <button
            className="flex items-center text-sm hover:scale-125 transition ease-in-out duration-500 cursor-pointer"
            onClick={() =>
              exportFile(messages, new Date().getTime().toString())
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="size-8"
              width="24px"
              height="24px"
            >
              <path
                fillRule="evenodd"
                d="M9.75 6.75h-3a3 3 0 0 0-3 3v7.5a3 3 0 0 0 3 3h7.5a3 3 0 0 0 3-3v-7.5a3 3 0 0 0-3-3h-3V1.5a.75.75 0 0 0-1.5 0v5.25Zm0 0h1.5v5.69l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72V6.75Z"
                clipRule="evenodd"
              />
              <path d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h7.5a3 3 0 0 0 3-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 0 1-4.5 4.5H7.151Z" />
            </svg>
          </button>

          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-flex align-middle items-center"
          >
            <input
              type="file"
              id="file-upload"
              accept=".json"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="size-8"
            >
              <path d="M9.97.97a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 0 1-1.06-1.06l3-3ZM9.75 6.75v6a.75.75 0 0 0 1.5 0v-6h3a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3h3Z" />
              <path d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h7.5a3 3 0 0 0 3-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 0 1-4.5 4.5H7.151Z" />
            </svg>
          </label>
        </div>
      </div>
      <div
        id="message"
        className="h-full w-full bg-gray-800 flex flex-col p-4 overflow-hidden"
      >
        <div className="flex-1 flex-col overflow-y-auto p-3">
          <PDFExport
            ref={pdfExportComponent}
            paperSize="auto"
            margin={40}
            fileName={`chat-${Date.now()}.pdf`}
            author="OmniGPT"
          >
            {messages.map((message, index) => (
              <div key={message.id}>
                {message.sender === "user" ? (
                  <UserBubble message={message.message} />
                ) : (
                  <GPTMessageBubble
                    gptResponse={message}
                    isFirstLoad={isFirstLoad}
                    isLastMessage={index === messages.length - 1}
                    chatId={chatId}
                  />
                )}
              </div>
            ))}
          </PDFExport>
        </div>
        <div className=" w-full flex gap-2">
          <input
            type="text"
            name="message"
            value={userInput}
            onChange={handleUserInput}
            placeholder="Type your message"
            onKeyPress={handleKeyPress}
            className="w-full p-3 text-white bg-gray-600 rounded-lg focus:outline-none"
          />

          <button
            className=" p-3 bg-gray-600 rounded-lg text-white hover:bg-gray-400 "
            onClick={handleSendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MessagePanel;
