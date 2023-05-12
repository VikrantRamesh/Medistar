import React, { useState, useEffect } from "react";
import Axios from "axios";
import gen from "../../Images/general_docimg.jpg";

function DoctorsList({data}) {
  const [doctors, setDoctors] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => { 
      setDoctors(data);

      const id_data = {user_id: data.id};
      Axios.post('http://localhost:5000/get_images', id_data, { responseType: 'blob' }).then((response) => {
          if(response.data.size){
              setImageUrl(URL.createObjectURL(response.data));
          }else{
              setImageUrl(gen);
          }
      });
  }, []);

  return (
    <div className="bg-gray-200 dark:bg-slate-600 flex-1 mx-2 mt-2 rounded-lg overflow-hidden shadow-xl cursor-pointer transform hover:scale-105 transition duration-500 ease-in-out mb-5">
                    <div className="hidden  lg:block">
                        <img src={imageUrl} className="rounded-full h-24 w-24 md:h-48 md:w-48 mx-auto object-cover my-5"></img>
                    </div>
                        <div className="px-5 py-4 grid grid-cols-2">
                          <div className="col-span-2 text-center mx-auto mb-5">
                                    <td className="lg:text-2xl sm:text-lg md:text-xl dark:text-slate-200 text-slate-900 font-bold text-center ">Dr. {doctors.fname} {doctors.lname}</td>
                          </div>
                          <div className="my-2">
                                    <td className="text-md text-slate-800 dark:text-white font-semibold">Doctor ID</td>
                          </div>
                          <div className="my-2">    
                                    <td className="text-md dark:text-slate-300 text-slate-700 font-bold px-2">{doctors.id}</td>
                          </div>
                          <div className="my-2">
                                    <td className="text-md text-slate-800 dark:text-white font-semibold">Department</td>
                          </div>
                          <div  className="my-2">          
                                    <td className="text-md dark:text-slate-300 text-slate-700 font-bold  px-2">{doctors.department}</td>
                          </div>
                          <div className="my-2">
                                    <td className="text-md text-slate-800 dark:text-white font-semibold ">Qualification</td>
                          </div>
                          <div className="my-2">          
                                    <td className="text-md dark:text-slate-300 text-slate-700 font-bold px-2">{doctors.qualification}</td>
                          </div>
                          <div className="my-4">
                                    <td className="text-md text-slate-800 dark:text-white font-semibold ">Todays Appointments</td>
                          </div>
                          <div className="my-auto">          
                                    <td className="text-md dark:text-slate-300 text-slate-700 font-bold px-2">{doctors.num_appointments}</td>
                          </div>
                        </div>
    </div>
  );
}

export default DoctorsList;