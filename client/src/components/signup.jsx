import React, { useState } from 'react';
import '../styles/signup.css';
import Axios from "axios";
import swal from 'sweetalert';
import {useNavigate, Link} from 'react-router-dom';
import InteractiveBackground from "./InteractBg";


const Signup_page = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminUserName, setAdminUserName] = useState('');
  const [adminKey, setAdminKey] = useState('');

  const [doctorEmail, setDoctorEmail] = useState('');
  const [doctorPassword, setDoctorPassword] = useState('');
  const [doctorUserName, setDoctorUserName] = useState('');

  const [doctorGender, setDoctorGender] = useState('Male');
  const [doctorAge, setDoctorAge] = useState('');
  const [doctorFirstName, setDoctorFirstName] = useState('');
  const [doctorLastName, setDoctorLastName] = useState('');
  const [doctorAddress, setDoctorAddress] = useState('');
  const [doctorPhone, setDoctorPhone] = useState('');
  const [doctorQual, setDoctorQual] = useState('MS');
  const [doctorDept, setDoctorDept] = useState('General');

  const [doctorPage, setDoctorPage] = useState(1);

  const [patientEmail, setPatientEmail] = useState('');
  const [patientPassword, setPatientPassword] = useState('');
  const [patientGender, setPatientGender] = useState('Male');
  const [patientAge, setPatientAge] = useState('');
  const [patientUserName, setPatientUserName] = useState('');
  const [patientFirstName, setPatientFirstName] = useState('');
  const [patientLastName, setPatientLastName] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  const [patientPhone, setPatientPhone] = useState('');

  const [patientPage, setPatientPage] = useState(1);

  
  const isDisabledPatient = !patientUserName || !patientEmail || !patientPassword
  const isDisabledDoctor = !doctorUserName || !doctorEmail || !doctorPassword
  const isDisabledAdmin = !adminUserName || !adminEmail || !adminPassword || !adminKey
  
  const navigate = useNavigate();

  const [selectedForm, setSelectedForm] = useState("admin");

  const handleFormSelection = (form) => {
    setSelectedForm(form);
  };


  const handleAdminSubmit = (event) => {
    event.preventDefault();
    if(adminKey !== 'AX732!9'){
        swal({
            title:"ACCESS DENIED!",
            text: "Wrong Admin Key!",
            icon: "warning",
        });
    }
    else{
        const admin_details = {username:adminUserName, 
        password: adminPassword,
        email: adminEmail,
        class: "admin"};
        Axios.post('http://localhost:5000/admin_signup', admin_details).then((response) => {
            console.log(response);
        });
        swal({
            title:"Registration Success!",
            icon: "success",
        });
        navigate('/login');
    }
    
  };

  const handleDoctorSubmit = (event) => {
    event.preventDefault();

    const doc_details = {
        username:doctorUserName, 
        password: doctorPassword,
        email: doctorEmail,
        dob: doctorAge, 
        gender: doctorGender,
        fname: doctorFirstName,
        lname:doctorLastName, 
        address: doctorAddress,
        phone: doctorPhone,
        qual: doctorQual,
        dept: doctorDept,
        class: "doctor"};

    Axios.post('http://localhost:5000/doctor_signup', doc_details).then((response) => {
        console.log(response);
    });
    swal({
        title:"Registration Success!",
        icon: "success",
    });
    navigate('/login');
  };




  const handlePatientSubmit = (event) => {
    event.preventDefault();
    
    const patient_details = {
        username:patientUserName, 
        password: patientPassword,
        email: patientEmail,
        age: patientAge, 
        gender: patientGender,
        fname: patientFirstName,
        lname:patientLastName, 
        address: patientAddress,
        phone: patientPhone,
        class: "patient"};

    Axios.post('http://localhost:5000/patient_signup', patient_details).then((response) => {
        console.log(response);
    });
    swal({
        title:"Registration Success!",
        icon: "success",
    });
    navigate('/login');
  };

  const handleSelectChange = (event) => {
    setPatientGender(event.target.value);
  };

  const handleSelectChange_doc = (event) =>{
    setDoctorGender(event.target.value);
  }

  const handleQualChange_doc = (event) =>{
    setDoctorQual(event.target.value);
  }

  const handleDeptChange_doc= (event) =>{
    setDoctorDept(event.target.value);
  }

  const renderLoginForm = (formType) => {
    switch (formType) {
      case "admin":
        return (

        <div className="signup-form mx-auto max-w-xl	bg-cyan-400  bg-opacity-90 shadow-2xl">

            
                <div className='flex flex-row'>
                    <div className='mb-5 '>
                        <button
                        className="bg-white flex items-center justify-center w-10 h-10 rounded-full shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                        onClick={() => window.history.back()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-black"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        </div>
                        <h2 className='font-bold mb-5 p-0 ml-24'>Admin Signup</h2>
                    </div>
                    <form onSubmit={handleAdminSubmit}>

                    <div className="form-group w-10/12 mx-auto">
                        <label>Username</label>
                        <input type="text" value={adminUserName} onChange={(e) => setAdminUserName(e.target.value)} required />
                    </div>
                    <div className="form-group w-10/12 mx-auto">
                        <label>Email</label>
                        <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required />
                    </div>
                    <div className="form-group w-10/12 mx-auto">
                        <label>Password</label>
                        <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required />
                    </div>
                    <div className="form-group w-10/12 mx-auto">
                        <label>Secret Admin Key</label>
                        <input type="password" value={adminKey} onChange={(e) => setAdminKey(e.target.value)} required />
                    </div>
                    <button  disabled={isDisabledAdmin} className="w-2/5 mx-auto my-10 next transition-all duration-500" type="submit" >Signup</button>
                    </form>
                    <p className='form-group w-10/12 mx-auto text-l font-semibold text-center'>
                        Have an account? <Link to="/login" ><a className='underline decoration-indigo-500 decoration-2'>Login</a></Link>
                    </p> 
                </div>

        );
      case "doctor":
        return (
        <div className="">
            
            {doctorPage === 1?(
            <div className="signup-form mx-auto max-w-xl bg-cyan-400  bg-opacity-90 shadow-2xl">
            <div className='flex flex-row'>
                    <div className='mb-5 '>
                        <button
                        className="bg-white flex items-center justify-center w-10 h-10 rounded-full shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                        onClick={() => window.history.back()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-black"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        </div>
                        <h2 className='font-bold mb-5 p-0 ml-24'>Doctor Signup</h2>
                    </div>
            <form>

            <div className="form-group w-10/12 mx-auto">
                <label>Username</label>
                <input type="text" value={doctorUserName} onChange={(e) => setDoctorUserName(e.target.value)} required />
            </div>
            <div className="form-group w-10/12 mx-auto">
                <label> Work Email</label>
                <input type="email" value={doctorEmail} onChange={(e) => setDoctorEmail(e.target.value)} required />
            </div>
            <div className="form-group w-10/12 mx-auto">
                <label>Password</label>
                <input type="password" value={doctorPassword} onChange={(e) => setDoctorPassword(e.target.value)} required />
            </div>
            <button disabled={isDisabledDoctor} className="w-2/5 mx-auto my-10 next"  onClick={(e)=> setDoctorPage(2)}>Next</button>
            <p className='form-group w-10/12 mx-auto text-l font-semibold text-center'>
                        Have an account? <Link to="/login" ><a className='underline decoration-indigo-500 decoration-2'>Login</a></Link>
                    </p> 
            </form>
        </div>
            ):(
            <div className=' signup-form mx-auto max-w-4xl bg-cyan-400  bg-opacity-90 shadow-2xl'>
            <h2>Doctor Signup</h2>
            <h1 className='justify-center mx-auto text-center'>Personal Details</h1>
            <form onSubmit={handleDoctorSubmit}>
                
                <div className='grid grid-cols-2 pt-10 divide-x-2'>    
                    <div>
                            <div className="form-group w-10/12 mx-auto">
                                <label>First Name</label>
                                <input type="text" value={doctorFirstName} onChange={(e) => setDoctorFirstName(e.target.value)} required />
                            </div>
                            <div className="form-group w-10/12 mx-auto">
                                <label>Last Name</label>
                                <input type="text" value={doctorLastName} onChange={(e) => setDoctorLastName(e.target.value)} required />
                            </div>
                            <div className="form-group w-10/12 mx-auto">
                                <label>Gender</label>
                                <select value={doctorGender} onChange={handleSelectChange_doc} className="form-group w-10/12 mx-auto">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other" >Other</option>
                                </select>
                            </div>

                            <div className="w-10/12 mx-auto" >
                                <label>Date Of Birth</label>
                                <input type="date" value={doctorAge} onChange={(e) => setDoctorAge(e.target.value)} required />
                            </div>
                            
                    </div>
                    <div>
                            <div className="form-group w-10/12 mx-auto">
                                <label>Work Phone Number</label>
                                <input type="text" value={doctorPhone} onChange={(e) => setDoctorPhone(e.target.value)} required />
                            </div>
                            <div className="w-10/12 mx-auto">
                                <label>Address</label>
                                <input type="textarea" value={doctorAddress} onChange={(e) => setDoctorAddress(e.target.value)} required />
                            </div>

                            <div className="form-group w-10/12 mx-auto">
                                <label>Qualification</label>
                                <select value={doctorQual} onChange={handleQualChange_doc} className="form-group w-10/12 mx-auto">
                                    <option value="MS">MS</option>
                                    <option value="MBBS">MBBS</option>
                                    <option value="MD">MD</option>
                                    <option value="PHD" >PHD</option>
                                </select>
                            </div>
                            <div className="form-group w-10/12 mx-auto">
                                <label>Department</label>
                                <select value={doctorDept} onChange={handleDeptChange_doc} className="form-group w-10/12 mx-auto">
                                    <option value="General">General</option>
                                    <option value="Cardiology">Cardiology</option>
                                    <option value="Radiology">Radiology</option>
                                    <option value="Pathology" >Pathology</option>
                                    <option value="Nephrology">Nephrology</option>
                                    <option value="Medicine">Medicine</option>
                                    <option value="Pediatrics">Pediatrics</option>
                                    <option value="Obstetrics and gynaecology" >Obstetrics and gynaecology</option>
                                </select>
                            </div>


                            {/* alignment of the buttons is to made horizontal */}
                            
                    </div>
                
                </div>
                <div className='grid grid-cols-2'>
                    <button className="w-4/5 mx-auto my-10 next" onClick={(e)=> setDoctorPage(1)}>Previous</button>
                    <button className="w-4/5 mx-auto my-10 transition-all duration-500" type="submit">Signup</button>
                </div>
                
            
            </form>
            </div>)}
        </div>
        );
      case "patient":
        return (
    
        <div className="">
            
            {patientPage === 1?(
            <div className=' signup-form mx-auto max-w-xl bg-cyan-400  bg-opacity-90 shadow-2xl'>
            <div className='flex flex-row'>
                    <div className='mb-5 '>
                        <button
                        className="bg-white flex items-center justify-center w-10 h-10 rounded-full shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                        onClick={() => window.history.back()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-black"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        </div>
                        <h2 className='font-bold mb-5 p-0 ml-24'>Patient Signup</h2>
                    </div>
            <form>
                <h1 className='justify-center mx-auto text-center'>Login Details</h1>
                <div className="form-group w-10/12 mx-auto">
                    <label>Username</label>
                    <input type="text" value={patientUserName} onChange={(e) => setPatientUserName(e.target.value)} required />
                </div>
                <div className="form-group w-10/12 mx-auto">
                    <label>Email</label>
                    <input type="email" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} required />
                </div>
                <div className="form-group w-10/12 mx-auto">
                    <label>Password</label>
                    <input type="password" value={patientPassword} onChange={(e) => setPatientPassword(e.target.value)} required />
                </div>
            <button disabled={isDisabledPatient} className="w-2/5 mx-auto my-10 next" onClick={(e)=> setPatientPage(2)}>Next</button>
            <p className='form-group w-10/12 mx-auto text-l font-semibold text-center'>
                        Have an account? <Link to="/login" ><a className='underline decoration-indigo-500 decoration-2'>Login</a></Link>
                    </p> 
            </form>
            </div>
            ):(
            <div className=' signup-form mx-auto max-w-4xl bg-cyan-400  bg-opacity-90 shadow-2xl'>
            <h2>Patient Signup</h2>
            <h1 className='justify-center mx-auto text-center'>Personal Details</h1>
            <form onSubmit={handlePatientSubmit}>
                
                <div className='grid grid-cols-2 pt-10 divide-x-2'>    
                    <div>
                            <div className="form-group w-10/12 mx-auto">
                                <label>First Name</label>
                                <input type="text" value={patientFirstName} onChange={(e) => setPatientFirstName(e.target.value)} required />
                            </div>
                            <div className="form-group w-10/12 mx-auto">
                                <label>Last Name</label>
                                <input type="text" value={patientLastName} onChange={(e) => setPatientLastName(e.target.value)} required />
                            </div>
                            <div className="form-group w-10/12 mx-auto">
                                <label>Gender</label>
                                <select value={patientGender} onChange={handleSelectChange} className="form-group w-10/12 mx-auto">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other" >Other</option>
                                </select>
                            </div>
                    </div>
                    <div>
                            <div className="w-10/12 mx-auto" >
                                <label>Date Of Birth</label>
                                <input type="date" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} required />
                            </div>

                            <div className="form-group w-10/12 mx-auto">
                                <label>Phone</label>
                                <input type="text" value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} required />
                            </div>
                            <div className="w-10/12 mx-auto">
                                <label>Address</label>
                                <input type="textarea" value={patientAddress} onChange={(e) => setPatientAddress(e.target.value)} required />
                            </div>


                            {/* alignment of the buttons is to made horizontal */}
                            
                    </div>
                
                </div>
                <div className='grid grid-cols-2'>
                    <button className="w-4/5 mx-auto my-10 next" onClick={(e)=> setPatientPage(1)}>Previous</button>
                    <button className="w-4/5 mx-auto my-10 transition-all duration-500" type="submit">Signup</button>
                </div>
                
            
            </form>
            </div>)}
        </div>
        );
      default:
        return null;
    }
  };






  

  return (
    <div className='min-h-full'>
        <InteractiveBackground/>
    <div className="absolute top-0 left-0 z-10 w-full h-full mb-10">      
        <div className=" signup-container flex-col text-lg">
            <div className="signup-options grid-cols-3 mx-auto mb-6 mt-6">
                <button
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 px-4   focus:from-green-500 focus:to-blue-500 rounded mx-2"
                onClick={() => handleFormSelection("admin")
                }
                >
                Admin Signup
                </button>
                <button
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 px-4   focus:from-green-500 focus:to-blue-500 rounded mx-2"
                onClick={() => handleFormSelection("doctor")}
                >
                Doctor Signup
                </button>
                <button
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 px-4  focus:from-green-500 focus:to-blue-500 rounded mx-2"
                onClick={() => handleFormSelection("patient")}
                >
                Patient Signup
                </button>
            </div>
            <div>{renderLoginForm(selectedForm)}</div> 
            </div>
        </div>
    </div>
  );
};

export default Signup_page;