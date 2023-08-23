import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.Config";
import Allblog from "../Component/Allblog";

import RiseLoader from "react-spinners/RiseLoader";
const Home = ({user}) => {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData =onSnapshot(collection(db,"blogs"), (snapshot) => {
      let data=[];
        snapshot.docs.forEach((doc) => {
           data.push({...doc.data(),id: doc.id})
        });
        setBlogs(data);
        setLoading(false);
      })
      return ()=> getData(); // cleanup function
  }, []);

  const handelDelete = (id) => {
    deleteDoc(doc(db, "blogs", id))
    .than(()=>{
      console.log("deleted successfully");
    })
    .catch((error) => {
      console.log(error);
    })
  }
    return (
      <div className="container mx-auto mt-20 justify-center items-center">
       <h1 className="text-center text-2xl mt-20 mb-10">This page is All Blog </h1>
       {
        loading ? 
        <div className="flex justify-center items-center">
          <RiseLoader /> 
        </div> 
        : 
        <Allblog blogs={blogs} handelDelete={handelDelete} user={user}/> 
       }
      </div>
    );
};

export default Home;