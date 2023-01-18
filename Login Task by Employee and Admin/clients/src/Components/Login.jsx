import React, { useState, useEffect } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  // const [data,setData] = useState([]);
  // const [userlogin, setUserlogin] = useState(
  //   {
  //     username: "",
  //     email: "",
  //     password: ""
  //   }
  // );
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [task, setTask] = useState([]);

  // const nameuse = username;
  // const handleChange =(e)=>{
    // const name =e.target.name
    // const value = e.target.value
    // console.log(name, value);
    // setUserlogin({...userlogin, [name]:value})
  //   const {value, name} =e.target
  //   console.log(value, name)
  //   setUserlogin(()=>{
  //     return {...userlogin, [name]:value}
  //   })
  // }


  const history = useNavigate();

  const handleClick = ((e) => {
    e.preventDefault()

    

    if (username === "") {
      alert("Name field is required")
    }
    else if (email === "") {
      alert("Email field is required")
    }
    else if (!email.includes("@")) {
      alert("Email is invalid")
    }
    else if(password===""){
      alert("Password should not be empty")
    }
    else {
          // const getData = userlogin
      axios.get(`http://127.0.0.1:5000/logindata?username=${username}`)
      .then((storedData)=>{
        console.log(storedData);
        const userName=storedData.data[0][0];
        const Email = storedData.data[0][1];
        const Pass = storedData.data[0][2];
        const Type = storedData.data[0][3];
        if(username===userName && email===Email && password===Pass && Type==="Admin"  )
        {
          history(`/admin`)
        }
        else if(username===userName && email===Email && password===Pass && Type==="User" )
        {
          history(`/user/${username}`);
        }
        else
        {
          history("/error");
        }
        console.log(userName);
        console.log(Email);
        console.log(Pass);
        console.log(Type);
      })
      .catch(()=>{
        console.log("Error")
      })
    }
  })
  
  useEffect(()=>{
    axios.get(`http://127.0.0.1:5000/getuserdata`)
    .then((userData)=>{
      const Udata=(userData)
      console.log(Udata)
      console.log("getting data succefully");
    })
    .catch(()=>{
      console.log("Error")
    })
  })

  return (
    <>
      <div className='loginborder'>
        <div className='area'>
          <h1>Log in</h1>
          <input type="text" name='username' onChange={(e)=>{setUsername(e.target.value)}} placeholder='Enter your name' />
          <input type="email" name='email' onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter your email' />
          <input type="password" name='password' onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter password' />
          <button onClick={handleClick}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default Login;