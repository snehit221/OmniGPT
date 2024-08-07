import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../config/firebase";

const Success = () => {
    const navigate = useNavigate();
    const [sessionId, setSessionId] = useState('');
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        const storedSessionId = localStorage.getItem('sessionId');
        setSessionId(storedSessionId);
        setTimeout(() => {
          setFadeIn(true);
        }, 100);
      }, []);

      const handlePaymentSuccess = () => {
        console.log("Payment success", sessionId);
        const token = localStorage.getItem('token');
        // console.log('Token ------- ', token);
        fetch(`https://subscriptionstripe.onrender.com/payment-success`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ sessionId: sessionId, userId: auth.currentUser.uid }),
        })
          .then((res) => {
            if (res.ok) return res.json();
            return res.json().then((json) => Promise.reject(json));
          })
          .then((data) => {
            console.log('data.message:: ', data.message);
            navigate('/');
          })
          .catch((e) => {
            console.log('error is ', e);
          });
      };

  return (
    <div className="bg-gray-900 min-h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Payment Successful!
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-lg leading-8 text-gray-300">
          Thank you for your purchase! Your subscription is now active.
        </p>
        
        <button
        onClick={handlePaymentSuccess}

          className="mt-8 bg-indigo-500 text-white rounded-md px-4 py-2"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Success;
