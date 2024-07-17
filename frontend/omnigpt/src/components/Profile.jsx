import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid); // Correct usage
        const docSnapshot = await getDoc(userRef);
        if (docSnapshot.exists()) {
          setUser(docSnapshot.data());
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('No user is signed in.');
      }
      setLoading(false); // Set loading to false after fetching data
    });

    // Cleanup the observer on component unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>; // Show a loading indicator while fetching data
  }

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Profile Page
          </p>
        </div>

        {user ? (
            <div className="mt-10 bg-white/5 ring-2 ring-indigo-500 rounded-3xl p-8 xl:p-10">
            {user.profileImage && (
              <img
                src={user.profileImage}
                alt="Profile"
                className="mx-auto mb-6 h-32 w-32 rounded-full object-cover"
              />
            )}
            <p className="text-lg font-semibold leading-8 text-white">Name: {user.name}</p>
            <p className="text-lg font-semibold leading-8 text-white">Email: {user.email}</p>
            {/* Add more fields as needed */}
          </div>
        ) : (
          <div className="mt-6 text-lg leading-8 text-gray-300 text-center">
            No user data found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
