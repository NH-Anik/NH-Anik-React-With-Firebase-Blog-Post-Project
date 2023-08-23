import Lottie from "lottie-react";
import groovyWalkAnimation from "../Lotianimation/animation_ll82yjzt.json";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.Config";
import { useNavigate } from "react-router-dom";
import RiseLoader from "react-spinners/RiseLoader";

const Registation = () => {
  const navigate = useNavigate(false);
  const [loading, setLoading] = useState(false);

  const [email, setemail] = useState("");
  const [emailerror, setemailerror] = useState("");

  const handelemail = (e) => {
     setemail(e.target.value);
     setemailerror("");
  }

  const [password, setpassword] = useState("");
  const [passworderror, setpassworderror] = useState("");
 
  const handelpassword = (e) => {
     setpassword(e.target.value);
     setpassworderror("");
  }

const [password2, setpassword2] = useState("");
const [password2error, setpassword2error] = useState("");

const handelrepeatpassword = (e) => {
   setpassword2(e.target.value);
   setpassword2error("");
}

const [name,setname]=useState("");
const [nameerror,setnameerror]=useState("");

const handelname = (e) => {
  console.log(e.target.value);
   setname(e.target.value);
   setnameerror("");
}

const [lastname,setlastname]=useState("");
const [lastnameerror,setlastnameerror]=useState("");

const handellastname = (e) => {
   setlastname(e.target.value);
   setlastnameerror("");
}
const [phone,setphone]=useState("");
const [phoneerror,setphoneerror]=useState("");

const handelphone = (e) => {
   setphone(e.target.value);
   setphoneerror("");
}

const [address,setaddress]=useState("");
const [addresserror,setaddresserror]=useState("");

const handeladdress = (e) => {
   setaddress(e.target.value);
   setaddresserror("");
}

  const handelsubmit = async (e) => {
     e.preventDefault();
     if(email==""){
         setemailerror("Email is required");
     }else if(password==""){
         setpassworderror("Password is required");
     }else if(password2==""){
         setpassword2error("Password is required");
     }else if(password2!=password){
         setpassword2error("Password not match");
     }else if(name==""){
         setnameerror("Name is required");
     }else if(lastname==""){
         setlastnameerror("Lastname is required");
     }else if(phone==""){
         setphoneerror("Phone is required");
     }else if(address==""){
         setaddresserror("Address is required");
     }else{
        try { 
          setLoading(true);
          const {user} = await createUserWithEmailAndPassword(auth,email,password);
          await updateProfile(user,{ displayName:name})
          console.log(user)
          setLoading(false);

          setTimeout(() => {
            navigate("/login")
          }, 1000);
        } catch (error) {
          const errorcode = error.code;
          console.log(errorcode);
          const errorMessage = error.message;
          console.log(errorMessage);
        }
     }
  }
    return (
        <div className="flex justify-around items-center h-[80vh]">
            <div>
                <Lottie animationData={groovyWalkAnimation} loop={true} />
            </div>
            <div className="">
            <form className="space-y-6" onSubmit={handelsubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign-up to our platform</h5>
              <div className="relative z-0 w-full mb-6 group">
                <input onChange={handelemail} type="text" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                <p className="text-red-700">{emailerror}</p>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input onChange={handelpassword} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                <p className="text-red-700">{passworderror}</p>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input onChange={handelrepeatpassword}  type="password" name="repeat_password" id="repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                <label htmlFor="repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                <p className="text-red-700">{password2error}</p>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handelname} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                  <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                  <p className="text-red-700">{nameerror}</p>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handellastname} type="text" name="last_name" id="last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                  <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                  <p className="text-red-700">{lastnameerror}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handelphone} type="tel"  name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                  <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                  <p className="text-red-700">{phoneerror}</p>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handeladdress} type="text" name="Address" id="Address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                  <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                  <p className="text-red-700">{addresserror}</p>
                </div>
              </div>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {
                  loading? <RiseLoader color="#36d7b7" />:"Sign-up"
                }
                
              </button>
            </form>
            </div>
        </div>
    );
};

export default Registation;
