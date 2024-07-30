import React from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {
  AcademicCapIcon,
  CheckCircleIcon,
  HandRaisedIcon,
  RocketLaunchIcon,
  SparklesIcon,
  SunIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid'
import Navbar from '../components/Navbar'

const values = [
    {
      name: 'Strive for Excellence',
      description: 'Pursue world-class standards in everything you do, aiming for continuous improvement and superior results.',
      icon: RocketLaunchIcon,
    },
    {
      name: 'Own Your Actions',
      description: 'Take responsibility for your actions and decisions, demonstrating accountability and integrity at all times.',
      icon: HandRaisedIcon,
    },
    {
      name: 'Foster Supportive Relationships',
      description: 'Build and maintain strong, supportive relationships with colleagues, clients, and the community.',
      icon: UserGroupIcon,
    },
    {
      name: 'Commit to Continuous Learning',
      description: 'Embrace a growth mindset, continually seeking new knowledge and skills to stay ahead in your field.',
      icon: AcademicCapIcon,
    },
    {
      name: 'Share Your Knowledge',
      description: 'Actively share your expertise and insights with others to contribute to collective success and growth.',
      icon: SparklesIcon,
    },
    {
      name: 'Balance Work and Play',
      description: 'Value downtime and relaxation to recharge and maintain a healthy, productive work-life balance.',
      icon: SunIcon,
    },
  ];
  
  const team = [
    {
      name: 'Aniket Mhatre',
      role: 'Co-Founder / Cloud Architect',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/webt3-8766f.appspot.com/o/OmniGPT%2FAniket.jpg?alt=media&token=d4b53299-9a17-4414-ad8e-9e5b20312333',
      location: 'Halifax, NS, Canada',
    },
    {
        name: 'Heramb Kulkarni',
        role: 'Co-Founder / Data Engineer',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/webt3-8766f.appspot.com/o/OmniGPT%2FHeramb.jpg?alt=media&token=b9756313-3ffd-4c9e-b7e3-c9b112d462d4',
        location: 'Vancouver, BC, Canada',
    },
      {
        name: 'Parth Karkhanis',
        role: 'Co-Founder / Data Engineer',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/webt3-8766f.appspot.com/o/OmniGPT%2FParth.jpg?alt=media&token=a1b8391e-2b95-4fba-ae66-c294ac4f9e6a',
        location: 'Halifax, NS, Canada',
    },
      {
        name: 'Shubham Pawar',
        role: 'Co-Founder / Software Developer',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/webt3-8766f.appspot.com/o/OmniGPT%2FShubham.jpg?alt=media&token=7bc369aa-d610-4e9d-900c-955dd53e35de',
        location: 'Halifax, NS, Canada',
    },
      {
        name: 'Ashish Nagpal',
        role: 'Co-Founder / DevOps Engineer',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/webt3-8766f.appspot.com/o/OmniGPT%2FAshish.jpg?alt=media&token=c24bbf6a-3ebf-4469-b721-e3cdb5012c9f',
        location: 'Toronto, Canada',
      },
      {
        name: 'Shreya Kapoor',
        role: 'Co-Founder / Developer',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/webt3-8766f.appspot.com/o/OmniGPT%2FShreya.jpg?alt=media&token=a5f0375c-1907-4b98-97e0-c8801cd8e595',
        location: 'Toronto, Canada',
      },
      {
        name: 'Snehit Roda',
        role: 'Co-Founder / Data Engineer',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/webt3-8766f.appspot.com/o/OmniGPT%2Fimage.jpg?alt=media&token=814ce12d-b3d6-4356-a622-3fb7fa0faff6',
        location: 'Halifax, NS, Canada',
        },
    // More people...
  ]

function About() {


  return (
    <div className="bg-gray-900 py-24 sm:py-32">
        <Navbar />

        <main className="relative isolate">
        {/* Background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
            className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
          />
        </div>

        {/* Header section */}
        <div className="px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl pt-24 text-center sm:pt-40">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">We are the future</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
                OmniGPT is your gateway to multiple large language models. Get diverse perspectives on your prompts and choose the best response tailored to your needs.
            </p>
          </div>
        </div>

        {/* Content section */}
        <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 lg:max-w-none lg:grid-cols-2">
              <div>
                <p>
                    At OmniGPT, we believe in the power of choice and the richness of diverse AI responses. Our platform integrates APIs from multiple LLMs, providing users with a variety of answers for any given prompt.
                </p>
                <p className="mt-8">
                    Users can compare responses from different LLMs in a single chat window, enabling them to select the most suitable answer. This unique feature allows users to benefit from the strengths of various AI models.
                </p>
              </div>
              <div>
                <p>
                    Our subscription models offer access to premium LLMs, ensuring that users have the best tools at their disposal. We also provide discounts for users who purchase access to multiple premium LLMs.
                </p>
                <p className="mt-8">
                    By sending feedback on preferred responses, users contribute to the continuous improvement of LLMs. This feedback is shared with LLM companies to help them refine and enhance their models.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image section */}
        <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2894&q=80"
            className="aspect-[9/4] w-full object-cover xl:rounded-3xl"
          />
        </div>

        {/* Values section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our values</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
                Our values guide us in delivering the best experience for our users and partners.
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
            {values.map((value) => (
              <div key={value.name} className="relative pl-9">
                <dt className="inline font-semibold text-white">
                  <value.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-indigo-500" />
                  {value.name}
                </dt>{' '}
                <dd className="inline">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Team section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our team</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
                Meet the people behind OmniGPT.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
          >
            {team.map((person) => (
              <li key={person.name}>
                <img alt="" src={person.imageUrl} className="aspect-[14/13] w-full rounded-2xl object-cover" />
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">{person.name}</h3>
                <p className="text-base leading-7 text-gray-300">{person.role}</p>
                <p className="text-sm leading-6 text-gray-500">{person.location}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>

    </div>
  )
}

export default About