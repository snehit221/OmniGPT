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
  const [isNewChat, setIsNewChat] = useState(true);
  const [chatId,setChatId] = useState(null);

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
      <header className="absolute inset-x-0 top-0 z-50 bg-gray-900">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className=" md:flex lg:flex-1">
            <div className=" hidden lg:visible">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">OmniGPT</span>
              <img className="h-8 w-auto" src={logoWhite} alt="" />
            </Link>
            </div>
            <button className={` md:hidden text-gray-400  rounded-lg`} onClick={toggleChatList}>
            {/* Burger Icon */}
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <p
                key={item.name}
                onClick={() => navigate(item.route)}
                className="text-sm font-semibold leading-6 text-white cursor-pointer"
              >
                {item.name}
              </p>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              {!user ? (
                <Link
                  to="/login"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
              ) : (
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="inline-flex w-full justify-center text-white gap-x-1.5 bg-transparent rounded-md px-3 py-2 text-sm font-semibold shadow-sm">
                      Welcome {user}
                      <ChevronDownIcon
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </MenuButton>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <MenuItem>
                            {({ focus }) => (
                              <p
                                onClick={handleLogout}
                                className={classNames(
                                  focus ? "  text-black" : "text-black",
                                  " block px-4 py-2 text-sm text-right cursor-pointer"
                                )}
                              >
                                Logout
                              </p>
                            )}
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Transition>
                  </div>
                </Menu>
              )}
            </div>
          </div>
        </nav>
        <Dialog
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">OmniGPT</span>
                <img className="h-12 w-auto" src={logoWhite} alt="" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <p
                      key={item.name}
                      onClick={() => navigate(item.route)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:cursor-pointer"
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
                <div className="py-6">
                  <p
                    onClick={handleLogout}
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log Out
                  </p>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      <main className="flex-1 flex text-sm md:text-base mt-20 overflow-hidden">
        <div
          className={`fixed md:relative overflow-hidden md:flex ${
            isChatListVisible ? "w-full" : "w-1/4"
          } w-1/4 z-50 bg-gray-900 transition-transform transform ${
            isChatListVisible ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <ChatList chatId={chatId} setChatId={setChatId}/>
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
          <MessagePanel chatId={chatId} setChatId={setChatId}/>
        </div>
      </main>
    </div>
  );
}

export default ChatScreen;
