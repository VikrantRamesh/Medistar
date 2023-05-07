import React, { useState, useEffect,PureComponent } from "react";
import '../styles/signup.css';
import Axios from "axios";
import swal from 'sweetalert';
import {useNavigate, useLocation } from 'react-router-dom';
import Nav from './dashNav.jsx'; 
import { ThemeContext, themes } from '../contexts/ThemeContext';
import {VictoryPie} from 'victory';



const StatisticBox = ({ title, number }) => {
    return (
        <div className="flex-1 m-2 rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:scale-110 transition duration-500 ease-in-out">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-purple-400 hover:to-pink-500 p-6">
            <div className="flex flex-col items-center">
                <div className="text-white text-4xl font-bold mb-2">
                {number}
                </div>
                <div className="text-white text-lg">{title}</div>
            </div>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
  const [adminid, SetAdminid] = useState("");
  const [adminDetails, SetAdminDetails] = useState({
                                                user_name: "",
                                                email: "" 
                                                });
  const [userId, setUserId] = useState("");

  const defaultGraphicData = [{ x: "Cats", y: 30 },
                                { x: "Dogs", y: 30 },
                                { x: "Birds", y: 30 }];
  const [graphicData, setGraphicData] = useState(defaultGraphicData);
  
  //theme useState
  const [theme, setTheme] = useState(themes.dark);


  const data=[
    { x: "Cats", y: 35 },
    { x: "Dogs", y: 40 },
    { x: "Birds", y: 55 }
  ];           
  
  

  useEffect(() => {
    setGraphicData(data); // Setting the data that we want to display
  }, []);

  const navigate = useNavigate();

  useEffect(() => {

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
                    //console.log(response.data.d_fname,response.data.doc_id);
                    SetAdminid(response2.data.admin_id);    
                    set_admin_details(response.data.id);
            });

            }
        }).catch(error => {
            console.log(error);
            navigate('/login');
        });

    }, []);
    

    const set_admin_details = (user_id) =>{
        const userId_detail = {user_id: user_id};
        Axios.post('http://localhost:5000/get_admin_details', userId_detail).then((response)=>{   
                SetAdminDetails(response.data);
        });
    }


  return (
    <div className="bg-slate-900 min-h-full">
            <Nav></Nav>
            <div className="grid grid-cols-6 ">
                <div className="bg-slate-700 ml-6 mr-2 px-12 pt-6 mt-5 rounded-xl col-span-2 overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300">
                    <h2 className="text-white font-extrabold subpixel-antialiased text-lg pb-3 mx-auto text-center">Admin Details</h2>
                        <div className="px-auto">
                                <tr>
                                    <td className="text-md text-white font-semibold py-1 px-1">User ID:</td>
                                    <td className="text-md text-slate-400 py-1 px-4">{userId}</td>
                                </tr>
                                <tr>
                                    <td className="text-md text-white font-semibold py-1 px-1">Admin ID:</td>
                                    <td className="text-md text-slate-400 py-1 px-4">{adminid}</td>
                                </tr>
                                <tr>
                                    <td className="text-md text-white font-semibold py-1 px-1">User Name:</td>
                                    <td className="text-md text-slate-400 py-1 px-4">{adminDetails.user_name}</td>
                                </tr>
                                <tr>
                                    <td className="text-md text-white font-semibold py-1 px-1">Email:</td>
                                    <td className="text-md text-slate-400 py-1 px-4">{adminDetails.email}</td>
                                </tr>
                        </div>
                </div>
                <div className="bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-cyan-500 via-purple-300 to-cyan-500 px-10 py-5 mr-6 mt-5    rounded-xl col-span-4 max-h-96 overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300">
                    <h2 className="text-slate-800 font-extrabold subpixel-antialiased text-xl pb-3 mx-auto text-center">WEBSITE'S STATISTICS</h2>
                    <div className="flex flex-row justify-center">
                        <StatisticBox title="Users" number={1024} />
                        <StatisticBox title="Patients" number={256} />
                        <StatisticBox title="Doctors" number={64} />
                        <StatisticBox title="Admins" number={8} />
                    </div>
                </div>
                <div className="bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-cyan-500 via-purple-300 to-cyan-500 ml-6 mr-2 px-12 pt-6 mt-5   rounded-xl col-span-4 max-h-96 overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300">
                    <h2 className="text-slate-800 font-extrabold subpixel-antialiased text-xl pb-3 mx-auto text-center">WEBSITE'S STATISTICS</h2>
                    <div className="grid grid-cols-2">
                        <div>
                            <VictoryPie
                                data={graphicData}
                                labelRadius={({ innerRadius }) => innerRadius + 5 }
                                radius={({ datum }) => 5 + datum.y *2}
                                innerRadius={50}
                                colorScale={["#69D1C5", "#F44336", "#E91E63", "#9C27B0", "#673AB7"]}
                                style={{ labels: { fill: "black", fontSize: 20, fontWeight: "bold" } }}
                                className = "max-h-14"
                                height={250}
                                width = {500}
                                animate={{ easing: 'exp', duration: 2000 }}
                            />
                        </div>
                        <div>
                            <VictoryPie
                                data={graphicData}
                                labelRadius={({ innerRadius }) => innerRadius + 5 }
                                radius={({ datum }) => 5 + datum.y *2}
                                innerRadius={20}
                                colorScale={["#69D1C5", "#F44336", "#E91E63", "#9C27B0", "#673AB7"]}
                                style={{ labels: { fill: "white", fontSize: 20, fontWeight: "bold" } }}
                                className = "max-h-14"
                                height={250}
                                width = {500}
                                animate={{ easing: 'exp', duration: 2000 }}
                            />
                        </div>
                    </div>
                </div>
                    
            </div>
    </div>
  );
};

export default AdminDashboard;