
import React from 'react';
import { useState } from 'react';
import './style.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [error, setError] = useState(null);
  
  

  const handleSubmit = (event) => {

    event.preventDefault();

 console.log('sumit',values)
    axios.post('http://localhost:3000/auth/adminlogin', values)
      .then(result => {

        if (result.data.loginStatus) {
          localStorage.setItem("valid", true)

          navigate('/dashboard');
        }
        else {
          setError(result.data.Error);
        }

      })
      .catch(err => console.log(err))
  }

  return (
    <>
    <div className='mt-2'>
      <Link to={'/'} className='btn btn-primary'>Back</Link>
    </div>
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-3 rounded w-25 border loginForm'>
        <div className='text-warning'>
          {error && error}
        </div>
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email:</strong></label>
            <input type="email" name='email' autoComplete='off' placeholder='Enter Email'
              onChange={(e) => setValues({ ...values, email: e.target.value })} className='form-control rounded-0' />
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password:</strong></label>
            <input type="password" name='password' placeholder='Enter Password'
              onChange={(e) => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
          </div>
          <button className='btn btn-primary w-100 rounded-0 mb-2'>Log in</button>
          <div className='mb-1'>
            <input type="checkbox" name="tick" id="tick" className='me-2' />
            <label htmlFor="password">You are Agree with terms & conditions</label>
          </div>
        </form>
        <div>
          <h7>OR</h7>
        </div>
        <div>
          <Link to={'/add_admin'}><h6>Register</h6></Link>
        </div>

      </div>
      
    </div>
    
    
      
</>
    
  )
}

export default Login
