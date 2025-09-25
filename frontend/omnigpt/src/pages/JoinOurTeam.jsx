import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';

const JoinOurTeam = () => {
  return (
    <>
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center py-24">
      <Navbar />
      <div className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Join Our Team</h1>
            <p className="mt-4 text-lg text-gray-400">We are looking for passionate individuals to join us at OmniGPT. If you are excited about working with cutting-edge AI technology and making a significant impact, we would love to hear from you!</p>
          </div>
          <div className="mt-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Current Job Openings</h2>
            <div className="mt-6 space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-white">Full-Stack Developer</h3>
                <p className="mt-2 text-lg text-gray-400">We are looking for a Full-Stack Developer to help us build and enhance our platform. Experience with React, Node.js, and Firebase is a plus.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-white">AI Researcher</h3>
                <p className="mt-2 text-lg text-gray-400">Join our team as an AI Researcher to explore new frontiers in artificial intelligence and machine learning. Experience with GPT models and natural language processing is preferred.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-white">Customer Support Specialist</h3>
                <p className="mt-2 text-lg text-gray-400">We need a Customer Support Specialist to help our users get the most out of OmniGPT. Strong communication skills and a customer-first attitude are essential.</p>
              </div>
            </div>
            <p className="mt-10 text-lg text-gray-400">
              If interested, reach out to us with your resume at <a href="mailto:support@omnigpt.com" className="text-blue-500 hover:underline">support@omnigpt.com</a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    <Footer />
    </>
  );
};

export default JoinOurTeam;
