import React, { useState, useEffect } from "react";
import '../styles/signup.css';
import Axios from "axios";
import swal from 'sweetalert';
import {useNavigate, useLocation } from 'react-router-dom';
import Nav from './dashNav.jsx';
import gen from "../Images/general_docimg.jpg";

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

  // Function to handle prescription submission
  const handlePrescriptionSubmit = () => {
        const pres_detail = presDetails;
        pres_detail["pres"] = presdata;
        pres_detail["doc_id"] = docid;
        pres_detail["doc_name"] = docname;
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
            setPrescription({open: true, appno: appointmentId});
            
            appointments.forEach(apps=>{
                console.log(appointmentId);
                if(apps.appno === appointmentId){
                    
                    setPresDetails({appno:appointmentId,
                                    date:apps.date,
                                    time:apps.time,
                                    pid: apps.pid,
                                    pname: apps.pname});
                }
            })
    }


  return (
    <div className="bg-black min-h-full">
            <Nav></Nav>
            <div className="grid grid-cols-6 ">
                <div className="bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-cyan-500 via-purple-300 to-cyan-500 ml-6 mr-2 px-12 pt-10 my-5 rounded-xl row-span-2 col-span-2 min-h-full  overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300">
                    <div className="hidden  lg:block">
                        <img src={imageUrl} className="rounded-full h-24 w-24 md:h-48 md:w-48 mx-auto object-cover mb-10"></img>
                    </div>
                    <h2 className="text-slate-800 font-extrabold subpixel-antialiased text-lg pb-3 mx-auto text-center">Personal Information</h2>

                                <tr>
                                    <td className="text-md text-slate-800 font-bold py-1 px-1">Doctor ID:</td>
                                    <td className="text-md py-1 px-1">{userId}</td>
                                </tr>
                                <tr>
                                    <td className="text-md text-slate-800 font-bold py-1 px-1">Name:</td>
                                    <td className="text-md py-1 px-1">{docDetails.fname} {docDetails.lname}</td>
                                </tr>
                                <tr>
                                    <td className="text-md text-slate-800 font-bold py-1 px-1">Department:</td>
                                    <td className="text-md py-1 px-1">{docDetails.dept}</td>
                                </tr>
                                <tr>
                                    <td className="text-md text-slate-800 font-bold py-1 px-1">Qualification:</td>
                                    <td className="text-md py-1 px-1">{docDetails.qual}</td>
                                </tr>
                                <tr>
                                        <td className="text-lg text-slate-800 font-bold  py-1 px-1">Email:</td>
                                        <td className="text-md py-1 px-1">{docDetails.email}</td>
                                </tr>
                                <tr>
                                        <td className="text-md text-slate-800 font-bold py-1 px-1">Age:</td>
                                        <td className="text-md py-1 px-1">{docDetails.age}</td>
                                </tr>
                                <tr>
                                        <td className="text-md text-slate-800 font-bold py-1 px-1">Gender:</td>
                                        <td className="text-md py-1 px-1">{docDetails.gender}</td>
                                </tr>
                                <tr>
                                        <td className="text-md text-slate-800 font-bold py-1 px-1">Address:</td>
                                        <td className="text-md py-1 px-1">{docDetails.address}</td>
                                </tr>
                                <tr>
                                        <td className="text-md text-slate-800 font-bold py-1 px-1">Phone:</td>
                                        <td className="text-md py-1 px-1">{docDetails.phone}</td>
                                </tr>

                </div>
                <div className="bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-cyan-500 via-purple-300 to-cyan-500 px-10 py-5 mr-6 mt-5    rounded-xl col-span-4 max-h-96 overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300">
                    <h2 className="text-slate-800 font-extrabold subpixel-antialiased text-xl pb-3 mx-auto text-center">TODAY'S APPOINTMENTS</h2>
                        {!noApps &&
                            <table className="table-fixed border-collapse border-4 border-slate-900 mx-auto overflow-y-scroll">
                                <thead className="text-center min-w-full">
                                        <tr>
                                            <th className="border-4 border-slate-900 px-4 py-4 font-bold">Appointment number</th>
                                            <th className="border-4 border-slate-900 px-4 py-4 font-bold">Patient ID</th>
                                            <th className="border-4 border-slate-900 px-4 py-4 font-bold">Date</th>
                                            <th className="border-4 border-slate-900 px-4 py-4 font-bold">Time</th>
                                            <th className="border-4 border-slate-900 px-4 py-4 font-bold">Patient Name</th>
                                            <th className="border-4 border-slate-900 px-4 py-4 font-bold">Handle Appointment</th>
                                        </tr>
                                </thead>
                                <tbody className="text-center min-w-full">
                                    {appointments.map((appointment) => (
                                    <tr
                                        key={appointment.appno}
                                    >
                                        <td className="border-4 border-slate-900 px-2 py-2 font-semibold">{appointment.appno}</td>
                                        <td className="border-4 border-slate-900 px-2 py-2 font-semibold">{appointment.pid}</td>
                                        <td className="border-4 border-slate-900 px-2 py-2 font-semibold">{appointment.date}</td>
                                        <td className="border-4 border-slate-900 px-2 py-2 font-semibold">{appointment.time}</td>
                                        <td className="border-4 border-slate-900 px-2 py-2 font-semibold">{appointment.pname}</td>
                                        <td className="border-4 border-slate-900 px-2 py-1 font-semibold">
                                            <button type="button" onClick={() => handleAppointmentClick(appointment.appno)}  className="text-black hover:text-white border border-black hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:border-black dark:text-black dark:hover:border-green-600 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">HANDLE</button>
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
                        <div className="bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-cyan-500 via-purple-300 to-cyan-500 px-10 py-5 mr-6 mt-5 min-h-full rounded-xl col-span-4 max-h-96 overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300">
                                <h2 className="text-slate-800 font-extrabold subpixel-antialiased text-2xl pb-3 mx-auto text-center">Prescription</h2>
                                <div className="grid grid-cols-2">
                                    <div className="">
                                        <p className="text-lg text-slate-800 font-bold py-2 px-1">
                                            Patient Name: <strong>{presDetails.pname}</strong>
                                        </p>
                                        <p className="text-lg text-slate-800 font-bold py-2 px-1">
                                            Date: <strong>{presDetails.date}</strong>
                                        </p>
                                        <p className="text-lg text-slate-800 font-bold py-2 px-1">
                                            Time: <strong>{presDetails.time}</strong>
                                        </p>
                                    </div>
                                    <div>
                                        <label for="message" class="block mb-2 text-lg font-medium text-gray-900">Medication</label>
                                        <textarea id="message" rows="4"  onChange={(e) => setPresData(e.target.value)} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your prescription..."></textarea>
                                    </div>

                                    <div className="col-span-2 flex justify-center mt-10">
                                        <button onClick={handlePrescriptionSubmit}  type="button" class=" text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center center">SUBMIT</button>
                                    </div>
                                </div>
                                
                        </div>
                    )}
            </div>
    </div>
  );
};

export default DoctorDashboard;