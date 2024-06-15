// ForgotPassword.jsx
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import logo from '../assets/images/logos/logo-no-background.svg';
import "../stylesheets/login.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset password link sent!", { position: "top-right" });
      setLoading(false);
    } catch (error) {
      toast.error(error.message, { position: "top-right" });
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="flex h-screen">
      <div className="w-full flex flex-col justify-center items-center bg-white p-8">
        <div className="mb-4">
          <img src={logo} alt="Logo" className="w-40 h-auto" />
        </div>
        <h1 className="text-2xl font-italic mb-6">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={loading}
          >
            {loading ? <div className="loader"></div> : "Send Reset Link"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ForgotPassword;
