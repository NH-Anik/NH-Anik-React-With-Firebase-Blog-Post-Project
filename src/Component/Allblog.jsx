import { Link } from "react-router-dom";
import { makeShortText } from "../Helper";

const Allblog = ({blogs,handelDelete,user}) => {


  return (
    <div className="container mx-auto mt-20">
      
      <div className="flex justify-center gap-5">
        {
          blogs.map((blog,i)=>(
            <div key={i}  className="p-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.author}</h5>
                <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.time.toDate().toDateString()}</p>
              </div>
              <img className="rounded-t-lg w-full" src={blog.image} alt />
              <div className="">
                  <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h6>
                  <h6 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.category}</h6>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{makeShortText(blog.description, 200)}</p>
                  <Link to={`/details/${blog.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    View details
                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </Link>
                  {/* edit button or delete  button */}

                    {
                      user?.uid===blog?.authorId?
                        <div className="flex justify-between mt-5">
                          <Link to={`/update/${blog.id}`}  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Blog Edit / Upload 
                          </Link>
                          <button onClick={() => handelDelete(blog.id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Delete Post 
                          </button>
                        </div>
                      :
                      ""
                    }

                  
              </div>
            </div>                 
          ))  
        }
      </div> 
    </div>
  );
};

export default Allblog;