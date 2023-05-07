import React, { useState } from 'react';
import '../styles/signup.css';
import Axios from "axios";
import swal from 'sweetalert';
import {useNavigate, Link} from 'react-router-dom';

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

  return (
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 pt-36 pb-32 py-auto min-h-full'>
        <div className=" signup-container flex-col text-lg"></div>
          <div className="signup-form mx-auto bg-transparent max-w-xl	">
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                      <div className="form-group w-10/12 mx-auto">
                          <label>Username</label>
                          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                      </div>
                      <div className="form-group w-10/12 mx-auto">
                          <label>Password</label>
                          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                      </div>
                      <button  disabled={isDisabled} className="w-2/5 mx-auto my-10 next" type="submit">Login</button>
                      <p className='form-group w-10/12 mx-auto text-l font-semibold text-center'>
                        Dont have an account? <Link to="/signup" ><a className='underline decoration-indigo-500 decoration-2'>Signup</a></Link>
                      </p>
              </form>
        </div>
     </div>
  );
};

export default Login_page;