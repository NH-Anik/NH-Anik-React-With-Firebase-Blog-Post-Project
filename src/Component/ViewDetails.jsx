import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.Config";
import { useParams } from "react-router-dom";
const ViewDetails = () => {
    const [blog, setBlog] = useState("");
    const{id}=useParams();
    useEffect(() => {
        const getData = doc(db, "blogs", id)
        getDoc(getData)
            .then((blogDetails) => {
                if(blogDetails.exists()){
                    setBlog(blogDetails.data());
                }
                else{
                    console.log("No such document!");
                }
            })  
            .catch((error) => {
                console.log("Error getting document:", error);
            })
    }, [id]);
    // console.log(blog);
    // console.log(blog.author);
    return (
        <div className="container mx-auto mt-20 ">
            <h1 className="text-center text-2xl mt-20 mb-10">Blog Details</h1>
            <div className="bg-gray-50 dark:bg-gray-800  p-20">
              <h2 className="text-center text-2xl py-4">{blog?.title}</h2>
              <img src={blog?.image} alt="" />
              <div className="flex justify-between">
                <h3 className="text-center text-2xl ">{blog?.author}</h3>
              </div>
              <h3 className=" text-xl py-4">{blog?.category}</h3>
              <h4 className="border border-gray-200 dark:border-gray-700 py-2 px-2">{blog?.description}</h4>
            </div>
        </div>
    );
};

export default ViewDetails;