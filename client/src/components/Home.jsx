import React, { useState, useEffect } from "react";
import '../styles/signup.css';
import {useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from './nav.jsx';
import home1 from "../Images/home_img_1.jpg";
import home2 from "../Images/Doc-img.png";
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
              Trusted for our expertise. Chosen for our care.
            </h2>
        </div>
        
      </div>
    </div>
   
    <div className="grid grid-cols-4 gap-8 mx-20 my-5 mb-10">

      <div className="bg-blue-600 flex-col py-10 flex justify-center rounded-3xl transform hover:scale-110 transition duration-500 ease-in-out">
        <h1 className="text-white text-center font-bold text-2xl ">24 Hours Service</h1>
          <FontAwesomeIcon icon={faClock} style={{color: "#ffffff"}} size='5x' className=" my-9"/>
          <p className="pb-1 text-white flex justify-center mx-8  ">
          We ensure our patients receive prompt medical attention and care at any time of the day or night,
          giving a peace of mind for patients and their families
          </p>
      </div>

      <div className="bg-blue-600  flex-col flex justify-center  rounded-3xl transform hover:scale-110 transition duration-500 ease-in-out">
        <h1 className="text-white text-center font-bold text-2xl ">Experienced Doctors</h1>
      <FontAwesomeIcon icon={faUserDoctor} style={{color: "#ffffff",}} size='5x' className=" my-9" />
          <p className="pb-1 text-white flex justify-center mx-8  ">
          Our hospital takes pride in housing a diverse and exceptional group of experienced doctors whose collective expertise
           covers a wide range of specialties.
          </p>
      </div>

      <div className="bg-blue-600  flex-col flex justify-center  rounded-3xl transform hover:scale-110 transition duration-500 ease-in-out">
        <h1 className="text-white text-center font-bold text-2xl ">Outdoor Checkup</h1>
      <FontAwesomeIcon icon={faStethoscope} style={{color: "#ffffff",}} size='5x' className=" my-9 " />
          <p className="pb-1 text-white flex justify-center mx-8  ">
          Embracing a refreshing approach, Medistar offers outdoor checkups, fostering a delightful healing environment where
          Patients can enjoy top-notch medical care.
          </p>
      </div>

      <div className="bg-blue-600 flex-col flex justify-center rounded-3xl transform hover:scale-110 transition duration-500 ease-in-out">
        <h1 className="text-white text-center font-bold text-2xl ">Emergency Care</h1>
      <FontAwesomeIcon icon={faTruckMedical} style={{color: "#ffffff",}} size='5x' className=" my-9 "  />
          <p className="pb-1 text-white flex justify-center mx-8  ">
          We prioritize the well-being of our patients, attending to critical cases without delay. Rest assured as we are  always accessible for swift assistance. our emergency hotline +1800-123-987
          </p>
      </div>


    </div>

    <div className=" dark:bg-blue-500 mt-5 pt-5 px-5 ">

      <h2 className="mx-5 my-5 font-bold text-white ml text-5xl text-center mb-10">  ABOUT US  </h2>
      <div className="grid grid-cols-5">
          <div className="col-span-3 my-auto bg-cyan-300 px-10 py-5 bg-opacity-25 ml-32 rounded-3xl transform hover:scale-110 transition duration-500 ease-in-out">  
              <p className=" pb-1 text-white flex justify-center  mt-2 text-2xl ">
              At Medistar, we believe in fostering strong doctor-patient relationships, ensuring open communication and trust every step of the way.
              For decades, we have been dedicated to serving our community with unwavering commitment and cutting-edge medical advancements.Our team of highly skilled doctors, nurses, and staff is driven by a shared mission to provide comprehensive and personalized healthcare.
              With state-of-the-art facilities and advanced technology, we offer a wide range of medical services to address your unique needs.
              </p>
          </div>
          <div className=" col-span-2">
            <p className=" pb-1 text-white flex justify-center mx-4 text-xl">
                  <img src={home2}></img>
            </p>
          </div>
      </div>
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