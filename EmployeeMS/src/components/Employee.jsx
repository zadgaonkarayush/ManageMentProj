import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';

import './style.css';
const Employee = () => {

  

   const [employee, setEmployee] = useState([]);

   useEffect(() => {

     axios.get('http://localhost:3000/auth/employee')

      .then(result => {
       if (result.data.Status) {
         setEmployee(result.data.Result)
       }
       else {
         alert(result.data.Error);
       }
     })
       .catch(err => console.log(err))
   }, [])
   const handleDelete = (id) =>{
    axios.delete('http://localhost:3000/auth/delete_employee/' + id)
    .then(result =>{
      if(result.data.Status){
          window.location.reload()
      }else{
        alert(result.data.error)
      }
    })
   }

  return (
    <div className='px-5 mt-4'>

      <div className='d-flex justify-content-center shadow'>
        <h3>Employee List</h3>
      </div>
      <Link to='/dashboard/add_employee' className='btn btn-primary mt-3 mb-3'>Add Employee</Link>
       <div className='mt-3'>
          <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {
              employee.map(e =>(
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td><img src={`http://localhost:3000/Images/${e.image}`} alt="" className='employee_image' /></td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td>{e.salary}</td>
                  <td>
                    <Link to={`/dashboard/edit_employee/${e.id}`} className='btn btn-info btn-sm me-2'>Edit</Link>
                    <button className='btn btn-warning btn-sm' 
                    onClick={() => handleDelete(e.id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>  
      </div> 
    </div>
  )
}

export default Employee
