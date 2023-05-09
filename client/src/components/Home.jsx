import React, { useState, useEffect } from "react";
import '../styles/signup.css';
import {useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from './nav.jsx';
import home1 from "../Images/home_img_1.jpg";
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faUserDoctor}  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStethoscope}  from '@fortawesome/free-solid-svg-icons';
import { faTruckMedical }  from '@fortawesome/free-solid-svg-icons';


function MainPage() {
  return (
    <>
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
   
    <div className="grid grid-cols-4 gap-4  mx-20 my-5">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 flex-col flex justify-center "><h1 className="text-white flex justify-center font-bold text-2xl ">24 Hours Service</h1>
      <FontAwesomeIcon icon={faClock} style={{color: "#ffffff",}} size='2xl' className=" flex justify-center my-9 " />
      <p className=" inline-block pb-1 text-gray-300 flex justify-center mx-4  ">
      We ensure our patients receive prompt medical attention and care at any time of the day or night,
       giving a peace of mind for patients and their families
      </p>
      </div>
      <div className="bg-gradient-to-r from-blue-700 to-blue-900"><h1 className="text-white flex justify-center font-bold mt-10 text-2xl">Experienced Doctors</h1>
      <FontAwesomeIcon icon={faUserDoctor} style={{color: "#ffffff",}} size='2xl' className="flex justify-center my-9" />
      <p className=" inline-block pb-1 text-gray-300 flex justify-center mx-4 mt-10 ">
      Our hospital takes pride in housing a diverse and exceptional group of experienced doctors whose collective expertise covers a wide range of specialties, ensuring exceptional care for patients.
      </p>

      </div>
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900"><h1 className="text-white flex justify-center font-bold mt-10 text-2xl">Outdoor Checkup</h1>
      <FontAwesomeIcon icon={faStethoscope} style={{color: "#ffffff",}} size='2xl' className="flex justify-center my-9 " />
      <p className=" inline-block pb-1 text-gray-300 flex justify-center mx-4 mt-10  " >
      Embracing a refreshing approach, Medistar offers outdoor checkups, fostering a delightful healing environment.
Patients can enjoy the soothing embrace of nature while receiving top-notch medical care.

      </p>
      </div>
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-700"><h1 className="text-white flex justify-center font-bold mt-10 text-2xl">Emergency Care</h1>
      <FontAwesomeIcon icon={faTruckMedical} style={{color: "#ffffff",}} size='2xl' className="flex justify-center my-9 "  />
      <p className=" inline-block pb-1 text-gray-300 flex justify-center mx-4 mt-10"  >
      We prioritize the well-being of our patients, attending to critical cases without delay. Rest assured as we are  always accessible for swift assistance. our emergency hotline +1800-123-987
      </p>
       </div>
    </div>

    <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 mx-5 mt-5">

<h2 className=" mt-5 mx-5 my-5 font-bold text-white ml text-2xl"  >  About us :  </h2>
<p className="  inline-block pb-1 text-white flex justify-center mx-4 mt-5 text-xl ">
At Medistar, we believe in fostering strong doctor-patient relationships, ensuring open communication and trust every step of the way.
For decades, we have been dedicated to serving our community with unwavering commitment and cutting-edge medical advancements.Our team of highly skilled doctors, nurses, and staff is driven by a shared mission to provide comprehensive and personalized healthcare.
With state-of-the-art facilities and advanced technology, we offer a wide range of medical services to address your unique needs. With all these facilities available within your grasp ,experience the difference of exceptional healthcare as we continue to pave the path towards a healthier future.
</p>
    </div>
    <div className="mt-3">
    <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white py-4   ">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Medistar. All rights reserved.</p>
        <p> 20/59 Anna Nagar, Chennai, Tamil Nadu - 6000040</p>
      </div>
    </footer>
    </div>

    </>
  );
}

export default MainPage;
