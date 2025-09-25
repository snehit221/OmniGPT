import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth, db, analytics } from '../config/firebase'
import logo from '../assets/images/logos/logo-no-background.svg';
import LogIN from '../assets/images/gpt-bg.jpg';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../stylesheets/login.css"
import { setDoc, getDoc, doc } from "firebase/firestore";
import { logEvent } from "firebase/analytics";
import ReactGA from "react-ga4";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token")

// Already logged in
  useEffect(()=>{
    if(token){
      console.log(localStorage.getItem("user"))
      navigate("/pricing",{replace:true})
    }
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
   //  user credentials
   try {
    const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
    const user = userCredential.user;
    toast.success("User LogIn Successful!", { position: "top-right" });
    localStorage.setItem("token", await user.getIdToken());
    localStorage.setItem("user", user.email);

    // Fetch the display name from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid)); // Assuming 'users' collection
    if (userDoc.exists()) {
        const userData = userDoc.data();
        const displayName = userData.name || "Default Name"; // Use default if displayName is not set

        localStorage.setItem("username", displayName);
        console.log("Display Name: ", displayName);
    } else {
        console.log("No such document!");
    }

    console.log("User ", user);

    ReactGA.event({
      category: "Login",
      action: "User Logged In",
      label: user.email,
    });

    logEvent(analytics, "login_success");
    setTimeout(() => {
      navigate("/");
    }, 2500);
  } catch (error) {
    toast.error("Invalid Credentials!", { position: "top-right" });
    console.error("Firebase Error:", error);
  } finally {
    setLoading(false);
    setFormData({ email: "", password: "" });
  }
};

  const handleGoogleLogin = async () => {
   // Google Authentication
   const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store or update user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        profileImageUrl: user.photoURL, // Save the profile picture URL
      }, { merge: true });  
        
      toast.success("User LogIn Successful!", { position: "top-right" });
      localStorage.setItem("token", await user.getIdToken());
      localStorage.setItem("user", user.email);
      localStorage.setItem("username", user.displayName);

      ReactGA.event({
        category: "Login",
        action: "User Logged In",
        label: user.email,
      });
      logEvent(analytics, "login_success");
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      toast.error("Google Login Failed!", { position: "top-right" });
      console.error("Firebase Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-1/2 bg-cover bg-right" style={{ backgroundImage: `url(${LogIN})` }}></div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-primarybg p-8">
        <div className="mb-4">
          <img src={logo} alt="Logo" className="w-40 h-auto" />
        </div>
        
        <h1 className="text-2xl  font-italic text-white mb-6">Log In</h1>
        <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 mb-4">{"Don't have an account? Sign Up"}</Link>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-3 py-2 border rounded"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={loading}
          >
            {loading ? <div className="loader"></div> : "Login"}
          </button>
          <div className="relative mt-6">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6 mb-6">
                  <span className=" px-6 text-white bg-primarybg">
                    Or continue with
                  </span>
                </div>
              </div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
            disabled={loading}
          >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                      fill="#34A853"
                    />
                  </svg>
                  <span className="text-sm font-semibold leading-6">
                    Google
                  </span>
            {loading ? <div className="loader"></div> : ""}
          </button>
          <div className="mt-4 flex justify-center">
            <Link to="/send-forgot-password-email" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
