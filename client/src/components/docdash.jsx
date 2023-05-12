import React, { useState, useEffect } from "react";
import '../styles/signup.css';
import Axios from "axios";
import swal from 'sweetalert';
import {useNavigate, useLocation } from 'react-router-dom';
import Nav from './dashNav.jsx';
import gen from "../Images/general_docimg.jpg";
import Select from 'react-select';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [prescription, setPrescription] = useState({open: false,
                                                    appno: 0});
  const [presDetails, setPresDetails] = useState({appno:0,
                                                  date:"",
                                                  time:"",
                                                  pid: "",
                                                  pname: ""});
  const [presdata, setPresData] = useState('');
  const [docid, SetDocid] = useState("");
  const [docname, SetDocname] = useState("");
  const [userId, setUserId] = useState("");
  const [docDetails, setDocDetails] = useState({fname:"",
                                                lname:"",
                                                email:"",
                                                age:"",
                                                gender:"",
                                                address:"",
                                                phone: "",
                                                dept: "",
                                                qual: ""});
    const [imageUrl, setImageUrl] = useState('');
    const [resetTable, setResetTable] = useState('');
    const [noApps, setNoApps] = useState(false);
    const[theme, setTheme] = useState(localStorage.theme);
    const [isOther, setIsOther] = useState(false);
    const [selectedDisease, setSelectedDisease] = useState(null);
    const [isValueSelected, setIsValueSelected] = useState(false);
    const [isValueSelected2, setIsValueSelected2] = useState(false);

  // Function to handle prescription submission
  const handlePrescriptionSubmit = () => {

        if(isValueSelected && isValueSelected2){
            const pres_detail = presDetails;
            pres_detail["pres"] = presdata;
            pres_detail["doc_id"] = docid;
            pres_detail["doc_name"] = docname;
            pres_detail["disease"] = selectedDisease.value;
            Axios.post('http://localhost:5000/insert_prescription', pres_detail).then((response)=>{
                swal({
                    title:"Prescription Updated!",
                    icon: "success",
                });
                setResetTable(true);
            });
            console.log(prescription);
            setPrescription({open: false,
                            appno: pres_detail.appno});
        }else{
            console.log(isValueSelected, isValueSelected2);
            swal({
                title:"Please fill in the Details!",
                icon: "warning",
            });
        }

            
  };

  const navigate = useNavigate();

  useEffect(() => {

    Axios.get('http://localhost:5000/protected', { withCredentials: true }).then((response)=>{
            setUserId(response.data.id);
            if(response.data.class !== 'doctor'){
                swal({
                    title:"Only Doctors are allowed!",
                    icon: "warning",    
                });
                navigate('/');
            }else{
            const userId_detail = {userId: response.data.id}
            console.log(userId_detail);
            Axios.post('http://localhost:5000/get_doctor_id', userId_detail).then((response)=>{
                    //console.log(response.data.d_fname,response.data.doc_id);
                    SetDocid(response.data.doc_id);    
                    SetDocname(response.data.d_fname);
                    set_doc_details(response.data.doc_id);
                    get_appointments(response.data.doc_id);
            });

            }
        }).catch(error => {
            console.log(error);
            navigate('/login');
        });

    }, []);
    

    useEffect(() => {
        get_appointments(docid);
    }, [resetTable]);

    const set_doc_details = (docid) =>{
        const userId_detail = {doc_id: docid};
        Axios.post('http://localhost:5000/get_doc_details', userId_detail).then((response)=>{   
                    setDocDetails(response.data);
        });


        const id_data = {user_id: docid};
            Axios.post('http://localhost:5000/get_images', id_data, { responseType: 'blob' }).then((response) => {
                if(response.data.size){
                    setImageUrl(URL.createObjectURL(response.data));
                }else{
                    setImageUrl(gen);
                }
        });
    }

    const get_appointments = (docid) =>{
        const id_data = {doc_id: docid};
        Axios.post('http://localhost:5000/get_appointments', id_data).then((response) => {
            // console.log(response.data.appointments);
            if(response.data.appointments.length === 0){
                setNoApps(true);
            }else{
                setNoApps(false);
            }
            setAppointments(response.data.appointments);
        });
    }

    const handleAppointmentClick = (appointmentId) =>{
            if(prescription.open == true && prescription.appno == appointmentId){
                setPrescription({open: false, appno: appointmentId});
            }else{
                setPrescription({open: true, appno: appointmentId});
            }
            appointments.forEach(apps=>{
                if(apps.appno === appointmentId){
                    
                    setPresDetails({appno:appointmentId,
                                    date:apps.date,
                                    time:apps.time,
                                    pid: apps.pid,
                                    pname: apps.pname});
                }
            })
    }

    const handleDarkModeChange = (darkMode) => {
        setTheme(darkMode);
    };


    const diseaseOptions = [
        { value: 'Flu', label: 'Flu' },
        { value: 'Common cold', label: 'Common cold' },
        { value: 'Malaria', label: 'Malaria' },
        { value: 'Cholera', label: 'Cholera' },
        { value: 'Food poisoning', label: 'Food poisoning' },
        { value: 'Dengue fever', label: 'Dengue fever' },
        { value: 'Zika virus', label: 'Zika virus' },
        { value: 'HIV/AIDS', label: 'HIV/AIDS' },
        { value: 'Hepatitis B', label: 'Hepatitis B' },
        { value: 'Hepatitis C', label: 'Hepatitis C' },
        { value: 'Tuberculosis', label: 'Tuberculosis' },
        { value: 'Measles', label: 'Measles' },
        { value: 'Rubella', label: 'Rubella' },
        { value: 'Mumps', label: 'Mumps' },
        { value: 'Pneumonia', label: 'Pneumonia' },
        { value: 'Bronchitis', label: 'Bronchitis' },
        { value: 'Asthma', label: 'Asthma' },
        { value: 'Cancer', label: 'Cancer' },
        { value: 'Diabetes', label: 'Diabetes' },
        { value: 'Hypertension', label: 'Hypertension' },
      ];

      const handleInputChange = (newValue) => {
        console.log(newValue);
        setSelectedDisease(newValue);
      };
    
      const handleCheckboxChange = (event) => {
        setIsOther(event.target.checked);
      };
    

  return (
    <div className="bg-slate-300 dark:bg-slate-900 min-h-full">
                <Nav onDarkModeChange={handleDarkModeChange} ></Nav>
                <div className="grid grid-cols-6 gap-4">
                    <div className={`bg-slate-50 shadow-xl dark:bg-slate-700 ml-6 mr-6 lg:mr-0 px-12 py-10 rounded-xl row-span-3 col-span-6 lg:col-span-2 min-h-full  overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 transition-all duration-1000`}>
                        <div className="hidden  lg:block">
                            <img src={imageUrl} className="rounded-full shadow-2xl h-24 w-24 md:h-48 md:w-48 mx-auto object-cover mb-10"></img>
                        </div>
                        <h2 className="text-slate-800 dark:text-white transition-all duration-1000 font-extrabold subpixel-antialiased text-lg pb-3 mx-auto text-center ">Personal Information</h2>

                                    <tr>
                                        <td className="text-md text-slate-800 dark:text-white font-bold py-1 px-1 transition-all duration-1000">Doctor ID:</td>
                                        <td className="text-md font-bold dark:text-slate-400 text-slate-500 py-1 px-2 transition-all duration-1000">{userId}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-md text-slate-800 dark:text-white font-bold py-1 px-1 transition-all duration-1000">Name:</td>
                                        <td className="text-md font-bold dark:text-slate-400 text-slate-500 py-1 px-2 transition-all duration-1000" >{docDetails.fname} {docDetails.lname}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-md text-slate-800 dark:text-white font-bold py-1 px-1 transition-all duration-1000">Department:</td>
                                        <td className="text-md font-bold dark:text-slate-400 text-slate-500 py-1 px-2 transition-all duration-1000">{docDetails.dept}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-md text-slate-800 dark:text-white font-bold py-1 px-1 transition-all duration-1000">Qualification:</td>
                                        <td className="text-md font-bold dark:text-slate-400 text-slate-500 py-1 px-2 transition-all duration-1000">{docDetails.qual}</td>
                                    </tr>
                                    <tr>
                                            <td className="text-lg text-slate-800 dark:text-white font-bold  py-1 px-1 transition-all duration-1000">Email:</td>
                                            <td className="text-md font-bold dark:text-slate-400 text-slate-500 py-1 px-2 transition-all duration-1000">{docDetails.email}</td>
                                    </tr>
                                    <tr>
                                            <td className="text-md text-slate-800 dark:text-white font-bold py-1 px-1 transition-all duration-1000">Age:</td>
                                            <td className="text-md font-bold dark:text-slate-400 text-slate-500 py-1 px-2 transition-all duration-1000">{docDetails.age}</td>
                                    </tr>
                                    <tr>
                                            <td className="text-md text-slate-800 dark:text-white font-bold py-1 px-1 transition-all duration-1000">Gender:</td>
                                            <td className="text-md font-bold  py-1 px-2 dark:text-slate-400 text-slate-500 transition-all duration-1000">{docDetails.gender}</td>
                                    </tr>
                                    <tr>
                                            <td className="text-md  text-slate-800 dark:text-white transition-all duration-1000 font-bold py-1 px-1 ">Address:</td>
                                            <td className="text-md font-bold dark:text-slate-400 text-slate-500 py-1 px-2 transition-all duration-1000">{docDetails.address}</td>
                                    </tr>
                                    <tr>
                                            <td className="text-md  text-slate-800 dark:text-white font-bold py-1 px-1 transition-all duration-1000">Phone:</td>
                                            <td className="text-md font-bold dark:text-slate-400 text-slate-500 py-1 px-2 transition-all duration-1000">{docDetails.phone}</td>
                                    </tr>

                    </div>
                    <div className={`bg-slate-50 shadow-xl dark:bg-slate-700 px-10 py-5 mr-6 ml-6 lg:ml-0 rounded-xl col-span-6 lg:col-span-4 max-h-96 overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 transition-all duration-1000`}>
                        <h2 className="font-extrabold subpixel-antialiased text-xl pb-3 mx-auto text-center text-slate-800 dark:text-white transition-all duration-1000">TODAY'S APPOINTMENTS</h2>
                            {!noApps &&
                                <table className="table-fixed border-collapse border-4 border-slate-900 mx-auto overflow-y-scroll">
                                    <thead className="text-center min-w-full">
                                            <tr>
                                                <th className="border-4 border-slate-900 px-4 py-4 font-bold  text-slate-800 dark:text-white transition-all duration-1000">Appointment number</th>
                                                <th className="border-4 border-slate-900 px-4 py-4 font-bold  text-slate-800 dark:text-white transition-all duration-1000">Patient ID</th>
                                                <th className="border-4 border-slate-900 px-4 py-4 font-bold  text-slate-800 dark:text-white transition-all duration-1000">Date</th>
                                                <th className="border-4 border-slate-900 px-4 py-4 font-bold  text-slate-800 dark:text-white transition-all duration-1000">Time</th>
                                                <th className="border-4 border-slate-900 px-4 py-4 font-bold  text-slate-800 dark:text-white transition-all duration-1000">Patient Name</th>
                                                <th className="border-4 border-slate-900 px-4 py-4 font-bold  text-slate-800 dark:text-white transition-all duration-1000">Handle Appointment</th>
                                            </tr>
                                    </thead>
                                    <tbody className="text-center min-w-full">
                                        {appointments.map((appointment) => (
                                        <tr
                                            key={appointment.appno}
                                        >
                                            <td className="border-4 border-slate-900 px-2 py-2 font-semibold  dark:text-slate-400 text-slate-700 transition-all duration-1000">{appointment.appno}</td>
                                            <td className="border-4 border-slate-900 px-2 py-2 font-semibold  dark:text-slate-400 text-slate-700 transition-all duration-1000">{appointment.pid}</td>
                                            <td className="border-4 border-slate-900 px-2 py-2 font-semibold  dark:text-slate-400 text-slate-700 transition-all duration-1000">{appointment.date}</td>
                                            <td className="border-4 border-slate-900 px-2 py-2 font-semibold  dark:text-slate-400 text-slate-700 transition-all duration-1000">{appointment.time}</td>
                                            <td className="border-4 border-slate-900 px-2 py-2 font-semibold  dark:text-slate-400 text-slate-700 transition-all duration-1000">{appointment.pname}</td>
                                            <td className="border-4 border-slate-900 px-2 py-1 font-semibold  dark:text-slate-400 text-slate-700 transition-all duration-1000">
                                                <button type="button" onClick={() => handleAppointmentClick(appointment.appno)}  className="text-slate-700 hover:text-white border border-black hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:border-slate-400 dark:text-slate-400 dark:hover:border-green-600 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">HANDLE</button>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>

                            }
                            {noApps && 
                                <h2 className="text-slate-800 font-bold   subpixel-antialiased text-4xl pb-3 mx-auto text-center pt-10">You are done for the Day!</h2>
                            }
                    </div>
                        {prescription.open && (
                            <div className={`bg-slate-50 shadow-xl dark:bg-slate-700 px-10 py-5 mr-6 ml-6 lg:ml-0 min-h-full rounded-xl col-span-6 lg:col-span-4 row-span-2 max-h-96 overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 transition-all duration-1000`}>
                                    <h2 className="text-slate-800 font-extrabold subpixel-antialiased text-2xl pb-3 mx-auto text-center dark:text-white transition-all duration-1000">Prescription</h2>
                                    <div className="grid grid-cols-5">
                                        <div className="col-span-2">
                                            <p className="text-lg  font-bold py-2 px-0  dark:text-slate-400 text-slate-700 transition-all duration-1000 grid grid-cols-2"> 
                                                <div>
                                                    Patient Name: 
                                                </div>
                                                <div>
                                                    <strong>{presDetails.pname}</strong>
                                                </div>
                                            </p>
                                            <p className="text-lg  font-bold py-2 px-0  dark:text-slate-400 text-slate-700 transition-all duration-1000 grid grid-cols-2">
                                                Patient Id: <strong>{presDetails.pid}</strong>
                                            </p>
                                            <p className="text-lg font-bold py-2 px-0  dark:text-slate-400 text-slate-700 transition-all duration-1000 grid grid-cols-2">
                                                Date: <strong>{presDetails.date}</strong>
                                            </p>
                                            <p className="text-lg font-bold py-2 px-0  dark:text-slate-400 text-slate-700 transition-all duration-1000 grid grid-cols-2">
                                                Time: <strong>{presDetails.time}</strong>
                                            </p>
                                        </div>
                                        <div className="col-span-3">
                                           
                                            <textarea id="message" rows="4"  onChange={(value) => {setPresData(value.target.value)
                                                                                                     setIsValueSelected2(true); }}
                                                                                                    required={isValueSelected2} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-1000" placeholder="Write your prescription..." />

                                            
                                            <div className="grid grid-cols-4 mt-5">
                                                    <div className=" col-span-3">
                                                        {!isOther && (
                                                            <div >
                                                                <Select
                                                                    menuPlacement ="bottom"
                                                                    options={diseaseOptions}
                                                                    value={selectedDisease}
                                                                    placeholder="Disease"
                                                                    className={`bg-white dark:bg-slate-400 text-slate-700 dark:text-slate-400 rounded-md p-1 mx-10 transition-all duration-1000`}
                                                                    onChange={(value) => {
                                                                        handleInputChange(value);
                                                                        setIsValueSelected(true);
                                                                    }}
                                                                    required={isValueSelected}
                                                                />
                                                                </div>
                                                        )}
                                                        {isOther && (
                                                            <div className="w-9/12 dark:text-slate-700">
                                                                <input
                                                                type="text"
                                                                placeholder="Disease"
                                                                className={`bg-white dark:bg-slate-200 p-2 rounded-md border-2  border-gray-300 mx-10 w-1/2 !important`}
                                                                value={selectedDisease?.value || ''}
                                                                onChange={(event) =>{
                                                                    setSelectedDisease({ value: event.target.value, label: event.target.value })
                                                                    setIsValueSelected(true);
                                                                }}
                                                                required={isValueSelected}
                                                                />
                                                            </div>

                                                        )}
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <label htmlFor="other-checkbox" className="text-lg font-bold  dark:text-slate-400 text-slate-700 transition-all duration-1000">
                                                        Others
                                                        </label>
                                                        <input
                                                        id="other-checkbox"
                                                        type="checkbox"
                                                        checked={isOther}
                                                        onChange={handleCheckboxChange}
                                                        className="form-checkbox h-5 w-5 text-gray-600 focus:outline-none focus:ring-1 focus:ring-slate-600"
                                                        />
                                                    </div>
                                            </div>
                                            
                                        </div>

                                        <div className="col-span-5 flex justify-center mt-10">
                                            <button onClick={handlePrescriptionSubmit}  type="button" class="w-40 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center center">SUBMIT</button>
                                        </div>
                                    </div>
                                    
                            </div>
                        )}
                </div>
    </div>
  );
};

export default DoctorDashboard;