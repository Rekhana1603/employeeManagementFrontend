import React, { useState } from 'react'
import { Button,Modal,Form,FloatingLabel } from 'react-bootstrap'
import { addEmpDetailsAPI, updateEmpDetailsAPI } from '../services/allAPI'

const Add = ({setEmpDetailsUploadResponse,setEmpDetailsUpdateResponse,employeeDetails,setEmployeeDetails,editData,modalMode,show, handleClose, handleShow}) => {
    
    const [isEmpNameInvalid, setIsEmpNameInvalid] = useState(false)
    const [isEmpIdInvalid, setIsEmpIdInvalid] = useState(false)
    const [isEmailInvalid, setIsEmailInvalid] = useState(false)
    const [isPhoneNumberInvalid,setIsPhoneNumberInvalid] = useState(false)


    const userInputValidation = (inputData) =>{
      const { name, value } = inputData
      //  console.log(name, value);

      if (name == "empName"){
        setEmployeeDetails({...employeeDetails, empName:value})
        !!value.match(/^[a-zA-Z]+ [a-zA-Z]+$/) ? setIsEmpNameInvalid(false) : setIsEmpNameInvalid(true)
      }

      if (name == "empId") {
        setEmployeeDetails({...employeeDetails, empId:value})
        !!value.match(/^[1-9]\d*$/) ? setIsEmpIdInvalid(false) : setIsEmpIdInvalid(true)
      }

      if (name == "email"){
        setEmployeeDetails({...employeeDetails, email:value})
        !!value.match(/^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/) ? setIsEmailInvalid(false) : setIsEmailInvalid(true)
      }

      if(name == "phoneNumber"){
        setEmployeeDetails({...employeeDetails, phoneNumber:value})
        !!value.match(/^[6-9]\d{9}$/) ? setIsPhoneNumberInvalid(false) : setIsPhoneNumberInvalid(true)
      }
    }

    const handleAddDetails = async () => {
      const {empName,empId,email,phoneNumber,empStatus} = employeeDetails
      if(empName && empId && email && phoneNumber && empStatus){
        // alert("call api")
        try{
          const response = await addEmpDetailsAPI(employeeDetails)
          // console.log(response);
          if(response.status>=200 && response.status<300){
            handleClose()
            setEmployeeDetails({...employeeDetails,empName:"",empId:"",email:"",phoneNumber:"",empStatus:""})
            setEmpDetailsUploadResponse(response.data)
            alert("Employee details added successfully!!!")
          }

        }catch(err){
          console.log(err);         
        }

      }else{
        alert("Please fill the form completely!!!")
      }
    }

    const handleUpdateDetails = async()=>{
      const {empName,empId,email,phoneNumber,empStatus} = employeeDetails     
      if(empName && empId && email && phoneNumber && empStatus){
          try{
            const response = await updateEmpDetailsAPI(editData.id,employeeDetails)
            // console.log(response);
              if(response.status>=200 && response.status<300){
                  handleClose()
                  setEmployeeDetails({...employeeDetails,empName:"",empId:"",email:"",phoneNumber:"",empStatus:""})
                  setEmpDetailsUpdateResponse(response.data)
                  alert("Employee Details Updated successfully!!!")
              }
              
          }catch{
              console.log(err);             
          }
      }else{
          alert("Please fill the form completely!!!")
      }
    }


  return (
    <>
        <div className='d-flex gap-3 mt-5 ms-3'>
            <h5 className='mt-2'>Add Details of Employees</h5>
            <button onClick={handleShow} className='btn btn-warning'>Add +</button>
        </div>

        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee Details...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='border rounded p-3'>
            <FloatingLabel controlId="floatingInputName" label="Full Name" className="mb-3">
              <Form.Control onChange={e => userInputValidation(e.target)} value={employeeDetails.empName} name='empName' type="text" placeholder="Full Name" />
           </FloatingLabel>
           {
            isEmpNameInvalid && <div className="mb-2 text-danger">*Please enter your full name</div>
           }

          <FloatingLabel controlId="floatingInputId" label="Employee ID" className="mb-3">
              <Form.Control onChange={e => userInputValidation(e.target)} value={employeeDetails.empId} name='empId' type="text" placeholder="Employee ID" />
           </FloatingLabel>
           {
            isEmpIdInvalid && <div className="mb-2 text-danger">*Enter a valid ID</div>
          } 

           <FloatingLabel controlId="floatingInputEmail" label="Email" className="mb-3">
              <Form.Control onChange={e => userInputValidation(e.target)} value={employeeDetails.email} name='email' type="text" placeholder="Email" />
           </FloatingLabel>
           {
            isEmailInvalid && <div className="mb-2 text-danger">*Please enter a valid email ID</div>
           }

          <FloatingLabel controlId="floatingInputPhoneNumber" label="Phone Number" className="mb-3">
              <Form.Control onChange={e => userInputValidation(e.target)} value={employeeDetails.phoneNumber} name='phoneNumber' type="text" placeholder="Phone Number" />
           </FloatingLabel>
           {
            isPhoneNumberInvalid && <div className="mb-2 text-danger">*Enter a valid 10-digit phone number</div>
          } 
          
           <select className='form-select py-3' onChange={e=> setEmployeeDetails({...employeeDetails, empStatus:e.target.value})} value={employeeDetails.empStatus}>
            <option hidden>Employee Status</option>
            <option value="active">active</option>
            <option value="inactive">Inactive</option>
           </select>

          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>Close</Button>
          {
            modalMode=='add'?
            <Button variant="info" onClick={handleAddDetails}>Submit</Button>
            :
            <Button variant="info" onClick={handleUpdateDetails}>Update</Button>
          }
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Add