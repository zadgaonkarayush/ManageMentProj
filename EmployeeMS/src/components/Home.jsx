import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Home = () => {
  const [adminTotal, setAdminTotal] = useState();
  const [employeeTotal, setTotalEmployee] = useState();
  const [salaryTotal, setTotalSalary] = useState();
     const [admins,setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, [])

  const AdminRecords = () =>{

    axios.get('http://localhost:3000/auth/admin_records')
    .then(result =>{
      if(result.data.Status){
        setAdmins(result.data.Result)
      }else{
        alert(result.data.Error)
      }
    })
  }

  const adminCount =() =>{
    axios.get('http://localhost:3000/auth/admin_count')
    .then(result =>{
      if(result.data.Status){
        setAdminTotal(result.data.Result[0].admin)
      }
    })
  }
  const employeeCount =() =>{
    axios.get('http://localhost:3000/auth/employee_count')
    .then(result =>{
      if(result.data.Status){
        setTotalEmployee(result.data.Result[0].employee)
      }
    })
  }
  const salaryCount =() =>{
    axios.get('http://localhost:3000/auth/salary_count')
    .then(result =>{
      if(result.data.Status){
        setTotalSalary(result.data.Result[0].salary)
      }
    })
  }
 const handleDelete =(id) =>{
   
  axios.delete('http://localhost:3000/auth/delete_admin/'+id)
  .then(result =>{
      if(result.data.Status){
        window.location.reload()
      }else{
        alert(result.data.error)
      }
  })
 }

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25 bg-primary text-light'>
          <div className='text-center pb-1 bg-primary'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className=' d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>



        <div className='px-3 pt-2 pb-3 border shadow-sm w-25 bg-primary text-light'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className=' d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>



        <div className='px-3 pt-2 pb-3 border shadow-sm w-25 bg-primary text-light'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className=' d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5><i className="bi bi-currency-rupee"></i>{salaryTotal}</h5>
          </div>


        </div>

      </div>

      <div className='mt-4 px-5 pt-3 shadow'>
        <h3>List of Admins</h3>
        <table  className='table table-bordered'>
          <thead>
        <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
             {
              admins.map((a,index) => (
                <tr key={a.id}>
                  <td>{a.email}</td>
                  <td>
                  <button
                    className="btn btn-warning btn-sm" onClick={() => handleDelete(a.id)} >
                    Delete
                  </button>
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

      export default Home;
