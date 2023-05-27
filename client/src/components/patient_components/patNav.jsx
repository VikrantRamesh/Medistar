import React, { useState, useEffect } from "react";
import '../../styles/signup.css';
import Axios from "axios";
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import {useNavigate, useLocation } from 'react-router-dom';
import {toDarkMode, toLightMode, toSystemMode} from '../../contexts/themeContext';
import classNames from "classnames";


  

function Nav(props) {

const [logged, SetLogged] =  useState(false);

//theme useState
const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
);

const toggleDarkMode = () => {
    setDarkMode(!darkMode);
};
const buttonClass = classNames(
    "rounded-full",
    "py-2",
    "px-4",
    "text-white",
    " transition-all duration-1000",
    darkMode ? "bg-black" : "bg-cyan-500"
);
  
useEffect(() => {
        const body = document.querySelector("body");
        if (darkMode) {
            //body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
            props.onDarkModeChange("dark");
        } else {
            //body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
            props.onDarkModeChange("light");
        }
            
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
}, [darkMode]);


useEffect(() => {

    Axios.get('http://localhost:5000/protected', { withCredentials: true }).then((response)=>{
            const userId_detail = {userId: response.data.id}
            Axios.post('http://localhost:5000/get_patient_id', userId_detail).then((response)=>{
                SetLogged(true);
            });
        }).catch(error => {
            SetLogged(false);
        });
});


const navigate = useNavigate();


const handleLogOut = () =>{
    Axios.get('http://localhost:5000/logout', { withCredentials: true }).then((response)=>{
        if(response.data.logout){
            SetLogged(false);
            navigate('/');
        }
    });
}


return(
    <nav className=" bg-gray-900 border-gray-200 dark:bg-white transition-all duration-1000  mb-4">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pt-2 pb-1">
            <a  className="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                <span className="self-center text-3xl font-semibold whitespace-nowrap text-white dark:text-gray-900 my-2  transition-all duration-1000">MEDISTAR</span>
            </a>
            <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path></svg>
            </button>



            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:border-gray-700 items-center">
                    <Link to="/patdash" className="block py-2 pl-3 pr-4 dark:text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        Dashboard
                    </Link>
                    <Link to="/general_appointments" className="block py-2 pl-3 pr-4 dark:text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        Appointment
                    </Link>
                    <Link to="/symptoms" className="block py-2 pl-3 pr-4 dark:text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        Predictor
                    </Link>
                    <button className={buttonClass} onClick={toggleDarkMode}>
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                    <button onClick={handleLogOut} className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500  hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 dark:p-0  transition-all duration-1000">
                        <span className="relative px-5 py-2 bg-cyan-500 font-bold text-white dark:bg-white dark:text-cyan-500 dark:hover:text-white dark:hover:bg-blue-500 rounded-md group-hover:bg-white hover:text-cyan-500  dark:font-bold  transition-all duration-1000">
                            Logout
                        </span>
                    </button>

                </ul>
            </div>
        </div>
    </nav>
);
}
//className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
export default Nav;