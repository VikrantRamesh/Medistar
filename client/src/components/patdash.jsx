import React, { useState, useEffect } from "react";
import '../styles/signup.css';
import Axios from "axios";
import swal from 'sweetalert';
import {useNavigate, useLocation } from 'react-router-dom';
import Nav from './dashNav.jsx';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css';
import HealthGraph from "./patient_components/patGraph";

const currentDate = new Date().toISOString().slice(0, 10);
const PatDassh = () => {
  const [userId, setUserId] = useState("");
  const[theme, setTheme] = useState(localStorage.theme);

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [appointmentData, setAppointmentData] = useState([]);

  const handleDarkModeChange = (darkMode) => {
    setTheme(darkMode);
    if (darkMode == 'dark') {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
  };


  const navigate = useNavigate();

  useEffect(() => {
    //user Authentication
    Axios.get('http://localhost:5000/protected', { withCredentials: true }).then((response)=>{
            setUserId(response.data.id);
            if(response.data.class !== 'patient'){
                swal({
                    title:"Only patients are Allowed!",
                    icon: "warning",
                });
                navigate('/login');
            }

        });
  }, []);


  const handleDateClick = (date) => {
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log(tomorrow.toISOString().slice(0,10));
    setSelectedDate(tomorrow.toISOString().slice(0,10));
    // update the appointment data based on the selected date
    // setAppointmentData(updatedData);
  };




  return (
    <div className="dark:bg-slate-800 bg-slate-300 transition-all h-min-screen duration-500 pb-5">
            <Nav onDarkModeChange={handleDarkModeChange} ></Nav>
            <div className="grid grid-cols-2">
                <div className="justify-center flex">
                            <Calendar
                                value={selectedDate}
                                calendarType="US"
                                onClickDay = {handleDateClick}
                                tileClassName={`text-center mx-auto  text-slate-500  dark:text-slate-100 mt-2`}
                                className = "bg-white dark:bg-slate-500 shadow-2xl text-slate-400 dark:text-white   rounded-2xl px-10 py-5  transition-all duration-5000"
                            />
                </div>
                <div className="bg-slate-50 shadow-xl  mx-auto pt-4 px-10  rounded-lg  dark:bg-slate-600 transition-all duration-1000">
                    <HealthGraph theme={theme} selectedDate={selectedDate}/>
                </div>
            </div>
    </div>
  );
};

export default PatDassh;