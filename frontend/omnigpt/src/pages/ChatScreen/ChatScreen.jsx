import React from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogPanel } from "@headlessui/react";
import logoWhite from "../../assets/images/logos/logo-no-background.svg";
import ChatList from "./ChatList";
import MessagePanel from "./MessagePanel";
import ChatNavbar from "../../components/ChatNavbar";

const navigation = [
  { name: "Home", route: "/" },
  { name: "Pricing", route: "/pricing" },
  { name: "Chat", route: "/chat" },
];

function classNames(...classes) {return classes.filter(Boolean).join(' ')}


function ChatScreen() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const [isChatListVisible, setIsChatListVisible] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const toggleChatList = () => {
    setIsChatListVisible(!isChatListVisible);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setUser(localStorage.getItem("user"));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900">
      <ChatNavbar toggleChatList={toggleChatList} />
      <main className="flex-1 flex text-sm md:text-base mt-20 overflow-hidden">
        <div
          className={`fixed md:relative overflow-hidden md:flex ${
            isChatListVisible ? "w-full" : "w-1/4"
          } w-1/4 z-40 bg-gray-900 transition-transform transform ${
            isChatListVisible ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <ChatList chatId={chatId} setChatId={setChatId} setIsFirstLoad={setIsFirstLoad}/>
          <button
            className="md:hidden absolute top-4 right-4 text-white"
            onClick={toggleChatList}
          >
            {/* Close Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-1">
          <MessagePanel chatId={chatId} setChatId={setChatId} isFirstLoad={isFirstLoad} setIsFirstLoad={setIsFirstLoad}/>
        </div>
      </main>

    </div>
  );
}

export default ChatScreen;
