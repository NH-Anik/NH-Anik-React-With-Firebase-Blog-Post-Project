import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import './App.css'

import Navbar from "./Component/Navbar";
import Home from './Pages/Home';
import Error from './Pages/Error';
import Login from './Logsystem/Login';
import Registation from './Logsystem/Registation';
import About from './Pages/About';
import Services from './Pages/Services';
import Contact from './Pages/Contact';
import Blog from './Pages/Blog';
import Footer from './Component/Footer';
import Forgot from './Logsystem/Forgot';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { auth } from "./firebase.Config";
import ViewDetails from "./Component/ViewDetails";

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  // console.log(user);

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser("");
    }
  })
   return () => {
     unsubscribe();
   };
 }, []);


 const handelsignout = () => {
   signOut(auth)
   .then(()=>{
     console.log("sign out successfully");
     setUser(null);
     navigate("/login")
   })
   .catch((error) => {
     console.log(error);
   })
 }

  return (
    <>
      <Navbar user={user} handelsignout={handelsignout}/>
        <Routes>
          <Route path="/login" element={!user?.uid?<Login/>:<Navigate to="/"/>}/>
          <Route path="/registation" element={!user?.uid?<Registation/>:<Navigate to="/"/>}/>
          <Route path="/details/:id" element={<ViewDetails/>}/>
          <Route path="/forgot" element={<Forgot/>}/>

          <Route path="/" element={<Home user={user}/>}/>
          <Route path="/blog" element={user?.uid?<Blog user={user}/>:<Navigate to="/login"/>}/>
          {/* update post link */}
          <Route path="/update/:id" element={user?.uid?<Blog user={user}/>:<Navigate to="/login"/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      <Footer/>
   </>
  )
}

export default App;
