import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './Userpage.css';

const UserPage = () => {


  const {username} =useParams()
  const [alldata, setAlldata] = useState([])
  

  useEffect(()=>{
    axios.get(`http://127.0.0.1:5000/getuse?username=${username}`)
    .then((userData)=>{
      const us=(userData)
      console.log(us)
      console.log("getting data succefully");
      setAlldata(userData.data)
    })
    .catch(()=>{
      console.log("Error")
    })

  },[])

  return (
    <>
      <div className='userContain'>
        <h1>welcome {username}</h1>
        <table border={2}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Username</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
              alldata.map((element)=>{
                return (
                  <tr>
                    <>
                    <td value={element[0]}>{element[0]}</td> 
                    <td value={element[1]}>{element[1]}</td> 
                    <td value={element[2]}>{element[2]}</td> 
                    <td value={element[3]}>{element[3]}</td> 
                    <td value={element[4]}>{element[4]}</td> 
                    <td value={element[5]}>{element[5]}</td> 
                    <td value={element[6]}>{element[6]}</td> 
                    <td value={element[7]}>{element[7]}</td> 
                      <td>
                      <select name="" id="">
                        <option value="Todo">Todo</option>
                        <option value="Progress">Progress</option>
                        <option value="Ready for test">Ready for test</option>
                        <option value="done">done</option>
                      </select>
                    </td>
                    </>
              </tr>
                )
              })
              }
            
          </tbody>
        </table>
      </div>
    </>
  )
}

export default UserPage