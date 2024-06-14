import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleForgotPassword = async () => {
      try {
        await sendPasswordResetEmail(auth, email);
        toast.success("Password reset email sent successfully! Check your email.", {
          position: "top-right"
        });
      } catch (error) {
        console.log(error.message);
        toast.error(error.message, {
          position: "top-right"
        });
      }
    };

    return (
      <>
        <div className="flex items-center justify-between">
          <div className="text-sm leading-6">
            <a
              href="#"
              onClick={handleForgotPassword}
              className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              Forgot password?
            </a>
          </div>
        </div>

      </>
    );
}
