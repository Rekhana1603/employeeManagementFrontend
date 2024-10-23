import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {

  return (

    <div style={{minHeight:'100vh', backgroundColor:'#B6D0E2'}} className="d-flex gap-4 justify-content-center align-items-center">
      <div className='text-center'>
      <h1 className='fw-bolder text-dark'>Employee Management System</h1>
      <Link className='btn btn-primary mt-3 px-4' to={'/Home'}>More</Link>
      </div>
      <div >
        <img src="./images/bg-img.png" alt="" />
      </div>
    </div>

  )
}

export default Landing