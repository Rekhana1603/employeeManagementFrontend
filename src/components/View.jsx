import React, { useEffect, useState } from 'react'
import { getAllEmpDetailsAPI,removeEmpDetailsAPI } from '../services/allAPI'

const View = ({empDetailsUploadResponse,empDetailsUpdateResponse,setEmployeeDetails,setEditData,setModalMode,setShow}) => {
  const [allEmployeeDetails,setAllEmployeeDetails] = useState([])

  useEffect(()=>{
    getAllEmpDetails()
  },[empDetailsUploadResponse,empDetailsUpdateResponse])

  const getAllEmpDetails = async ()=>{
    try{
      const response = await getAllEmpDetailsAPI()
      // console.log(response);
      setAllEmployeeDetails(response.data)
    }catch(err){

    }
  }
  // console.log(allEmployeeDetails);
  const deleteEmpDetails = async (id) => {
    await removeEmpDetailsAPI(id)
    getAllEmpDetails()
  }

  const editEmployeeDetails = async (details)=>{
    // console.log(details);
    setEmployeeDetails({empName: details.empName, empId: details.empId, email: details.email, phoneNumber: details.phoneNumber, empStatus: details.empStatus})
    setEditData(details)
    setModalMode('edit');
    setShow(true);
  }

  
  return (
    <>
    <div className='container'>
        {
          allEmployeeDetails.length>0?
          <table className='table border shadow mt-5'>
          <thead>
              <tr>
                <th>#</th>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Status</th>  
                <th>...</th>  
                <th>...</th>              
              </tr>
          </thead>
          <tbody>
          { 
              allEmployeeDetails?.map((details,index)=>(                 
              <tr key={details?.id}>
                  <td>{index+1} .</td>
                  <td>{details?.empId}</td>
                  <td>{details?.empName}</td>
                  <td>{details?.email}</td>
                  <td>{details?.phoneNumber}</td>
                  <td>{details?.empStatus}</td>
                  <td><button onClick={()=>editEmployeeDetails(details)} className='btn btn-success px-4'>Edit</button></td>
                  <td><button onClick={()=>deleteEmpDetails(details?.id)} className='btn btn-danger'>Delete</button></td>
              </tr>
          
              ))
            
          }
          </tbody>
        </table>
        :
        <div className="text-danger text-center fw-bolder p-5">No Employee Details are added yet!!!</div>
        } 
    </div>
    </>
  )
}

export default View