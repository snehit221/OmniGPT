import { CheckIcon } from "@heroicons/react/20/solid";
import logoWhite from "../assets/images/logos/logo-no-background.svg";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {return classes.filter(Boolean).join(' ')}

const navigation = [
  { name: "Home", route: "/" },
  { name: "Register", route: "/register" },
  { name: "Pricing", route: "/pricing" },
];



const tiers = [
  {
    name: "Monthly",

    id: "tier-monthly",

    href: "#",

    price: "$50",


    features: ["Single Device", "upto 500 Messages", "Share Chat"],
  },

  {
    name: "Bi-Yearly",

    id: "tier-bi-yearly",

    href: "#",

    price: "$270",

    features: [
      "Multiple Devices upto 2",
      "Upto 5000 Messages",
      "Share Chat",
      "Speed up delivery",
      "Image and Document Upload",
    ],
  },

  {
    name: "Yearly",

    id: "tier-yearly",

    href: "#",

    price: "$500",


    features: [
      "Multiple Devices upt 4",
      "Unlimited Messages",
      "Share Chat",
      "Early Access to new features",
      "Get fastest delivery",
      "Image and Document Upload",
      "Speach to Text",
    ],
  },
];

export default function Pricing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user,setUser] = useState(null)
  const token = localStorage.getItem("token")

  useEffect(()=>{
    if(token){
      setUser(localStorage.getItem("user"))
    }
  },[])

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">OmniGPT</span>
              <img className="h-8 w-auto" src={logoWhite} alt="" />
            </Link>
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
            {!user ? 
            <Link to="/login" className="text-sm font-semibold leading-6 text-white">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
            : 
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
                                focus 
                                  ? "  text-black"
                                  : "text-black",
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
          }
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
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
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
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </p>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* <div className="text-base font-semibold leading-7 text-indigo-400">
            Pricing
          </div> */}

          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Pricing plans for teams of&nbsp;all&nbsp;sizes
          </p>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          Choose an affordable plan that’s packed with the best features for
          engaging your audience, creating customer loyalty, and driving sales.
        </p>

        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="bg-white/5 ring-2 ring-indigo-500 placeholder rounded-3xl p-8 xl:p-10"
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={tier.id}
                  className="text-lg font-semibold leading-8 text-white"
                >
                  {tier.name}
                </h3>
              </div>

              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-white">
                  {tier.price}
                </span>

                {/* <span className="text-sm font-semibold leading-6 text-gray-300">
                  {frequency.priceSuffix}
                </span> */}
              </p>

              <a
                href={tier.href}
                aria-describedby={tier.id}
                className="bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500 mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Buy plan
              </a>

              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-white"
                      aria-hidden="true"
                    />

                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
