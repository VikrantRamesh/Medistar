import React, { useState, useEffect } from "react";
import '../styles/signup.css';
import Axios from "axios";
import swal from 'sweetalert';
import {useNavigate, useLocation } from 'react-router-dom';
import Nav from './nav.jsx';
import gen from "../Images/general_docimg.jpg";

const Doctor = ({ id, fname, lname, qualification, department, appointments, setAppointments ,patId, userId, p_fname}) => {
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAppointment = (event) => {
    event.preventDefault();
    if (selectedDate && selectedTime) {

      const appointment_details = {date : selectedDate, time:selectedTime,  doc_id: selectedDoctorId, pfname: p_fname, pid: patId, doc_name: fname, department:department};

      Axios.post('http://localhost:5000/appointment', appointment_details).then((response) => {
          swal({
            title:"Appointment Confirmed!",
            icon: "success",
          });
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

  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

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
      console.log("doc_id", id);
      const id_data = {user_id: id};
      Axios.post('http://localhost:5000/get_images', id_data, { responseType: 'blob' }).then((response) => {
          console.log(id, response.data)
          if(response.data.size){
            setImageUrl(URL.createObjectURL(response.data));
          }else{
              console.log(id);
              setImageUrl(gen);
          }
    });
  }



  const { state } = useLocation();
  const { diseases } = state;

  useEffect(() => {
      get_image();
  }, []);


  // const toggleAppointment = () => {
  //   setShowAppointment(!showAppointment);
  // };

  const timeOptions = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

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
                    {selectedDoctorId === id && <div className=" bg-slate-950 mx-auto text-lg mt-4 px-4 py-4 rounded-lg">
                    <form onSubmit={handleAppointment}>
                        <label className="text-white mx-2">
                        Date:
                        <input className = "my-2 mx-5 text-black" type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} required/>
                        </label>
                        <label className="text-white mx-2">
                        Time:
                        <select className = 'my-2 mx-5 text-black' value={selectedTime} onChange={(event) => setSelectedTime(event.target.value)} required>
                            <option value="">--Select a Time--</option>
                            {timeOptions.map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                            ))}
                        </select>
                        </label>
                        <button type="submit" className=" px-2 py-2 mx-2 my-4">Book Appointment</button>
                    </form>
                    {/* <ul>
                        {appointments.map((appointment, index) => (
                        <li key={index}>
                            <span>{appointment.date}</span> at <span>{appointment.time}</span>
                        </li>
                        ))}
                    </ul> */}
                
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

    // fetch('http://localhost:5000/protected', {
    //     method: 'GET',
    //     credentials: 'include'
    // }).then(data => {
    //     setUserId(data.id);
    //     console.log(data.id);
    // }).catch(error => {
    //     console.log(error);
    //     navigate('/login');
    // });
    console.log(diseases);
    if(diseases != undefined){
        const disease_data = {disease: diseases};
        Axios.post('http://localhost:5000/get_doctors', disease_data).then((response)=>{
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
    <div className="bg-gradient-to-r from-green-200 via-green-300 to-blue-500 min-h-full">
      <Nav/>  
      {(diseases!== undefined) &&
        <div className="max-auto text-center py-10">
            <h2 className="text-4xl font-bold uppercase">We predict that you may have<div className="text-pink-500 text-7xl"> {diseases}!</div></h2>
        </div>
      }
      {(diseases === undefined) &&
        <div className="max-auto text-center py-10">
            <h2 className="text-4xl font-bold uppercase">Oh! Your symptoms didn't match any particular disease! Consult general medicine doctors</h2>
        </div>
      }
      <div className="max-auto text-center py-10">
          <h2 className="text-2xl font-semibold uppercase">Recommmended Department:  <strong className="text-black text-2xl"> {dept}</strong></h2>
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
