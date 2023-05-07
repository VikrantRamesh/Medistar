import './App.css';
import Home from "./components/Home.jsx";
import Login_page from "./components/login.jsx";
import Signup_page from "./components/signup.jsx";
import Symptoms from "./components/Symptoms.jsx";
import Docdash from "./components/docdash.jsx";
import Appointment from "./components/appointments.jsx";
import AdminDash from "./components/admindash.jsx";
import GeneralAppointment from "./components/General_appointments.jsx";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes} from 'react-router-dom';


function App() {
  return (
          <BrowserRouter className = 'min-h-full'>
                 <Routes>
                    <Route exact path='/' element={< Home />}></Route>
                    <Route exact path='/signup' element={< Signup_page />}></Route>
                    <Route exact path='/login' element={< Login_page />}></Route>
                    <Route exact path='/symptoms' element={< Symptoms />}></Route>
                    <Route exact path='/Appointments' element={< Appointment />}></Route>
                    <Route exact path='/general_appointments' element={< GeneralAppointment />}></Route>
                    <Route exact path='/admindash' element={< AdminDash />}></Route>
                    {/* <Route exact path='/logout' element={< Appointment />}></Route> */}
                    <Route exact path='/docdash' element={< Docdash />}></Route>
                 </Routes>
          </BrowserRouter>
  );
}



export default App;
