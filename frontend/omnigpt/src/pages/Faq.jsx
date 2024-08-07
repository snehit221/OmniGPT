import React, { useState } from 'react';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
 
const FAQContainer = styled.div`
  padding: 2rem;
  width: 800px;
  margin: auto;
`;
 
const FAQItem = styled.div`
  margin-bottom: 1rem;
  background-color: #2d3748;
  border-radius: 0.5rem;
  overflow: hidden;
`;
 
const Question = styled.div`
  background-color: #4a5568;
  padding: 1rem;
  font-weight: bold;
  cursor: pointer;
  border-bottom: 1px solid #2d3748;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: #2d3748;
  }
`;
 
const Answer = styled.div`
  padding: 1rem;
  background-color: #2d3748;
  color: #a0aec0;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

 
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
 
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
 
  const faqData = [
    {
        question: "How can I benefit from exclusive partnerships?",
        answer: "OmniGPT has exclusive partnerships with diverse GPT model providers, offering a unique and extensive range of model responses. This ensures you have access to the best and most varied responses available."
      },
      {
        question: "What kind of support does OmniGPT provide?",
        answer: "OmniGPT offers comprehensive support with access to dedicated customer support to resolve issues promptly and ensure a smooth user experience."
      },
      {
        question: "How do I sign up for OmniGPT?",
        answer: "To sign up for OmniGPT, visit our sign-up page, fill in your details, and choose the subscription plan that best fits your needs. Start experiencing the power of multiple GPTs at your fingertips today!"
      },
      {
        question: "What subscription plans are available?",
        answer: "OmniGPT offers cost-effective subscription plans that make multi-GPT access affordable for individuals and small businesses. Check our pricing page for detailed information on each plan."
      },
 
  ];
 
  return (
    <>
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center py-24">
<Navbar/>
      <div className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Frequently Asked Questions</h1>
          </div>
          <FAQContainer>
            {faqData.map((faq, index) => (
              <FAQItem key={index}>
                <Question onClick={() => toggleFAQ(index)}>
                  {faq.question}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 text-white transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </Question>
                <Answer isOpen={openIndex === index}>
                  {faq.answer}
                </Answer>
              </FAQItem>
            ))}
          </FAQContainer>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};
 
export default FAQ;
 