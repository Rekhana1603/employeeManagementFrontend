import React, { useState } from 'react'
import Add from '../components/Add'
import View from '../components/View'

const Home = () => {
  const [employeeDetails,setEmployeeDetails] = useState({
    empName:"",empId:"",email:"",phoneNumber:"",empStatus:""
  })

  const [empDetailsUploadResponse,setEmpDetailsUploadResponse] = useState("")
  const [empDetailsUpdateResponse,setEmpDetailsUpdateResponse] = useState("")
  const [editData, setEditData] = useState(null);

  const [show, setShow] = useState(false);
  const [modalMode, setModalMode] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => {
    setModalMode('add');
    setShow(true);}

  
  return (
    <div>
      <h1 className='text-center mt-3 text-light fw-bolder fs-1'>Employee Management System</h1>          
      <Add setEmpDetailsUploadResponse={setEmpDetailsUploadResponse} setEmpDetailsUpdateResponse={setEmpDetailsUpdateResponse} employeeDetails={employeeDetails} setEmployeeDetails={setEmployeeDetails} editData={editData} show={show} handleClose={handleClose} handleShow={handleShow} modalMode={modalMode} setModalMode={setModalMode} />
      <h4 className='text-center mt-5 text-info fw-bolder'>Employee Details</h4>
      <View empDetailsUploadResponse={empDetailsUploadResponse} empDetailsUpdateResponse={empDetailsUpdateResponse} editData={editData}  setEmployeeDetails={setEmployeeDetails} setEditData={setEditData} setModalMode={setModalMode} setShow={setShow} />
    </div>

  )
}

export default Home