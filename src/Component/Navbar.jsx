import { Link, NavLink } from "react-router-dom";


const Navbar = ({user,handelsignout}) => {
  // console.log(user.displayName);
  // console.log(user?.uid);

    return (
        <div>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
              <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <Link to={"/"} className="flex items-center">
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">NH-Mini-Pro</span>
                </Link>

                <div className="flex md:order-2">
                  {
                    user&&
                     <button type="button" className="text-white bg-blue-700  font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 ">{user?.displayName}</button>
                  }
                  {
                    user?.uid?
                    <Link to={""} onClick={handelsignout} className="ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign-out</Link>
                   :
                   <Link to={"/login"} className="ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign-in</Link>

                  }
                  <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                  </button>
                </div>
{/* active navbar menu work start  */}
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                  <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                      <NavLink to={"/"} className={({ isActive, isPending }) =>isPending ? "" : isActive ? "border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline" : ""} aria-current="page">Home</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/about"}  className={({ isActive, isPending }) =>isPending ? "" : isActive ? "border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline" : ""}>About</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/services"} className={({ isActive, isPending }) =>isPending ? "" : isActive ? "border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline" : ""}>Services</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/contact"}  className={({ isActive, isPending }) =>isPending ? "" : isActive ? "border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline" : ""}>Contact</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/blog"}  className={({ isActive, isPending }) =>isPending ? "" : isActive ? "border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline" : ""}>Blog Post</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
        </div>
    );
};

export default Navbar;