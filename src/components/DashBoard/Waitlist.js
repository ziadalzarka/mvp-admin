import React, { useEffect, useState } from 'react'
import { Button, Row } from 'react-bootstrap'
import GetCookie from '../../hooks/getCookie' ;
import ErrorModal from '../../LoadingSpinner/ErrorModal';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { BsPersonFillAdd } from 'react-icons/bs';

const Waitlist = () => {

const [list, setList] = useState([]);
const [searchName, setSearchName] = useState('');
const [addName, setAddName] = useState('');

const [loading, setLoading] = useState(true);
const [isLoading ,setIsLoading] = useState(false);
const [error , setError] = useState(false);

const token = GetCookie("Token") ;

const url = "https://coral-app-35v54.ondigitalocean.app/waitlist";
const params = JSON.stringify({
  "username": searchName
});

//render list
useEffect(() => {
  let timerId;
  if(loading) { 
    setIsLoading(true);
    timerId = setTimeout(async () => {
    await axios.get(url ,{
      headers :{
        'Authorization':`Bearer ${token}`
      }
    })
    .then(res => {
      setList(res.data)
    })
    setLoading(false)
    setIsLoading(false);  
    });  
} return () =>clearTimeout(timerId);
}, [loading]);
console.log(list)

//add username
const addUsername = async event =>{
  event.preventDefault();
  setIsLoading(true);
  try {
    setError(null);
    const response = await axios.post(
      url ,
      {username:addName} ,
      { headers :{
      'Authorization':`Bearer ${token}`,
      'Content-Type': 'application/json'
      }}
    );
   const responseData = await response;
   console.log(responseData.data) ;
   setIsLoading(false);
  } 
  catch (err) {
    console.log(err);
    setIsLoading(false);
    setError(err.response.data.error || "SomeThing Went Wrong , Please Try Again .");
  }
setAddName('')
}

//search users by name 
const searchUsername = async event =>{
  event.preventDefault();
  setIsLoading(true);
  event.preventDefault();
  const response = await axios.get(url, {
    headers: {
      'Authorization':` Bearer ${token}`,
      "content-type": "application/json",
    },
  },params
  )
  .then(function (response) {
    console.log(response.data);
    setIsLoading(false);
  })
  .catch(function (er) {
    setError(er.response.data.error);
    console.log(er.response.data);
    setIsLoading(false);
  });
  setSearchName('')
}

//modal error handler
const errorHandler =() =>{
  setError(null) ;
} 
  return (
    <div className='row w-100 justify-content-center p-0 m-0'>
    <ErrorModal error={error} onClear={errorHandler} />
    {isLoading && <LoadingSpinner asOverlay/>}
      <h1>Waitlist</h1> 
      <Row className='p-0'>
        <div className='col-lg-6 col-12 p-4 m-0 '>
          <input
          value={addName}
          onChange={(e) => { setAddName(e.target.value) }}
          type="name"
          placeholder="Add UserName"
          className="col-lg-8 col-8 p-3 rounded border-0 " />
          <Button disabled={!addName}
           className='add-btn col-md-2 col-3 mx-1 bg-info border-0 fs-3 ' onClick={addUsername}><BsPersonFillAdd/></Button>
        </div>
        <div className='col-lg-6 col-12 p-4 '>
          <input
          value={searchName}
          onChange={(e) => { setSearchName(e.target.value) }}
          type="name"
          placeholder="Search UserName"
          className="col-lg-8 col-8 p-3 rounded border-0" />
          <Button disabled={!searchName}
           className='search-btn col-md-2 col-3 mx-1 bg-success border-0 fs-3' onClick={searchUsername}> <FaSearch/></Button>
        </div>
      </Row>
      <Row>
        {list.map((user)=>(
          <div  key={user._id}>
            <span>{user.username} </span> <span>{user.added_at} </span>
          </div>
        ))}
      </Row>
    </div>
  )
}

export default Waitlist
