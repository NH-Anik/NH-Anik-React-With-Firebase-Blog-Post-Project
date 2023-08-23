import { useEffect, useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase.Config";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

  const initialvalue={
      title:"",
      description:"",
      category:""
  } 
  const categorize=[ 
      "Technology",
      "Sports",
      "Education",
      "Entertainment",
      "Health",
  ]
       
const Blog = ({user}) => {
    const {id} = useParams();

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(null);
    const [forminput, setforminput] = useState(initialvalue)
    const { title, description,category } = forminput;
    const [file, setfile] = useState(null);

    const handelinput = (e) => {
        setforminput({...forminput,[e.target.name]:e.target.value})
        setinputerror("");
    }
    const handelinputfile = (e) => {
        setfile(e.target.files[0]);
        setfileerror("");
    }
    const handelcategorize = (e)=>{
        setforminput({...forminput,category:e.target.value})
    } 

  useEffect(() => { 
        
    const fileUpload = () => {
       
      const storageRef = ref(storage,file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);
      
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          // Handle unsuccessful uploads
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setforminput(
            (prev) => ({
              ...prev,
              image: downloadURL
            })
            );
          });
        }
      ); 
    }
    file && fileUpload();
  }, [file]);

  const[inputerror, setinputerror] = useState("");
  const [fileerror, setfileerror] = useState("");

  const handelsubmit = async (e) => {
    e.preventDefault();  
    if(id){
      if(!title){
        setinputerror("Please fill all the fields");
      }else if(!description){
        setinputerror("Please fill all the fields");
      }else if(!category){
        setinputerror("Please fill all the fields");
      } else if(file==null){
          setfileerror("Please select a file");
      }else if(!user || !user.uid){
        alert("Please login first");
      }else{
        setLoading(true);
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...forminput,
            time:serverTimestamp(),
            author:user?.displayName,
            authorId:user?.uid  
          })
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    }else{
      if(!title){
        setinputerror("Please fill all the fields");
      }else if(!description){
        setinputerror("Please fill all the fields");
      }else if(!category){
        setinputerror("Please fill all the fields");
      } else if(file==null){
          setfileerror("Please select a file");
      }else if(!user || !user.uid){
        alert("Please login first");
      }else{
        setLoading(true);
        try {
          await addDoc(collection(db, "blogs"), {
            ...forminput,
            time:serverTimestamp(),
            author:user?.displayName,
            authorId:user?.uid  
          })
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    }
    
  }
  // update date work start 
  useEffect(() => {
    const handelUpdate=async()=>{
      const docUpdate = doc(db, "blogs", id)
      const data = await getDoc(docUpdate)
      if(data.exists()){
        setforminput({...data.data()})
      }else {
        console.log("No such document!");
      }
    }
    handelUpdate();
  }, [id]);
  // update date work end 
     
    return (
      <div className="container mx-auto mt-20 flex justify-center"> 
          <div className="w-2/4">
              <form action=""  onSubmit={handelsubmit }>
                <h1 className="text-center text-2xl">{id?"Edit Blog":"Add Blog"}</h1>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Your name</label>
                    <input onChange={handelinput} name="title" value={title} type="text" id="success" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="Title of the blog" />
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{inputerror}</p>
                  </div>        
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                    <select  onChange={handelcategorize} id="countries" value={category} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option selected>Choose a country</option>
                      {categorize.map((item,index)=>{
                          return <option key={index}>{item}</option>
                      })}
                    </select>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{inputerror}</p>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                    <textarea onChange={handelinput} name="description" value={description} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." defaultValue={""} />
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{inputerror}</p>
                  </div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
                  <input onChange={handelinputfile}className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />   
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">{fileerror}</p>
                  <h3>{progress}</h3>
                  <button type="submit" className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 mt-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">
                      {
                          loading? <RiseLoader color="#36d7b7" />: <span>{id?"update":"Submit"}</span>
                      }
                  </button>
              </form>
          </div>
      </div>
    );
};

export default Blog;