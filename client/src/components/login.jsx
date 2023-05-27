import React, { useState } from 'react';
import '../styles/signup.css';
import Axios from "axios";
import swal from 'sweetalert';
import {useNavigate, Link} from 'react-router-dom';
import InteractiveBackground from "./Interactive Backgounds/InteractBg";

const Login_page = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const isDisabled = !password || !userName;

  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();
    const login_details = {
      username: userName,
      password: password
    }
    
    Axios.post('http://localhost:5000/login', login_details, { withCredentials: true }).then((response) => {
            if(response.data.login){
                console.log(response.data.class)
                if(response.data.class === 'doctor'){
                    navigate('/docdash');
                }else if(response.data.class === 'admin'){
                    navigate('/admindash');
                }else if(response.data.class === 'patient'){
                  navigate('/patdash');
                }else{
                  navigate('/');
                }
            }else{
              swal({
                title: "Wrong Username or Password!",
                icon: "warning",
              });
            }
    });
  };

  const handleClick = () =>{
    navigate('/');
  }

  return (
    <div className=' pt-36 pb-32 py-auto min-h-full'>
       <InteractiveBackground/>
       <div className="absolute top-0 left-0 z-10 w-full h-full mt-36">  
        <div className=" signup-container  flex-col text-lg"></div>
        
          <div className="login-form mx-auto bg-cyan-400  bg-opacity-90 shadow-2xl max-w-xl">
              <div className='flex flex-row'>
                    <div className='mb-5 '>
                        <button
                        className="bg-white text-black flex items-center justify-center w-10 h-10 rounded-full shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                        onClick={handleClick}
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
                <h2 className='font-bold mb-5 p-0 ml-44'>Login</h2>
              </div>

              <form onSubmit={handleSubmit}>
                      <div className="form-group w-10/12 mx-auto text-lg">
                          <label>Username</label>
                          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                      </div>
                      <div className="form-group w-10/12 mx-auto text-lg">
                          <label>Password</label>
                          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                      </div>
                      <button  disabled={isDisabled} className="w-2/5 mx-auto my-10 next font-black transition-all duration-500" type="submit">Login</button>
                      <p className='form-group w-10/12 mx-auto text-l font-semibold text-center'>
                        Dont have an account? <Link to="/signup" ><a className='underline decoration-indigo-500 decoration-2'>Signup</a></Link>
                      </p>
              </form>
          </div>
      </div>
     </div>
  );
};

export default Login_page;