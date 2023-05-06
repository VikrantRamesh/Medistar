import React, { useState, useEffect } from "react";
import '../styles/signup.css';
import Axios from "axios";
import swal from 'sweetalert';
import {useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from './nav.jsx';
import home1 from "../Images/home_img_1.jpg";


function MainPage() {
  return (
    <div className="bg-class bg-[url('../Images/home_img_1.jpg')] h-3/4 ">
      <Nav/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 h-5/6">
        <div className="mt-10 flex justify-center">

        </div>
        <div className="md:flex md:items-center md:justify-between my-auto  bg-white rounded-2xl bg-opacity-60 px-12 py-10">
            <h2 className="text-3xl font-bold leading-tight text-gray-800 sm:text-5xl sm:leading-none md:text-5xl ">
              For he who has health has hope; and he who has hope, has everything.
            </h2>
        </div>
        
      </div>
    </div>
  );
}

export default MainPage;