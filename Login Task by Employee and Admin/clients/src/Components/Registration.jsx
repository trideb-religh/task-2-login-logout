import React, {useState} from 'react'
import './Registration.css'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'

const Registration = () => {
  const [record, setRecord] =useState([])
  const [register, setRegister]=useState({
    username:"",
    email:"",
    firstnm:"",
    lastnm:"",
    password:"",
    conpassword: "",
    type:""
  })
  // const [types, setTypes] =useState("")
  

  const jump = useNavigate();
  const handleChange =(e)=>{
    const name =e.target.name
    const value = e.target.value
    console.log(name, value);
    setRegister({...register, [name]:value})
  }

  const handleSubmit =(e)=>{

    e.preventDefault()

    if(register.username===""){
      alert("Name field is required")
    }
    else if(register.email===""){
      alert("Email field is required")
    }
    else if(!register.email.includes("@")){
      alert("Email is invalid")
    }
    else if(register.firstnm===""){
      alert("First Name is required")
    }
    else if(register.lastnm===""){
      alert("Last Name is required")
    }
    else if(register.password===""){
      alert("Password should not be empty")
    }
    else if(register.password!==register.conpassword ){
      alert("password didnot match")
    }
    else if(register.type===""){
      alert("Type is required")
    }
    else
    {
    const newRecord = {...register, id:new Date().getTime().toString()}
    setRecord([ ...record, newRecord])

    const sendData = register
    axios.post ("http://127.0.0.1:5000/data", sendData)
    .then(()=>{
      console.log("data saved succefully");
    })
    .catch(()=>{
      console.log("Error")
    })

    setRegister({username:"", email:"", firstnm:"", lastnm:"", password:"",conpassword:"", type:""});
    jump("/login")
    }
  }


  return (
    <>
      <div className='container'>
        <h1>Register the below information</h1>
        <form action="" onSubmit={handleSubmit}>
        <div className='details'>
            <input onChange={handleChange} name="username" value={register.username} className='name' type="text" placeholder='Username'/>
            <input onChange={handleChange} name="email" value={register.email} className='email' type="email" placeholder='Email'/>
            <div className='flname'>
              <input className='fname' name="firstnm" value={register.firstnm} onChange={handleChange} type="text" placeholder='First name'/>
              <input className='lname' name="lastnm" value={register.lastnm} onChange={handleChange} type="text" placeholder='Last name'/>
            </div>
            <input className='pass' name="password" onChange={handleChange} value={register.password} type="password" placeholder='Password'/>
            <input className='pass' name="conpassword" onChange={handleChange} value={register.conpassword} type="password" placeholder='Conform Password' />
            <div className='radioData'>
              <label htmlFor="">Admin:</label>
              <input type="radio" onChange={handleChange} value="Admin"  name="type" />
              <label htmlFor="">User:</label>
              <input type="radio" onChange={handleChange} value="User" name="type" />
            </div>
            <input className='submit' type="submit" placeholder='Submit' />
        </div>
        </form>
        <h3>Already have an account ? <NavLink to="/login">Sign In</NavLink></h3>
      </div>
      {/* <div>
        {
          record.map((curElement)=>{
            return(
              <div>
              <p>{curElement.username}</p>
              <p>{curElement.email}</p>
              <p>{curElement.firstnm}</p>
              <p>{curElement.lastnm}</p>
              <p>{curElement.password}</p>
              <p>{curElement.type}</p>
            </div>
            )
          })
        }
      </div> */}
    </>
  )
}

export default Registration