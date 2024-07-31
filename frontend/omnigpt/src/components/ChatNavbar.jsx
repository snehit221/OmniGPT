import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import logoWhite from "../assets/images/logos/logo-no-background.svg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { unstable_batchedUpdates } from "react-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ChatNavbar({toggleChatList}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {

      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            unstable_batchedUpdates(() => {
              setUser(userData.name);
              setIsSubscribed(!!userData.subscriptionDetails);
            });
          }
        } else {
          unstable_batchedUpdates(() => {
            setUser(null);
            setIsSubscribed(false);
          });
        }
      });
    };

    if (token) {
      fetchUserData();
    }
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setIsSubscribed(false);
      navigate("/");
    });
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
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
          <Link
            to="/"
            className="text-sm font-semibold leading-6 text-white cursor-pointer"
          >
            Home
          </Link>
          {isSubscribed ? (
            <Link
              to="/chat"
              className="text-sm font-semibold leading-6 text-white cursor-pointer"
            >
              Chat
            </Link>
          ) : (
            <Link
              to="/pricing"
              className="text-sm font-semibold leading-6 text-white cursor-pointer"
            >
              Pricing
            </Link>
          )}
        </div>
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
                        <Link
                          to="/profile"
                          className={classNames(
                            "block px-4 py-2 text-sm text-right cursor-pointer"
                          )}
                        >
                          Profile
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="py-1">
                      <MenuItem>
                        {({ active }) => (
                          <p
                            onClick={handleLogout}
                            className={classNames(
                              active ? "text-black" : "text-black",
                              "block px-4 py-2 text-sm text-right cursor-pointer"
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
              <img className="h-8 w-auto" src={logoWhite} alt="" />
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
                <Link
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:cursor-pointer"
                >
                  Home
                </Link>
                {isSubscribed ? (
                  <Link
                    to="/chat"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:cursor-pointer"
                  >
                    Chat
                  </Link>
                ) : (
                  <Link
                    to="/pricing"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:cursor-pointer"
                  >
                    Pricing
                  </Link>
                )}
              </div>
              <div className="py-6">
                {!user ? (
                  <Link
                    to="/login"
                    className="text-sm font-semibold leading-6 text-black"
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </Link>
                ) : (
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton className="inline-flex w-full justify-center text-black gap-x-1.5 bg-transparent rounded-md py-2 text-sm font-semibold">
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
                              <Link
                                to="/profile"
                                className={classNames(
                                  "block px-4 py-2 text-sm text-right cursor-pointer"
                                )}
                              >
                                Profile
                              </Link>
                            </MenuItem>
                          </div>
                          <div className="py-1">
                            <MenuItem>
                              {({ active }) => (
                                <p
                                  onClick={handleLogout}
                                  className={classNames(
                                    active ? "text-black" : "text-black",
                                    "block px-4 py-2 text-sm text-right cursor-pointer"
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
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
