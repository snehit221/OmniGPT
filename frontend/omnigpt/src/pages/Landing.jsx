import { useEffect, useState } from 'react'
import backgroundImage from '../assets/images/landing-background.png'
import logoWhite from '../assets/images/logos/logo-no-background.svg'
import gemini from '../assets/images/gemini.png'
import { useNavigate } from 'react-router-dom'
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/react/20/solid'
import llama from '../assets/images/meta.png';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
 
const testimonial = {
  name: 'Jessica Brown',
  role: 'Software Developer',
  content: "OmniGPT has revolutionized my development workflow. Being able to compare responses from multiple GPT models in real-time means I get the best coding solutions quickly and efficiently. The platform's seamless integration into my projects has significantly boosted my productivity and the quality of my code."
}
const features = [
  {
    name: 'Multi-GPT Access',
    description: 'Access responses from multiple GPT models for a single prompt, ensuring diverse perspectives and comprehensive insights.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Response Comparison',
    description: 'Compare and choose the best response from different GPT models based on performance and relevance to your needs.',
    icon: LockClosedIcon,
  },
  {
    name: 'Affordable Subscription Plans',
    description: 'Enjoy cost-effective subscription plans that make multi-GPT access affordable for individuals and small businesses.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Exclusive Partnerships',
    description: 'Benefit from exclusive partnerships with diverse GPT model providers, offering a unique and extensive range of model responses.',
    icon: FingerPrintIcon,
  },
  {
    name: 'Developer-Friendly Features',
    description: 'Tools and integrations designed for developers to enhance productivity and streamline coding tasks with the help of multiple GPT responses.',
    icon: Cog6ToothIcon,
  },
  {
    name: 'Comprehensive Support',
    description: 'Access to dedicated customer support to resolve issues promptly and ensure a smooth user experience.',
    icon: ServerIcon,
  },
]
 
const footerNavigation = {
  solutions: [
    { name: 'Marketing', href: '/marketing' },
    { name: 'Analytics', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'Pricing', href: '/pricing' },
    { name: 'Documentation', href: '#' },
    { name: 'Faq', href: '/faq' },
    { name: 'API Status', href: '#' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact Us', href: '/contactus' },
    { name: 'Jobs', href: '/joinourteam' },
    { name: 'Press', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  legal: [
    { name: 'Claim', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '/terms' },
  ],
}
 
export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user,setUser] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(()=>{
    if(token){
      console.log("username in localstorage: ", localStorage.getItem("username"))
      console.log("user: ", localStorage.getItem("user")) 
      setUser(localStorage.getItem("username")) // setting username
      console.log("this is the username set", setUser)
    }
    // console.log("Token", token)
    // console.log("User",user)
      },[])
 
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/");
  };
  const handleGetStarted = () => {
    if(localStorage.getItem("user")==null){
      navigate("/register")
    }else{
      navigate("/pricing")
    }
  }
  return (
    <div className="bg-white">
      <Navbar />
      <main>
        {/* Hero section */}
        <div className="relative min-h-screen isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20">
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl mt-12 py-20">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  OmniGPT
                </h1>
                <h3 className="text-xl mt-2 tracking-tight text-white">
                  Uniting Every Perspective, Amplifying Every Insight
                </h3>
                <p className="mt-6 text-md leading-8 text-gray-300">
                    Welcome to OmniGPT, your one-stop platform for accessing multiple GPT models in a single app. Whether you're crafting content, developing code, or conducting research, OmniGPT empowers you to compare and select the best responses for your needs. Enjoy the flexibility, enhance your work's quality, and save on costs with our affordable subscription plans. Discover the power of multiple GPTs at your fingertips. Sign up today!
                </p>
                
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    onClick={handleGetStarted}
                    className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 hover:cursor-pointer"
                  >
                    Get started
                  </a>
                </div>
              </div>
            </div>
 
            {/* Logo cloud */}
            <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 sm:max-w-xl">
              <img
                className="col-span-2 max-h-24 w-full object-contain lg:col-span-1"
                src={gemini}
                alt="Gemini"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src={llama}
                alt="Reform"
                width={158}
                height={48}
              />
              
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>
 
        {/* Feature section */}
        <div id='#features' className="mt-32 sm:mt-56">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Everything you need</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Need response from multiple GPTs?</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              Sign up today and experience the power of multiple GPTs at your fingertips!
              </p>
            </div>
          </div>
          
          <div className="mx-auto mt-8 max-w-7xl px-6 lg:px-8">
            <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                    {feature.name}
                  </dt>{' '}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
 
        {/* Testimonial section */}
        <div className="relative z-10 mt-32 bg-gray-900 pb-20 sm:mt-56 sm:pb-24 xl:pb-0">
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute left-[calc(50%-19rem)] top-[calc(50%-36rem)] transform-gpu blur-3xl">
              <div
                className="aspect-[1097/1023] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
          </div>
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
            <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
              <div className="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
                <img
                  className="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                  alt=""
                />
              </div>
            </div>
            <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
              <figure className="relative isolate pt-6 sm:pt-12">
                <svg
                  viewBox="0 0 162 128"
                  fill="none"
                  aria-hidden="true"
                  className="absolute left-0 top-0 -z-10 h-32 stroke-white/20"
                >
                  <path
                    id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
                    d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                  />
                  <use href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" x={86} />
                </svg>
                <blockquote className="text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
                  <p>
                    {testimonial.content }
                  </p>
                </blockquote>
                <figcaption className="mt-8 text-base">
                  <div className="font-semibold text-white">{ testimonial.name }</div>
                  <div className="mt-1 text-gray-400">{ testimonial.role }</div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </main>
 
      {/* Footer */}
      <Footer />
    </div>
  )
}
 