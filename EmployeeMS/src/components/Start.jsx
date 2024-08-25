import React, { useEffect } from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Start = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() =>{
       axios.get('http://localhost:3000/verify')
       .then(result =>{
        if(result.data.Status){
            if(result.data.role === admin){
                navigate('/dashboard')
            }
            else{
                navigate('/employee_detail/' + result.data.id)
            }
        }
        
       })
    },[])
    return (
        <>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <div className='header'>
                            <h1>Welcome to the Employeee Management System</h1>

                            </div>                        
                                <form className='bg-primary text-light w-150 p-3 bg-opacity-50'>
                                <div className="d-flex flex-column align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">Login As :</p>


                                   <div  className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mt-3">
                                   <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1"
                                        onClick={() => { navigate('/employee_login') }}>
                                        Employee
                                    </button>

                                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1"
                                        onClick={() => { navigate('/adminlogin') }}>
                                        Admin
                                    </button>
                                   </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div
                    className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                    <div className="text-white mb-3 mb-md-0">
                        Copyright © 2024. All rights reserved.
                    </div>





                </div>
            </section>
        </>
    )
}

export default Start
