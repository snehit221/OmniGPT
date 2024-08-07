import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
 
const TermsContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: auto;
`;
 
const Section = styled.div`
  margin-bottom: 1.5rem;
  background-color: #2d3748;
  border-radius: 0.5rem;
  overflow: hidden;
  padding: 1rem;
`;
 
const Title = styled.h2`
  background-color: #4a5568;
  padding: 1rem;
  font-weight: bold;
  color: #fff;
  border-bottom: 1px solid #2d3748;
  border-radius: 0.5rem 0.5rem 0 0;
`;
 
const Content = styled.p`
  padding: 1rem;
  background-color: #2d3748;
  color: #a0aec0;
  border-radius: 0 0 0.5rem 0.5rem;
`;
 
const TermsAndConditions = () => {
  const termsData = [
    {
      title: "Introduction",
      content: "Welcome to OmniGPT! These terms and conditions outline the rules and regulations for the use of our platform."
    },
    {
      title: "Intellectual Property Rights",
      content: "Unless otherwise stated, OmniGPT and/or its licensors own the intellectual property rights for all material on OmniGPT. All intellectual property rights are reserved."
    },
    {
      title: "User Responsibilities",
      content: "As a user of OmniGPT, you are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account."
    },
    {
      title: "Prohibited Activities",
      content: "You are prohibited from using OmniGPT for any unlawful purpose or to solicit others to perform or participate in any unlawful acts."
    },
    {
      title: "Limitation of Liability",
      content: "In no event shall OmniGPT, nor its directors, employees, or affiliates, be liable for any indirect, consequential, or punitive damages arising out of your use of the platform."
    },
    {
      title: "Changes to Terms",
      content: "OmniGPT reserves the right to amend these terms and conditions at any time. By continuing to use the platform, you agree to be bound by the revised terms."
    }
  ];
 
  return (
    <>
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center py-24">
      <Navbar/>
      <div className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Terms and Conditions</h1>
          </div>
          <TermsContainer>
            {termsData.map((term, index) => (
              <Section key={index}>
                <Title>{term.title}</Title>
                <Content>{term.content}</Content>
              </Section>
            ))}
          </TermsContainer>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};
 
export default TermsAndConditions;