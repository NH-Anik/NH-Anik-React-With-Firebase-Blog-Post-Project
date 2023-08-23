import Lottie from "lottie-react";
import groovyWalkAnimation from "../Lotianimation/animation_ll80h82t.json";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import RiseLoader from "react-spinners/RiseLoader";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.Config";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailerror, setEmailError] = useState("");

  const handelemail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  }

  const [password, setPassword] = useState("");
  const [passworderror, setPasswordError] = useState("");

  const handelpassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  }
 
  const [chackbox, setcheckbox] = useState(false);
  const [chackboxerror, setcheckboxerror] = useState("");

  const handelcheckbox = (e) => {
    setcheckbox(e.target.checked);
    setcheckboxerror("");
  }

  const navigate = useNavigate(false);

  const [loading, setLoading] = useState(false);
  
  const handelsubmit = (e) => {
    e.preventDefault();
    
    if(email==""){
      setEmailError("Email is required");
    }else if(password==""){
      setPasswordError("Password is required");
    }else if(chackbox==false){
      setcheckboxerror("Please check the checkbox");
    }else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          toast.success('Logged in successfully', {
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
            navigate("/");  
          }, 2000);
       
          const user = userCredential.user;
          console.log(user)
          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if(errorCode === 'auth/wrong-password'){
            setPasswordError("Password is incorrect");
          }
          else if(errorCode === 'auth/invalid-email'){
            setEmailError("Email is incorrect");
          }
          else if(errorCode === 'auth/user-not-found'){
            setEmailError("Email is incorrect");
          }
          // console.log(errorCode)
          // console.log(errorMessage)
          setLoading(false);
      });
    }
  }
 
  return (
    <div className="container mx-auto mt-20">
      <ToastContainer />
        <div className="flex justify-around flex-wrap">
            <div>
                  <Lottie animationData={groovyWalkAnimation} loop={true} />
            </div>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" action="#" onSubmit={handelsubmit}>
                  <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input onChange={handelemail} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your email" />
                  <p className="text-red-700">{emailerror}</p>
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input onChange={handelpassword} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                  <p className="text-red-700">{passworderror}</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input onChange={handelcheckbox} id="remember" type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                      </div>
                      <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>
                    <Link to={'/forgot'} className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot Password?</Link>
                  </div>
                  <p className="text-red-700">{chackboxerror}</p>
                  <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {
                      loading ?<RiseLoader color="#36d7b7" /> : "Sign in"
                    } 
                  </button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered? <Link to={'/registation'} href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                  </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Login;