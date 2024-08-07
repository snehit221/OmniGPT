import { CheckIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, analytics } from "../config/firebase";
import { logEvent } from "firebase/analytics";
import Navbar from "../components/Navbar";
import ReactGA from "react-ga4";
import ReactLoading from "react-loading";
import Footer from "../components/Footer";

const tiers = [
  {
    name: "Monthly",
    id: "tier-monthly",
    href: "#",
    price: "19.99",
    features: ["Single Device", "upto 500 Messages", "Share Chat"],
  },
  {
    name: "Bi-Yearly",
    id: "tier-bi-yearly",
    href: "#",
    price: "99.99",
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
    price: "179.99",
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
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setUser(localStorage.getItem("username")); // setting username
      console.log(auth.currentUser);
      setUser(localStorage.getItem("user"));
    }
    ReactGA.event({
      category: "Pricing",
      action: "User Viewed Pricing Page",
      label: "view",
    });
    logEvent(analytics, "pricing_page_viewed");
  }, []);

  const handleBuyPlan = (plan) => {
    if (!user) {
      navigate("/login");
    } else {
      setLoading(true);
      console.log(
        `User is authenticated. Proceed with purchasing tier: ${plan}`
      );
      fetch(
        `https://subscriptionstripe.onrender.com/create-subscription-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: user, plan: plan }),
        }
      )
        .then((res) => {
          if (res.ok) return res.json();
          console.error("Error creating checkout session:", res.statusText);
        })
        .then(({ session }) => {
          console.log("Session --------------> ", session);
          setLoading(false);
          ReactGA.event({
            category: "Pricing",
            action: "User Purchased Plan",
            label: plan,
          });
          logEvent(analytics, "plan_purchased", { shipping_tier: plan });
          localStorage.setItem("sessionId", session.id);
          window.location = session.url;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
    <div className="bg-gray-900 w-full h-full min-w-screen min-h-screen py-24 sm:py-32">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Pricing plans for teams of&nbsp;all&nbsp;sizes
          </p>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          Choose an affordable plan that’s packed with the best features for
          engaging your audience, creating customer loyalty, and driving sales.
        </p>

        {loading ? (
          <ReactLoading className="mx-auto pt-10" type="spin" color="white" height={100} width={100} />
        ) : (
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

                <button
                  onClick={() => handleBuyPlan(Number(tier.price))}
                  aria-describedby={tier.id}
                  className="bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500 mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Buy plan
                </button>

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
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}
