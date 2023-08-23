import Lottie from "lottie-react";
import groovyWalkAnimation from "../Lotianimation/animation_ll831f98.json";
import { Link, useNavigate } from 'react-router-dom';
import RiseLoader from "react-spinners/RiseLoader";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase.Config";

const Forgot = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(false);

  const [email, setEmail] = useState("");
  const [emailerror, setEmailError] = useState("");

  const handlemail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  }

  const handelforgot = (e) => {
    e.preventDefault();
    if(email==""){
      setEmailError("Email is required");
    }else{
      setLoading(true);
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
        toast.info('Check email confirm !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setTimeout(() => {
            navigate("/login");  
          }, 2000);
          setLoading(false)
        setEmail("")

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
            if(errorCode==="auth/invalid-sender"){
                toast.error('invalid sender', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
            }else if(errorCode==="auth/invalid-email"){
                toast.error('invalid Email', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            }else if(errorCode==="auth/user-not-found"){
                toast.error('User not found please SignUp', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
            }
          console.log(errorCode);
          console.log(errorMessage);
          setLoading(false)
        });
    }
  }
    return (
      <div className="container mx-auto">
        <ToastContainer />
        <div className="flex justify-around items-center">
            <div>
             <Lottie animationData={groovyWalkAnimation} loop={true} />
            </div>
            <div className="w-[800px]">
              <form className="space-y-6" onSubmit={handelforgot}>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Forgot Password</h5>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input onChange={handlemail} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your email" />
                  <p className="text-red-700">{emailerror}</p>
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {
                      loading ? <RiseLoader color="#36d7b7" />: "Submit"
                    } 
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered? <Link to={'/registation'} className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                </div>
              </form>
            </div>
        </div>
      </div>
        
    );
};

export default Forgot;