import React, { useState, useEffect } from "react";
import '../styles/signup.css';
import Axios from "axios";
import swal from 'sweetalert';
import {useNavigate, useLocation } from 'react-router-dom';
import Nav from './nav.jsx';
import gen from "../Images/general_docimg.jpg";

const Doctor = ({ id, fname, lname, qualification, department, appointments, setAppointments ,patId, userId, p_fname}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [TimeSlots, setTimeSlots] = useState(['10:00 AM','11:00 AM', '12:00 PM', '01:00 PM','02:00 PM', '03:00 PM', '04:00 PM','05:00 PM']);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();


  const handleAppointment = (event) => {
    event.preventDefault();
    if (selectedDate && selectedTime) {

      const appointment_details = {date : selectedDate, time:selectedTime,  doc_id: selectedDoctorId, pfname: p_fname, pid: patId, doc_name: fname, department:department};
      const doc_detils = {date : selectedDate, time:selectedTime,  doc_id: selectedDoctorId};
      Axios.post('http://localhost:5000/get_doctor_appointments', appointment_details).then((response) => {
        if(response.data.count>=3){
            swal({
              title:"Slot Full!",
              icon: "warning",
            });
        }else{
          Axios.post('http://localhost:5000/appointment', appointment_details).then((response) => {
            swal({
              title:"Appointment Confirmed!",
              icon: "success",
            });
            navigate("/patdash");
        });
        }
      });
      

      const newAppointment = { date: selectedDate, time: selectedTime };
      console.log("Appointment scheduled for Doctor ID: " + selectedDoctorId);
      console.log("Date: " + selectedDate);
      console.log("Time: " + selectedTime);
      setAppointments([...appointments, newAppointment]);
      setSelectedDate('');
      setSelectedTime('');
    }
  };


  const timeOptions = {'10:00 AM':0, '11:00 AM':1, '12:00 PM':2, '01:00 PM':3, '02:00 PM':4, '03:00 PM':5, '04:00 PM':6, '05:00 PM':7, '09:00 AM':-1};

  const handleDoctorClick = (doctorId) => {
    // If the clicked doctor is already selected, deselect it
    
    if (selectedDoctorId === doctorId) {
      setSelectedDoctorId(null);
      console.log("change",doctorId);
    } else {
      // Otherwise, set the clicked doctor as the selected doctor
      setSelectedDoctorId(doctorId);
      console.log("change",doctorId);
    }
  };

    const get_image = () =>{
      const id_data = {user_id: id};
      Axios.post('http://localhost:5000/get_images', id_data, { responseType: 'blob' }).then((response) => {
          if(response.data.size){
              setImageUrl(URL.createObjectURL(response.data));
          }else{
              setImageUrl(gen);
          }
    });
  }


  //Check if currently selected date and time are beyond current time
  useEffect(() =>{

    const currentYear = currentTime.getFullYear();
    let currentMonth = currentTime.getMonth()+1;
    currentMonth = ("0" + currentMonth).slice(-2);
    const currentDay = currentTime.getDate();

    const curr_date =  currentYear + "-" + currentMonth + "-" + currentDay;

    const railwayHours = currentTime.getHours();
    let hours = railwayHours > 12 ? railwayHours - 12 : railwayHours;
    hours = ("0" + hours).slice(-2);
    const amPm = railwayHours >= 12 ? "PM" : "AM";
    hours = hours +":00 "+ amPm;
    
    const date1 = new Date(selectedDate);
    const date2 = new Date(curr_date);

    if(date1 < date2){

            setTimeSlots([]);

    }else if(date1 > date2){

            const temp_times = [];
            Object.keys(timeOptions).forEach((time)=>{
                  temp_times.push(time);
            });
            setTimeSlots(temp_times);
        
    }else{
            setTimeSlots([]);
            const temp_times = [];
            Object.keys(timeOptions).forEach((time)=>{
                console.log(hours, timeOptions[time] );
                if(timeOptions[hours] < timeOptions[time]){
                    temp_times.push(time);
                }
            });
            setTimeSlots(temp_times);
    }
    
  },[selectedDate,selectedTime]);



  const { state } = useLocation();
  const { diseases } = state;

  useEffect(() => {
      get_image();
  }, []);


  // const toggleAppointment = () => {
  //   setShowAppointment(!showAppointment);
  // };

  return (
    <div className=''>
        <div className="bg-gray-200 mx-auto max-w-xl text-lg mt-20 px-10 py-8 rounded-lg my-auto text-center">
                    <div className="grid grid-cols-3">
                      <div>
                        <img src={imageUrl} className="rounded-full h-24 w-24 md:h-48 md:w-48 object-cover"></img>
                      </div>
                      
                      <div onClick={() => handleDoctorClick(id)} className="cursor-pointer col-span-2 mx-auto my-auto">
                          <h3 className="font-black text-3xl py-5">Dr. {fname} {lname}</h3>
                          <p><strong className = "font-bold text-2xl">Qualification:</strong> {qualification}</p>
                          <p><strong className = "font-bold text-2xl">Department:</strong> {department}</p>
                      </div>
                    </div>
                    {selectedDoctorId === id && <div className=" bg-indigo-900 mx-auto text-lg mt-4 px-4 py-4 rounded-lg text-left">
                    <form onSubmit={handleAppointment}>                       
                        <label className="text-white mx-2">
                        Date:
                        <input className = "my-2 mx-5 text-black" type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} required/>
                        </label>
                        <label className="text-white mx-2">
                        Time:
                        <select className = 'my-2 mx-5 text-black' value={selectedTime} onChange={(event) => setSelectedTime(event.target.value)} required>
                            <option value="">--Select a Time--</option>
                            {TimeSlots.map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                            ))}
                        </select>
                        </label>
                        <button type="submit" className=" px-2 py-2 mx-2 my-4">Book Appointment</button>
                    </form>
                
        </div>}
        </div>
        
