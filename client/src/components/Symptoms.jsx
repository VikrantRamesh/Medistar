import React, { useState, useEffect } from "react";
import '../styles/signup.css';
import Axios from "axios";
import swal from 'sweetalert';
import {useNavigate, Link } from 'react-router-dom';
import Nav from './nav.jsx';

import Select from "react-select";
import { Fragment } from "react";
import { FormLabel, FormInput } from "@tailwindcss/forms";

function AppointmentForm() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [sym_di, setSym_di] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  //const handleOptionsChange = (event) => {
  //  setSymptoms(event.target.value);
  //};

  const handleChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    setIsChecked(event.target.checked);
  
    if (checked) {
      setSelectedOptions((prev) => [...prev, value]);
    } else {
      setSelectedOptions((prev) => prev.filter((option) => option !== value));
    }
  };

  useEffect(() => {

     Axios.get('http://localhost:5000/protected', { withCredentials: true }).then((response)=>{
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
         });
       }
       }).catch(error => {
           console.log(error);
           navigate('/login');
       });


      Axios.post('http://localhost:5000/get_symptoms').then((response)=>{
          //console.log(response.data.symptoms);
          setOptions(response.data.symptoms);
      });
  }, []);
  


  const handleSubmit = async (event) => {
    console.log("before", isChecked);
    if(!isChecked){
      console.log(isChecked);
      // swal({
      //   title:"Please Check Atleast one symptom!",
      //   icon: "Warning",
      // });
    }
    else{
        event.preventDefault();
        // Send form data to server
        const disease_details = {symptoms: selectedOptions};
        Axios.post('http://localhost:5000/detect_disease', disease_details).then((response)=>{
            console.log(response.data.diseases[0]);
            navigate('/appointments',{ state: { diseases:  response.data.diseases[0]}});
        });
    }
  };


  return (
    
    <div className='bg-gradient-to-t from-gray-900 via-violet-400 to-purple-700 min-h-full'>
        <Nav/>  
        <div className=" signup-container flex-col text-lg">
            <form onSubmit={handleSubmit}>
              <h2 className="text-center text-white font-bold text-4xl py-8 px-8 ">Symptoms:</h2>
              <div className="grid grid-cols-3 gap-4 content-center rounded-lg bg-purple-200 hover:scale-110 transition-all duration-300 p-4 ">
                    {options.map((option) => (
                      <label key={option.value} className="block ml-20">
                        <input
                          multiple={true}
                          type="checkbox"
                          value={option.value}
                          checked={selectedOptions.includes(option.value)}
                          onChange={handleChange}
                          className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out  mx-auto"
                        />
                        <span className="ml-2 text-white">{option.label}</span>
                      </label>
                    ))}
                </div>

                <button className="  bg-blue-300 w-1/3 mx-auto my-10 py-2 px-4 py-2 rounded hover:bg-gradient-to-r from-pink-200 to-pink-500 hover:to-pink-500 hover:text-slate-900 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-3 text-white hover:opacity-75 transition-colors duration-30 hover:scale-110 transition-all duration-300" type="submit">Check Condition</button>
            </form>  
        </div>
    </div>
  );
}

export default AppointmentForm;
