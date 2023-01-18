import React from 'react'
import './AdminPage.css'
import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'


const AdminPage = () => {

  const [store, setStore] =useState([]);

  const [addtitle, setAddtitle] = useState("");
  const [desc, setDesc] = useState("");
  const [task, setTask] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [selectTask, setSelectTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(addtitle==="")
    {
      alert("Title is required")
    }
    else if(desc==="")
    {
      alert("Description is required")
    }
    else if(task==="")
    {
      alert("Assign the task ")
    }
    else if(startDate==="")
    {
      alert("Start Date is required")
    }
    else if(endDate==="")
    {
      alert("End Date is required")
    }
    else if(endDate < startDate)
    {
      alert("End Date should be greater then Start date")
    }
    else if(deadline < endDate)
    {
      alert("DateLine should be greater then Start date")
    }
    else if(deadline==="")
    {
      alert("Deadline Date is required")
    }
    else if(selectTask==="")
    {
      alert("Select the task")
    }
    else
    {
      const loadData = {addtitle, desc, task, startDate, endDate, deadline, selectTask}
      console.log(loadData);
      axios.post("http://127.0.0.1:5000/adminpage", loadData)
      .then(()=>{
        console.log("data saved succefully");
      })
      .catch(()=>{
        console.log("Error")
      })
      {setAddtitle("");
      setDesc("");
      setTask("")
      setStartDate("");
      setEndDate("");
      setDeadline("");
      setSelectTask("");}
    }
  }

  // getting user data from registration table
  useEffect(()=>{
    // axios.get(`http://127.0.0.1:5000/getuserdata?task=${task}`)
    // .then((userData)=>{
    //   const us=(userData)
    //   console.log(us)
    //   console.log("getting data succefully");
    // })
    // .catch(()=>{
    //   console.log("Error")
    // })

    axios.get(`http://127.0.0.1:5000/getuser`)
    .then((usedata)=>{
      
      
      setStore(usedata.data);
      console.log(usedata.data);
      console.log("getting data succefully");
    })
    .catch(()=>{
      console.log("Error")
    })
  },[])


  return (
    <>
      <div className='task_store'>
        <h1>Welcome to Admin Page</h1>
        <input type="text" onChange={(e) => { setAddtitle(e.target.value) }} placeholder='ADD Title' />
        <textarea name="area" onChange={(e) => { setDesc(e.target.value) }} id="" cols="30" rows="10" placeholder='Description'></textarea>
        <br />
        <label htmlFor="">Assign Task to User</label><br />
        <select name="" id="" onChange={(e) => { setTask(e.target.value) }}><br />
          <option value="">Select Users</option>
          {
            store.map((elem)=>{
              return <option value= {elem} >{elem[0]}</option>
            })
          }
        </select><br />
        <label htmlFor="" >Start-Date</label><br />
        <input type="date" onChange={(e) => { setStartDate(e.target.value) }} placeholder='Start-Date' /><br />
        <label htmlFor="" >End-Date</label><br />
        <input type="date" onChange={(e) => { setEndDate(e.target.value) }} placeholder='End-Date' /><br />
        <label htmlFor="" >DeadLine</label><br />
        <input type="date" onChange={(e) => { setDeadline(e.target.value) }} placeholder='DeadLine' /><br />
        <select name="" id="" onChange={(e) => { setSelectTask(e.target.value) }}><br />
          <option value="">Select Task</option>
          <option value="Todo">Todo</option>
          <option value="Progress">Progress</option>
          <option value="Ready to Test">Ready to test</option>
          <option value="Done">Done</option>
        </select>
        <input onClick={handleSubmit} type="submit" />
      </div>
    </>
  )
}

export default AdminPage