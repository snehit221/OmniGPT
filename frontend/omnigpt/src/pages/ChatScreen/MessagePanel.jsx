import React, { useState } from "react";
import UserBubble from "./UserBubble";
import GPTMessageBubble from "./GPTMessageBubble";
import { ToastContainer, toast } from "react-toastify";

const messagesTemp = [
  {
    id: 1,
    sender: "user",
    message: "How to integrate APIs in ReactJS jhdbqw dnqk diudj iduqd iuhqdq lqiuhdq  iquhdq liundqd ??",
  },
  {
    id: 2,
    sender: "bot",
    message1: "How to deploy a ReactJS application on Vercel?",
    message2:
      "How to import tailwind class in ReactJS jdkjwed wdblwjdk wqbdlwd wkdnlkw wdbwejkd wljdnwelkj wkjednlekjdn ljwenldjwn ljwbedljwken wehbdwljd hbdjwhebd iuwbedl",
    gpt1: "Gemini",
    gpt2: "Llama",
  },
  {
    id: 3,
    sender: "user",
    message: "What is react component?",
  },
  {
    id: 4,
    sender: "bot",
    message1: "How to deploy a ReactJS application on Vercel?",
    message2:
      "How to import tailwind class in ReactJS jdkjwed wdblwjdk wqbdlwd wkdnlkw wdbwejkd?",
    gpt1: "Gemini",
    gpt2: "Llama",
  },
];

function MessagePanel() {
  const [messages, setMessages] = useState(messagesTemp);
  const [userInput, setUserInput] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    console.log(userInput,isFormSubmitted);
    if (isFormSubmitted) return;

    setIsFormSubmitted(true);
    if (!userInput) {
      toast.error("Please enter a message");
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        sender: "user",
        message: userInput,
      },
    ]);

    setUserInput("");
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: "bot",
          message1:
            "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          message2:
            "test placeholder lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          gpt1: "Gemini",
          gpt2: "Llama",
        },
      ]);
      setIsFormSubmitted(false);
      
    }, 4000);

    
  };



  return (
    <div className="h-full w-full bg-gray-800 flex flex-col p-4 overflow-hidden">
      <div className="flex-1 flex-col overflow-y-auto p-3">
        {messages.map((message) => (
          <div key={message.id}>
            {message.sender === "user" ? (
              <UserBubble message={message.message} />
            ) : (
              <GPTMessageBubble gptResponse={message} />
            )}
          </div>
        ))}
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
      <ToastContainer />
    </div>
  );
}

export default MessagePanel;
