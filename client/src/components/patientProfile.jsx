import React, { useState, useEffect } from 'react'
import gen from "../Images/general_docimg.jpg";
import nurse from "../Images/Nurse-img.png";
import Nav from './patient_components/patNav.jsx';
import Axios from 'axios';
import swal from 'sweetalert';
import {useNavigate, useLocation } from 'react-router-dom';
import '../styles/signup.css';
import { jsPDF } from 'jspdf';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css';
import HealthGraph from "./patient_components/patGraph";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDownload}  from '@fortawesome/free-solid-svg-icons';


const currentDate = new Date().toISOString().slice(0, 10);
const Profile = () => {

  const navigate = useNavigate();
  const[theme, setTheme] = useState(localStorage.theme);

  const [imageUrl, setImageUrl] = useState('');
  const [selectedDate, setSelectedDate] = useState(currentDate);
  
  const [userId, setUserId] = useState("");


  const [pat_details, setPat_details] = useState({
                        pid:  0,
                        fname: "",
                        pname: "",
                        gender: "",
                        dob: "",
                        age: 0,
                        address: "",
                        phone: "",
                      });

  const [fapp_details,setFapp_details]= useState([{
                      appid: 0,
                      docid: 0,
                      name:"",
                      date:"",
                      time:"",
                      dept:"",
                    }]);

  const [past_appointment_details,setPast_appointment_details]=useState([{
                      date: "",
                      name:"",
                      disease:"",
                      prescription:"",                            
                    }]);

  const [filteredFapp_details, setFilteredFapp_details] = useState([{
                      appid: 0,
                      docid: 0,
                      name:"",
                      date:"",
                      time:"",
                      dept:"",
                    }]);

  const [filteredPast_appointment_details, setFilteredPast_appointment_details] = useState([{
                    date: "",
                    name:"",
                    disease:"",
                    prescription:"",                            
                  }]);;

  useEffect(()=>{
        Axios.get('http://localhost:5000/protected', { withCredentials: true }).then((response)=>{
                setUserId(response.data.id);
                if(response.data.class !== 'patient'){
                    swal({
                        title:"Only Patients are allowed!",
                        icon: "warning",    
                    });
                    navigate('/');
                }else{
                    const pat_userid_detail = {user_id:response.data.id};
                    
                    Axios.post('http://localhost:5000/get_patient_details', pat_userid_detail).then((response)=>{
                        setPat_details(response.data);
                        const pat_pid_detail = {user_id:response.data.pid};
                        Axios.post('http://localhost:5000/get_patient_appointment', pat_userid_detail).then((response)=>{
                            setFapp_details(response.data.appoinment_details);

                             // Sort the dictionary based on the "date" and "time" attributes
                             let sortedDictionary = response.data.appoinment_details;
                             sortedDictionary = sortedDictionary.sort((a, b) => {
                                 const dateA = new Date(a.date + ' ' + a.time);
                                 const dateB = new Date(b.date + ' ' + b.time);
                                 return dateA - dateB;
                             });

                             setFapp_details(sortedDictionary);

                             setFilteredFapp_details(sortedDictionary);

                            Axios.post('http://localhost:5000/get_past_appointment', pat_userid_detail).then((response)=>{
                                setPast_appointment_details(response.data.past_appoinment_details);
                                setFilteredPast_appointment_details(response.data.past_appoinment_details);
                                Axios.post('http://localhost:5000/get_images', pat_pid_detail, { responseType: 'blob' }).then((response) => {
                                    if(response.data.size){
                                        setImageUrl(URL.createObjectURL(response.data));
                                    }else{
                                        setImageUrl(gen);
                                    }
                                });
                            });
                        });
                      });
                    
                }
        }).catch(error => {
            console.log(error);
            navigate('/login');
        });
  },[]);

  const handleDarkModeChange = (darkMode) => {
    setTheme(darkMode);
    if (darkMode == 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const handleDateClick = (date) => {

        const tomorrow = new Date(date);
        tomorrow.setDate(tomorrow.getDate() + 1);
        setSelectedDate(tomorrow.toISOString().slice(0,10));

        let filteredDictionary = fapp_details;
        filteredDictionary = filteredDictionary.filter(
            (item) => item.date === tomorrow.toISOString().slice(0,10)
        );

        
        setFilteredFapp_details(filteredDictionary);

        const today = new Date(date);

        filteredDictionary = past_appointment_details;
        filteredDictionary = filteredDictionary.filter(
            (item) =>  item.date.slice(0,10) === today.toISOString().slice(0,10)
        );
        
        setFilteredPast_appointment_details(filteredDictionary);
        // update the appointment data based on the selected date
        // setAppointmentData(updatedData);
  };

    // Reset the filter
    const resetFilter = () => {
      const currentDate = new Date().toISOString().slice(0, 10);
      setFilteredFapp_details(fapp_details);
      setFilteredPast_appointment_details(past_appointment_details);
      setSelectedDate(currentDate);
    };

  function convertDateFormat(dateString) {
    const parts = dateString.split('-');
    if (parts.length !== 3) {
      // Invalid date format
      return null;
    }
  
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
  
    return `${day}-${month}-${year}`;
  };
  function convertDateFormat2(dateString) {
      const parts = dateString.split('-');
      if (parts.length !== 3) {
        // Invalid date format
        return null;
      }
    
      const year = parts[0];
      const month = parts[1];
      let day = parseInt(parts[2])+1;
      day = day.toString();
      day = ("0"+day).slice(-2);
    
      return `${day}-${month}-${year}`;
  }

  const handleDownloadPDF = (text, date, dr) => {
      const doc = new jsPDF();

      const colors = ['#FF0000', '#00FF00', '#0000FF'];
      let currentColorIndex = 0;

        doc.setFontSize(32);
        doc.setFont('extrabold');

        doc.text('MEDISTAR', 80, 10);
        doc.text('____________________________________________________________________________________________________', 0, 10);

        doc.setFont('helvetica', 'normal');

        doc.setFontSize(16);
        doc.setFont('bold');

        doc.text('DOCTOR:', 10, 40);

        doc.setFontSize(16);
        doc.setFont('normal');

        doc.text(dr, 60, 40);


        doc.setFont('helvetica', 'normal');

        doc.setFontSize(16);
        doc.setFont('bold');

        doc.text('PATIENT:', 10, 50);

        doc.setFontSize(16);
        doc.setFont('normal');

        doc.text(pat_details.fname+" "+pat_details.lname, 60, 50);


        doc.setFontSize(16);
        doc.setFont('bold');

        doc.text('DATE:', 10, 60);

        doc.setFontSize(16);
        doc.setFont('normal');

        doc.text(date.slice(0,10), 60, 60);

        doc.setFontSize(16);
        doc.setFont('bold');

        doc.text('PRESCRIPTION:', 10, 70);

        doc.setFontSize(16);
        doc.setFont('normal');

        doc.text(text, 60, 70);
        
        //text = "" + dr + " DATE:" + date.slice(0,10) + "  " + "PRESCRIPTION: " + text;
        //text = text.replace(/ /g, '\n');

        //doc.text(text, 10, 10);
        const prescription_name = dr+"-"+date.slice(0,10)+".pdf";
        doc.save(prescription_name);
  };


  return (
    <div className=" min-h-full bg-slate-200 dark:bg-slate-800 transition-all duration-1000">
      <Nav onDarkModeChange={handleDarkModeChange} ></Nav>
        <div className='grid grid-cols-4 gap-4 mb-8 mx-5 transition-all duration-1000'>
        <div className="bg-slate-50 shadow-2xl px-8 pt-7  rounded-xl row-span-3 lg:col-span-1 col-span-2 min-h-full  overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300  dark:bg-slate-600 transition-all duration-1000">
                    <div >
                        <img src={imageUrl} className="rounded-full h-56 w-56 md:h-100 md:w-100 mx-auto object-cover mb-8" alt='profile'></img>
                    </div>
                    <h2 className=" text-sky-700 subpixel-antialiased mx-auto dark:text-sky-400 text-center text-xl pb-8 uppercase font-bold transition-all duration-1000">Personal Information</h2>

                                <tr>
                                    <td className="text-md text-slate-800 dark:text-slate-50 font-bold  py-1 px-1 text-left w-2/5 transition-all duration-1000">USER ID:</td>
                                    <td className="text-md py-1 px-1 text-left w-3/5 dark:text-slate-400 transition-all duration-1000">{userId}</td>
                                </tr>

                                <tr>
                                    <td className="text-md text-slate-800 dark:text-slate-50 font-bold py-1 px-1 text-left w-2/5 transition-all duration-1000">PATIENT ID:</td>
                                    <td className="text-md py-1 px-1 text-left w-3/5 transition-all dark:text-slate-400 duration-1000">{pat_details.pid}</td>
                                </tr>

                                <tr>
                                    <td className="text-md text-slate-800 dark:text-slate-50 font-bold py-1 px-1 text-left w-2/5 transition-all duration-1000">NAME:</td>
                                    <td className="text-md py-1 px-1 text-left w-3/5 transition-all dark:text-slate-400 duration-1000">{pat_details.fname} {pat_details.lname}</td>
                                </tr>

                                <tr>
                                    <td className="text-md text-slate-800 dark:text-slate-50 font-bold py-1 px-1 text-left w-2/5 transition-all duration-1000">GENDER:</td>
                                    <td className="text-md py-1 px-1 text-left transition-all duration-1000 dark:text-slate-400 w-3/5 ">{pat_details.gender}</td>
                                </tr>

                                <tr>
                                    <td className="text-md text-slate-800 dark:text-slate-50 font-bold py-1 px-1 text-left w-2/5 transition-all duration-1000">DOB:</td>
                                    <td className="text-md py-1 px-1 text-left w-3/5 transition-all dark:text-slate-400 duration-1000">{convertDateFormat(pat_details.dob.slice(0,10))}</td>
                                </tr>

                                <tr>
                                    <td className="text-md text-slate-800 dark:text-slate-50 font-bold py-1 px-1 text-left w-2/5 transition-all duration-1000">AGE:</td>
                                    <td className="text-md py-1 px-1 text-left w-3/5 transition-all  dark:text-slate-400 duration-1000">{pat_details.age}</td>
                                </tr>

                                <tr>
                                    <td className="text-md text-slate-800 dark:text-slate-50 font-bold py-1 px-1 text-left w-2/5 transition-all duration-1000">ADDRESS</td>
                                    <td className="text-md py-1 px-1 text-left w-3/5 transition-all dark:text-slate-400 duration-1000">{pat_details.address}</td>
                                </tr>

                                <tr>
                                    <td className="text-md text-slate-800 dark:text-slate-50 font-bold py-1 px-1 text-left w-2/5 transition-all duration-1000">PHONE NO:</td>
                                    <td className="text-md py-1 px-1 text-left w-3/5 transition-all dark:text-slate-400 duration-1000">{pat_details.phone}</td>
                                </tr>
                               
                </div>

                <div className='row-span-1 hidden lg:col-span-3 lg:inline-block'> 
                    <div className="bg-slate-50  dark:bg-slate-600 shadow-2xl pt-3 pb-3  rounded-xl  col-span-2 overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 transition-all duration-1000">

                          <div className="justify-self-center text-center mb-2 uppercase text-xl text-slate-800 dark:text-slate-50 font-black tracking-widest transition-all duration-1000">
                            WELCOME {pat_details.fname}
                          </div>
                          
                          <div className="justify-self-center text-center  text-gray-500 text-sm dark:text-slate-400 tracking-widest  transition-all duration-1000">
                          🙶Be the change that you wish to see in the world.🙷
                          </div>
                          
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-3 col-span-2  lg:col-span-3 h-56'> 
                    <div className='bg-slate-50  dark:bg-slate-600 shadow-2xl h-full rounded-xl col-span-2 lg:col-span-1 transition-all duration-1000'>
                          <h1 className='text-slate-800 subpixel-antialiased text-2xl pt-6 pb-4 font-extrabold font-mono text-center dark:text-white transition-all duration-1000'>UPCOMING APPOINTMENTS</h1>
                          
                              {filteredFapp_details.length?(
                                <div id='cards' className='flex flex-row justify-center  h-32 mb-10 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 mx-3 overflow-y-auto'>
                                    <table className='table-fixed  text-slate-600 mx-auto transition-all duration-1000 '>
                                      <thead className='sticky top-0'>  
                                        <tr className='bg-slate-50 border-b dark:bg-slate-600 top-0 transition-all duration-1000 '>
                                          <th class="align-middle  dark:text-slate-50 px-2 transition-all duration-1000 text-sm">APP ID</th>
                                          {/* <th class="align-middle dark:text-slate-50 px-2 transition-all duration-1000 text-sm">DOCTER ID</th> */}
                                          <th class="align-middle dark:text-slate-50 px-2 transition-all duration-1000 text-sm">DOCTER NAME</th>
                                          <th class="align-middle dark:text-slate-50 px-2 transition-all duration-1000 text-sm">DEPT</th>
                                          <th class="align-middle dark:text-slate-50 px-2 transition-all duration-1000 text-sm">DATE</th>
                                          <th class="align-middle dark:text-slate-50 px-2 transition-all duration-1000 text-sm">TIME</th>
                                        </tr>
                                        </thead>
                                      {filteredFapp_details.map((fapp_details, i)=> (
                                        <tr key={i} className='text-slate-500 border-b'>
                                          <td class="text-center  dark:text-slate-300 px-2 transition-all duration-1000">{fapp_details.appid}</td>
                                          {/* <td class="text-center  dark:text-slate-300 px-2 transition-all duration-1000">{fapp_details.docid}</td> */}
                                          <td class="text-center  dark:text-slate-300 px-2 transition-all duration-1000">{fapp_details.name}</td>
                                          <td class="text-center  dark:text-slate-300 px-2 transition-all duration-1000">{fapp_details.dept}</td>
                                          <td class="text-center  dark:text-slate-300 px-2 transition-all duration-1000">{convertDateFormat(fapp_details.date)}</td>
                                          <td class="text-center  dark:text-slate-300 px-2 transition-all duration-1000">{fapp_details.time}</td>
                                        </tr>
                                      ))}

                                    </table>
                                  </div>
                              ):(
                                <div className='grid grid-cols-5 px-10'>
                                  <h2 className='mx-auto w-52 col-span-3 text-center my-auto align-middle text-2xl dark:text-slate-50 text-slate-500 px-2 transition-all duration-1000 font-medium	'>No Appointments made!</h2>
                                  <img src={nurse} className=' col-span-2 w-44 h-44 mx-auto'></img>
                                </div>
                              )}

                          
                    </div>
                    <div className='bg-slate-50  dark:bg-slate-600 shadow-2xl rounded-xl col-span-2 lg:col-span-1 transition-all duration-1000'>
                        <h1 className='text-slate-800 subpixel-antialiased text-2xl pt-6 pb-4  font-extrabold font-mono text-center transition-all duration-1000 dark:text-white'>PREVIOUS APPOINTMENTS</h1>
                        
                              {filteredPast_appointment_details.length?(
                                <div id='cards' className='flex flex-row justify-center overflow-y-auto h-32 mb-10 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 transition-all duration-1000'>
                                  <table className='table-auto text-slate-600 border-collapse mx-auto transition-all duration-1000'>
                                    <tr className='bg-slate-50 border-b dark:bg-slate-600 sticky top-0 transition-all duration-1000'>
                                        <th class="align-middle dark:text-slate-50 px-2 transition-all duration-1000">DATE</th>
                                        <th class="align-middle dark:text-slate-50 px-2 transition-all duration-1000">DOCTER NAME</th>
                                        <th class="align-middle dark:text-slate-50 px-2 transition-all duration-1000">DESEASE</th>
                                        <th class="align-middle  dark:text-slate-50 px-2 transition-all duration-1000">PRESCRIPTION</th>
                                    </tr>
                                    {filteredPast_appointment_details.map((past_appointment_details, i)=> (
                                      <tr key={i} className='text-slate-500 border-b'>
                                        <td class="text-center   dark:text-slate-300 px-2 transition-all duration-1000">{convertDateFormat2(past_appointment_details.date.slice(0,10))}</td>
                                        <td class="text-center    dark:text-slate-300 px-2 transition-all duration-1000">{past_appointment_details.name}</td>
                                        <td class="text-center    dark:text-slate-300 px-2 transition-all duration-1000">{past_appointment_details.disease}</td>
                                        <td class="text-center  dark:text-slate-300 transition-all duration-1000"><button                                                                                                                                                   
                                                                                                                                                          onClick={()=>handleDownloadPDF(past_appointment_details.prescription, convertDateFormat2(past_appointment_details.date), past_appointment_details.name)}
                                                                                                                                                        >
                                                                                                                                                          <FontAwesomeIcon icon={faDownload} style={{color: theme==='dark'?"#60fcdd":"122d5c"}} />  <span className='text-xs '>DOWNLOAD</span>
                                                                                                                                                        </button></td>
                                        
                                      </tr>
                                    ))}
                                  </table>
                                </div>
                              ):(
                                <div className='grid grid-cols-5 px-10'>
                                  <h2 className='mx-auto w-52 col-span-3 text-center my-auto align-middle text-2xl dark:text-slate-50 text-slate-500 px-2 transition-all duration-1000 font-medium	'>No Appointments to show here!</h2>
                                  <img src={nurse} className='w-44 col-span-2 h-44 mx-auto'></img>
                                </div>
                              )}
                          
                          
                          
                    </div>
                 </div>
                 <div className='grid grid-cols-5 mt-5 col-span-3 gap-2'>
                      <div className='grid grid-cols-1  col-span-2 gap-2'>
                          <div className="justify-center flex w-full transition-all duration-1000">
                                      <Calendar
                                          value={selectedDate}
                                          calendarType="US"
                                          onClickDay = {handleDateClick}
                                          tileClassName={`text-center mx-auto  text-slate-500  dark:text-slate-100 mt-2`}
                                          className = "bg-white w-full dark:bg-slate-600 shadow-2xl text-slate-400 dark:text-white   rounded-2xl px-10 py-5  transition-all duration-1000"
                                      />
                                      
                          </div>
                          <div>
                            <button onClick={resetFilter} className=" mx-auto bg-slate-50 shadow-xl dark:text-white px-5 rounded-lg py-1 w-full dark:bg-slate-600 transition-all duration-1000  col-span-3">Reset</button>
                          </div>
                      </div>
                      <div className="bg-slate-50 shadow-xl px-5 rounded-lg  dark:bg-slate-600 transition-all duration-1000  col-span-3">
                              <HealthGraph theme={theme} selectedDate={selectedDate}/>
                      </div>
                      
                </div>
                
          </div>
    </div>
  )
}

export default Profile;