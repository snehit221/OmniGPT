// Marketing.js
import React from 'react';
import heroImage from '../assets/images/gpt-bg.jpg'; // Replace with your hero image
import customerImage from '../assets/images/default-profile-image.png'; // Replace with your testimonial image
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const testimonials = [
  {
    name: 'Chris Brown',
    role: 'Software Architect at XYZ Inc.',
    content: "Using OmniGPT has been a game-changer for our team. The ability to access diverse perspectives from multiple GPT models in one place has streamlined our brainstorming sessions and coding tasks. The platform's intuitive design and real-time comparisons have saved us countless hours, allowing us to focus on innovation and delivery. OmniGPT is an invaluable tool for any development team looking to enhance their workflow and achieve better results.",
  },
  {
    name: 'John Snow',
    role: 'Content Writer at Columbia Media Inc.',
    content: "Using OmniGPT for content creation has been a game changer. The ability to access multiple GPT models allows me to find the perfect tone and style for every piece I write. It's a must-have tool for any writer.",
  },
  {
    name: 'Steven Jobs',
    role: 'Head of Data Analytics at CIBC Bank',
    content: "OmniGPT has transformed the way we handle data analysis. This tool has increased our developers productivity. \n Researching new topics with this tool as a companion is the new normal!",
  }
];

export default function Marketing() {
    return (
      <div className="bg-white">
        <Navbar />
        {/* Hero Section */}
        <section className="relative bg-gray-900 text-white py-20">
          <div className="container mx-auto mt-16 px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Unlock Your Potential with OmniGPT</h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Discover the power of multiple GPT models at your fingertips. Enhance your productivity, creativity, and efficiency with OmniGPT.
              </p>
              <a
                href="/register"
                className="mt-10 rounded-md bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
              >
                Sign Up Today
              </a>
            </div>
            <div className="mt-10 flex justify-center">
              <img src={heroImage} alt="Hero" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </section>
      
        {/* Use Cases */}
        <section id="use-cases" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900">Use Cases</h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900">Developers</h3>
                <p className="mt-4 text-gray-700">Streamline coding workflows with real-time suggestions, automated code reviews, and seamless integration with your favorite IDEs.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900">Marketers</h3>
                <p className="mt-4 text-gray-700">Generate compelling content, optimize SEO strategies, and analyze market trends with the power of AI-driven insights.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900">Researchers</h3>
                <p className="mt-4 text-gray-700">Accelerate research processes with AI-assisted data analysis, automated literature reviews, and enhanced collaboration tools.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900">Customer Support</h3>
                <p className="mt-4 text-gray-700">Enhance customer satisfaction with AI-driven chatbots, automated ticket resolution, and personalized support recommendations.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900">Healthcare</h3>
                <p className="mt-4 text-gray-700">Improve patient outcomes with predictive analytics, automated diagnostics, and personalized treatment plans powered by AI.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900">Educators</h3>
              <p className="mt-4 text-gray-700">Enhance learning experiences with AI-driven educational content, automated grading, and personalized tutoring solutions.</p>
            </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900">What Our Customers Say</h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-800">"{testimonial.content}"</p>
                  <div className="mt-4 flex items-center">
                    <img
                      src={customerImage}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <p className="text-gray-900 font-semibold">{testimonial.name}</p>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Call to Action Section */}
        <section className="py-20 bg-[#111827] text-white text-center">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="mt-6 text-lg">
              Join OmniGPT today and experience the future of AI-assisted work. Sign up now and take advantage of our affordable subscription plans.
            </p>
            <a
              href="/register"
              className="mt-10 inline-block rounded-md bg-white px-5 py-3 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-gray-200"
            >
              Sign Up
            </a>
          </div>
        </section>

        <Footer />
      </div>
    );
  }