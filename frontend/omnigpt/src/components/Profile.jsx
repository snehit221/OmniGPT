import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../config/firebase';
import { onAuthStateChanged, updatePassword } from 'firebase/auth';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import defaultProfileImage from '../assets/images/default-profile-image.png'; // Update with your default image path
import logoWhite from '../assets/images/logos/logo-no-background.svg'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar'

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(defaultProfileImage); // Default to your default image
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const docSnapshot = await getDoc(userRef);
        if (docSnapshot.exists()) {
          setUser(docSnapshot.data());
          const imageRef = ref(storage, `profileImages/${currentUser.uid}`);
          try {
            const url = await getDownloadURL(imageRef);
            setProfileImageUrl(url);
          } catch (error) {
            console.log('No profile image found, using default.');
          }
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('No user is signed in.');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setProfileImageUrl(url);
      await setDoc(doc(db, 'users', auth.currentUser.uid), { profileImageUrl: url }, { merge: true });
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  const handlePasswordUpdate = async () => {
    
    if (!newPassword || !confirmPassword) {
      setError("Please enter both new password and confirm password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      if (user) {
        await updatePassword(auth.currentUser, newPassword);
        //setSuccessMessage('Password updated successfully!');
        toast.success('Password updated successfully!');
        
        // Navigate to landing page after a delay to allow the toast to show
        setTimeout(() => {
          navigate('/');
        }, 2000);  // Adjust the delay as needed
      } else {
        setError('No user is logged in.');
      }
    } catch (error) {
     //setError(`Failed to update password: ${error.message}`);
      toast.error(`Failed to update password: ${error.message}`);
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center py-24">
      <Navbar />
      {/* Full-page grey background */}
      <div className="py-8 sm:py-12">  {/* Reduced padding */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Profile Details</h1>
          </div>
          {user ? (
            <div className="mt-10 text-center">
              <div className="relative inline-block">
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="mx-auto h-40 w-40 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-40 w-40 rounded-full bg-gray-500 mx-auto"></div> // Placeholder for default image
                )}
                <label
                  htmlFor="imageUpload"
                  className="absolute bottom-0 right-0 bg-indigo-500 rounded-full p-2 cursor-pointer flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21a1 1 0 01-2 0V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2z"
                    />
                  </svg>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <p className="text-lg leading-8 text-white mt-6">Name: {user.name}</p>
              <p className="text-lg leading-8 text-white mt-2">Email: {user.email}</p>
              <div className="mt-6">
                <input
                  type="password"
                  placeholder="New Password"
                  className="bg-gray-800 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-700 focus:border-blue-500"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="bg-gray-800 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-700 focus:border-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handlePasswordUpdate}
              >
                Update Password
              </button>
            </div>
          ) : (
            <div className="text-lg leading-8 text-white mt-6 text-center">No user data found.</div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
  };
  
  export default Profile;
  