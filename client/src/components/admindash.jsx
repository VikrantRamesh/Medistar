import React, { useState, useEffect } from "react";
import '../styles/signup.css';
import Axios from "axios";
import swal from 'sweetalert';
import {useNavigate, useLocation } from 'react-router-dom';
import Nav from './dashNav.jsx'; 
import classNames from "classnames";
import { Bar, Pie, Line, Doughnut, Gauge} from 'react-chartjs-2';
import Chart from "chart.js/auto";
import GenderGaugeChart from "./Admin_components/GaugeChart.jsx";
import WavyChart from "./Admin_components/wavyChart.jsx";
import DoctorsList from "./Admin_components/DoctorPanel.jsx"
import StatisticBox from './Admin_components/staticBox'
import DoughnutChart from "./Admin_components/DoughnutChart";
import LineChart from "./Admin_components/LineChart";
import BarGraph from "./Admin_components/bargraph";

const AdminDashboard = () => {
  const [adminid, SetAdminid] = useState("");
  const [adminDetails, SetAdminDetails] = useState({
                                                user_name: "",
                                                email: "" 
                                                });
  const [userId, setUserId] = useState("");
  const[theme, setTheme] = useState(localStorage.theme);
  const[webStats, setWebStats] = useState({
                                    doctors:0,
                                    admins:0,
                                    patients:0,
                                    total:0,
                                });
  const[dept_app, setDept_app] = useState(null);
  const[time_app, setTime_app] = useState(null);
  const[genderRatio, setGenderRatio] = useState(null);
  const[ageData, setAgeData] = useState(null);
  const[topDocs,setTopDocs] = useState(null);
  const[disease_data,setDisease_data] = useState(null);

  //const [appointmentData, setAppointmentData] = useState({});




  const handleDarkModeChange = (darkMode) => {
    setTheme(darkMode);
  };


  const navigate = useNavigate();

  useEffect(() => {
    //user Authentication
    Axios.get('http://localhost:5000/protected', { withCredentials: true }).then((response)=>{
            setUserId(response.data.id);
            if(response.data.class !== 'admin'){
                swal({
                    title:"Only Admins are allowed!",
                    icon: "warning",
                });
                navigate('/login');
            }else{
            const userId_detail = {userId: response.data.id}
            console.log(userId_detail);
            Axios.post('http://localhost:5000/get_admin_id', userId_detail).then((response2)=>{
                    SetAdminid(response2.data.admin_id);    
                    set_admin_details(response.data.id);
            });

            }
        }).catch(error => {
            console.log(error);
            navigate('/login');
        });
    
    //Get Website Stats
    Axios.post('http://localhost:5000/get_website_stats').then((response)=>{
           setWebStats(response.data);
    });  
    
    //Get department data of appointments
    Axios.post('http://localhost:5000/dept_appointment_data').then((response)=>{
          setDept_app(response.data);
    });  
    
    //Get time data of appointments
    Axios.post('http://localhost:5000/time_appointment_data').then((response)=>{
          setTime_app(response.data);
    });  

    //Get gender data of patients
    Axios.post('http://localhost:5000/gender_data').then((response)=>{
          setGenderRatio({"Male":response.data.Male/response.data.total,
                       "Female":response.data.Female/response.data.total,
                       "Other":response.data.Other/response.data.total});
    });  

    //Get age data of patients
    Axios.post('http://localhost:5000/age_data').then((response)=>{
          setAgeData(response.data);
    });  

    //Get age data of patients
    Axios.post('http://localhost:5000/top_docs').then((response)=>{
        setTopDocs(response.data.doctors); 
    });  
    //Get age data of Diseases
    Axios.post('http://localhost:5000/top_diseases').then((response)=>{
        setDisease_data(response.data.diseases);        
    });  

  }, []);
                                           
                                        


  




    

    const set_admin_details = (user_id) =>{
        const userId_detail = {user_id: user_id};
        Axios.post('http://localhost:5000/get_admin_details', userId_detail).then((response)=>{   
                SetAdminDetails(response.data);
        });
    }

    const canvasClass = classNames(
        "rounded-full",
        "py-2",
        "px-4",
        "text-white",
    );


  return (
    <div className="dark:bg-slate-900 bg-slate-300 transition-all h-min-screen duration-500 pb-5">
            <Nav onDarkModeChange={handleDarkModeChange} ></Nav>

            <div className="grid lg:grid-cols-6 gap-2 transition-all duration-1000 mx-2">
                <div  className={`bg-slate-50 shadow-xl lg:dark:bg-slate-700 ml-2 px-12 pt-6 rounded-lg col-span-2 overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 transition-all duration-1000`}>
                    
                    <h2 className="text-slate-800 dark:text-white font-extrabold subpixel-antialiased text-lg pb-3 mx-auto text-center  transition-all duration-1000">Admin Details</h2>
                        <div className="px-auto">
                                <tr>
                                    <td className="text-md text-slate-800 dark:text-white font-semibold py-1 px-1">User ID:</td>
                                    <td className="text-md dark:text-slate-400 text-slate-500 font-bold py-1 px-4">{userId}</td>
                                </tr>
                                <tr>
                                    <td className="text-md text-slate-800 dark:text-white font-semibold py-1 px-1">Admin ID:</td>
                                    <td className="text-md  dark:text-slate-400 text-slate-500 font-bold py-1 px-4">{adminid}</td>
                                </tr>
                                <tr>
                                    <td className="text-md text-slate-800 dark:text-white font-semibold py-1 px-1">User Name:</td>
                                    <td className="text-md dark:text-slate-400 text-slate-500 font-bold py-1 px-4">{adminDetails.user_name}</td>
                                </tr>
                                <tr>
                                    <td className="text-md text-slate-800 dark:text-white font-semibold py-1 px-1">Email:</td>
                                    <td className="text-md dark:text-slate-400 text-slate-500 font-bold py-1 px-4">{adminDetails.email}</td>
                                </tr>
                        </div>
                </div>
                <div className={`bg-slate-50 shadow-xl px-10 py-5 mr-2 lg:dark:bg-slate-700   rounded-lg col-span-4 max-h-96 overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 transition-all duration-1000`}>
                    <h2 className="text-slate-800 font-extrabold subpixel-antialiased text-xl pb-3 mx-auto text-center dark:text-white">WEBSITE'S STATISTICS</h2>
                    <div className="flex flex-row justify-center">
                        <StatisticBox title="Users" number={webStats.total} />
                        <StatisticBox title="Patients" number={webStats.patients} />
                        <StatisticBox title="Doctors" number={webStats.doctors} />
                        <StatisticBox title="Admins" number={webStats.admins} />    
                    </div>
                </div>
                <div className = {`bg-slate-50 shadow-xl ml-2 pt-6 min-h-full  rounded-lg col-span-4  overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 dark:bg-slate-700 transition-all duration-1000`} >
                    <h2 className="text-slate-800 font-extrabold subpixel-antialiased text-xl pb-3 mx-auto text-center  dark:text-white">TODAY'S APPOINTMENTS</h2>
                    <div className="grid grid-cols-2" id = 'mychart'>
                        <div className="  mx-auto py-5">
                                {dept_app ? (
                                    <DoughnutChart data={dept_app} theme={theme}/>
                                ):(
                                    
                                    // Show loading message until data arrives
                                    <p>Loading data...</p>
                                )}
                        </div>
                        <div  className="h-72 w-11/12 mx-auto py-5">
                                {time_app ? (    
                                    <LineChart Linedata = {time_app} theme={theme}/>
                                ):(
                                
                                    // Show loading message until data arrives
                                    <p>Loading data...</p>
                                )}
                        </div>
                    </div>
                </div>

                <div className = {`bg-slate-50 shadow-xl  mr-2 pt-6 px-2  row-span-2 rounded-lg col-span-2 overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 dark:bg-slate-700 transition-all duration-1000`}>
                    <h2 className="text-slate-800 font-extrabold subpixel-antialiased text-xl pb-1 mx-auto text-center dark:text-white">PATIENT STATISTICS</h2>
                        {genderRatio ? (    
                                    <GenderGaugeChart
                                    malePercent={genderRatio.Male}
                                    femalePercent={genderRatio.Female}
                                    otherPercent={genderRatio.Other}
                                    theme={theme}
                                />
                        ):(
                                // Show loading message until data arrives
                                <p>Loading data...</p>
                        )}

                        {ageData ? (    
                                    <WavyChart ageData = {ageData} theme={theme}/>
                        ):(
                                // Show loading message until data arrives
                                <p>Loading data...</p>
                        )}
                        
                </div>
                <div className = {`bg-slate-50 shadow-xl  ml-2 pt-4 px-2  rounded-lg col-span-4 row-span-2 overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 dark:bg-slate-700 transition-all duration-1000`}>
                    <h2 className="text-slate-800 font-extrabold subpixel-antialiased text-xl mx-auto text-center dark:text-white">TODAY'S BEST DOCTORS</h2>
                    {topDocs?(
                        <div className="grid grid-cols-3">
                            {topDocs.map(doctor => (
                                <DoctorsList data={doctor}/>
                            ))}
                        </div>
                    ):(
                        // Show loading message until data arrives
                        <p>Loading data...</p>
                    )}
                </div>
                <div className = {`bg-slate-50 shadow-xl  mr-2 pt-6 px-2 min-h-full  rounded-lg col-span-2 row-span-1 overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 dark:bg-slate-700 transition-all duration-1000`}>
                    <h2 className="text-slate-800 font-extrabold subpixel-antialiased text-xl pb-1 mx-auto text-center dark:text-white">DISEASE STATISTICS</h2>
                    {disease_data?(    
                        <BarGraph disease_data = {disease_data} theme={theme}/>
                    ):(
                        // Show loading message until data arrives
                        <p>Loading data...</p>
                    )}

                </div>


            </div>
    </div>
  );
};

export default AdminDashboard;