</div>
  );
};

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [userId, setUserId] = useState('');
  const [patId, setPatId] = useState('');
  const [pfname, setPfname] = useState('');
  const [dept, setDept] = useState('General');

  const navigate = useNavigate();

  const { state } = useLocation();
  const { diseases } = state;

  // const Fetch_Doc = () => {
  //   Axios.post('http://localhost:5000/get_doctors').then((response)=>{
  //       console.log(response.data.doctors);
  //       setDoctors(response.data.doctors);
  //   });
  // };

  useEffect(() => {
    document.documentElement.classList.add('dark');
    Axios.get('http://localhost:5000/protected', { withCredentials: true }).then((response)=>{
        setUserId(response.data.id);
        console.log(response.data.id);
        if(response.data.class !== 'patient'){
            swal({
                title:"Only Patients are allowed to make appointments!",
                icon: "warning",
            });
            navigate("/");
        }else{
          const userId_detail = {userId: response.data.id}
          Axios.post('http://localhost:5000/get_patient_id', userId_detail).then((response)=>{
                  console.log(response.data.p_fname,response.data.pid);
                  setPatId(response.data.pid);    
                  setPfname(response.data.p_fname);
          });
        }
    }).catch(error => {
        console.log(error);
        navigate('/login');
    });

    console.log(diseases);
    if(diseases != undefined){
        const disease_data = {disease: diseases};
        Axios.post('http://localhost:5000/get_doctors', disease_data).then((response)=>{
            console.log(response.data.doctors[0]['department']);
            setDept(response.data.doctors[0]['department']);  
            setDoctors(response.data.doctors);
        });
    }else{
        const disease_data = {dept: 'general'};
        Axios.post('http://localhost:5000/get_doctors_dept', disease_data).then((response)=>{
            setDept('general');
            setDoctors(response.data.doctors);
        });
    }
}, []);

  return (
    <div className="bg-violet-400 min-h-full">
      <Nav/>  
      <div className="content-center rounded-lg bg-slate-100 duration-300 p-4 py-2 shadow-2xl mt-3 bg-opacity-60 mx-20">
          {(diseases!== undefined) &&
            <div className="max-auto text-center py-10">
                <h2 className="text-4xl text-slate-800 font-bold uppercase tracking-wider">We predict that you may have<div className="text-pink-500 text-7xl"> {diseases}!</div></h2>
            </div>
          }
          {(diseases === undefined) &&
            <div className="max-auto text-center py-10 text-white">
                <h2 className="text-3xl text-slate-800 font-bold uppercase tracking-wider">Oh! Your symptoms didn't match any particular disease! Consult general medicine doctors</h2>
            </div>
          }
      </div>
      <div className="max-auto text-center pt-10">
          <h2 className="text-2xl font-semibold uppercase tracking-wider">Recommmended Department:  <strong className="text-black text-2xl"> {dept}</strong></h2>
      </div>
      <div className="grid grid-cols-2">
          {doctors.map((doctor, index) => (
            <div key={index}>
              <Doctor {...doctor} appointments={appointments} setAppointments={setAppointments} patId ={patId} userId = {userId} p_fname={pfname}/>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Appointment;
