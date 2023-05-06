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
  const [disease, setDisease] = useState('');
  const [imageUrl, setImageUrl] = useState([]);

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

  const get_image = (doc_id) =>{
    const id_data = {user_id: doc_id};
    Axios.post('http://localhost:5000/get_images', id_data, { responseType: 'blob' }).then((response) => {
        if(response.data.size){
            setImageUrl(URL.createObjectURL(response.data));
            
        }else{
            setImageUrl(gen);
        }
    });
  };

  useEffect(() => {
      get_image(id);
  });


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


  // const toggleAppointment = () => {
  //   setShowAppointment(!showAppointment);
  // };

  const timeOptions = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

  return (
    <div className="max-w-8xl mx-2">
        <div className="bg-gray-200 max-w-3xl text-lg mt-20 px-10 py-8 mx-2 rounded-lg my-auto cursor-pointer"  >

                      <div className="grid grid-cols-3 cursor-pointer" onClick={() => handleDoctorClick(id)}>
                      <div>
                        <img src={imageUrl} className="rounded-full object-cover h-24 w-4/5 md:h-48 md:w-full"></img>
                      </div>
                      
                      <div className=" col-span-2 mx-auto my-auto">
                          <h3 className="font-bold text-3xl py-5">Dr. {fname} {lname}</h3>
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
        if(response.data.class != 'patient'){
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
    
    let docs = [];

    options.forEach(option =>{
        const dept_data = {dept: option.label};
        Axios.post('http://localhost:5000/get_doctors_dept', dept_data).then((response)=>{
            if(response.data.doctors.length > 0){
                docs = [...docs, ...response.data.doctors];
                console.log(docs);
                setDoctors(docs);
            }
        });
    });

  }, []);


    const options = [
        { label: 'General', value: 'general' },
        { label: 'Cardiology', value: 'cardiology' },
        { label: 'Radiology', value: 'radiology' },
        { label: 'Pathology', value: 'pathology' },
        { label: 'Nephrology', value: 'nephrology' },
        { label: 'Medicine', value: 'medicine' },
        { label: 'Pediatrics', value: 'pediatrics' },
        { label: 'Obstetrics and gynaecology', value: 'obstetrics_and_gynaecology' }
    ];

      



    const fetch_doc = (e) =>{
        setDept(e.target.value);
        console.log(dept); 
        const dept_data = {dept: e.target.value};
        Axios.post('http://localhost:5000/get_doctors_dept', dept_data).then((response)=>{         
            setDoctors(response.data.doctors);
        });
        
    }

  return (
    <div className="bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 min-h-full">
      <Nav/>  
      <div className="max-auto text-center py-10">
          <h2 className="text-3xl font-black uppercase text-white">Choose A Doc!</h2>
      </div>
      <div className="mx-auto max-w-7xl">
        <select id="department" name="department" value={dept} onChange={fetch_doc} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-400 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-300 dark:focus:border-blue-500 mx-auto max-w-4xl">
            <option value="">Select department</option>
            {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
        
        <div className="grid grid-cols-2">
            {doctors.map((doctor, index) => (
                <div key={index}>
                <Doctor {...doctor} appointments={appointments} setAppointments={setAppointments} patId ={patId} userId = {userId} p_fname={pfname}/>
                </div>
            ))}
        </div>
       </div>
    </div>
  );
};

export default Appointment;
