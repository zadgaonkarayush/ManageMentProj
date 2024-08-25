import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './style.css'

const EmployeeDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/employee/detail/' + id)
      .then(result => {

        setEmployee(result.data[0])

      })
      .catch(err => console.log(err))
  }, [])
  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout')
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid")
          navigate('/')
        }
      })
  }
  return (
    <div>
      <div className='p-2 d-flex justify-content-center shadow-lg bg-primary text-light' >
        <h2>Employee Management System</h2>
      </div>
      <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
        <img src={'http://localhost:3000/Images/' + employee.image} className='emp_det_image' />
        <div className='d-flex flex-column align-items-center mt-5'>
          <h3>Name : {employee.name}</h3>
          <h3>Email : {employee.email}</h3>
          <h3>Salary : {employee.salary}</h3>
        </div>
        <div className='mt-5'>
          <button className='btn btn-danger' onClick={handleLogout}>Logout</button>

        </div>
      </div>
    </div>
  )
}

export default EmployeeDetail
