import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Row } from 'react-bootstrap'
import GetCookie from '../../hooks/getCookie';
import { Link } from 'react-router-dom';
import { BsPersonFillAdd } from 'react-icons/bs';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import PlayersCharts from './PlayersCharts';



const AddRoom = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [roomName, setRoomName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [playerList, setplayerList] = useState([]);
  const [player, setPlayer] = useState('');
  const [prizerangeList, setPrizerangeList] = useState([]);
  const [prizerange, setPrizerange] = useState('');

  const token = GetCookie("Token");
  const url = "https://coral-app-35v54.ondigitalocean.app/rooms";

  const addPlayerHandler = () => {
    playerList.push(player)
    setPlayer('')
  }
  const addPrizeHandler = () => {
    prizerangeList.push(prizerange)
    setPrizerange('')
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      setError(null);
      const response = await axios.post(
        url,
        {
          name: roomName,
          startDate: startDate,
          endDate: endDate,
          players: playerList,
          prizeRanges: prizerangeList
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const responseData = await response;
      console.log(responseData.data);
      setIsLoading(false);
    }
    catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err.response.data.error || "SomeThing Went Wrong , Please Try Again .");
    }
    setRoomName(''); setEndDate(''); setStartDate('');
  }
  return (
    <>
    <Row className='p-0 py-3 justify-content-center m-0 '>
      <form onSubmit={formSubmitHandler}
        className='bg-info text-dark col-lg-10 col-12 p-3 m-0 row justify-content-center rounded'>
        
        <label className='fw-bold fs-3 col-sm-5 col-10 m-1 text-start'>Room Name : </label>
        <input type='name'
          value={roomName}
          onChange={(e) => { setRoomName(e.target.value) }}
          className='col-sm-5 col-10 m-1 border-0 rounded p-2'
          placeholder="Room Name" />

        <label className='fw-bold fs-3 col-sm-5 col-10 m-1 text-start'>Start Date : </label>
        <input type='date'
          value={startDate}
          onChange={(e) => { setStartDate(e.target.value) }}
          className='col-sm-5 col-10 m-1 border-0 rounded p-2'
          placeholder="Room Name" />
        <label className='fw-bold fs-3 col-sm-5 col-10 m-1 text-start'>End Date  : </label>
        <input type='date'
          value={endDate}
          onChange={(e) => { setEndDate(e.target.value) }}
          className='col-sm-5 col-10 m-1 border-0 rounded p-2'
          placeholder="Room Name" />

        <label className='fw-bold fs-3 col-sm-5 col-10 m-1 text-start'>Players : </label>
        <input type='name'
          value={player}
          onChange={(e) => { setPlayer(e.target.value) }}
          className='col-sm-4 col-8 m-1 border-0 rounded p-2' placeholder="Add Players" />
        <Button className='col-sm-1 col-2 bg-success border-0 fs-3 m-1' onClick={addPlayerHandler}>
          <BsPersonFillAdd />
        </Button>

        <label className='fw-bold fs-3 col-sm-5 col-10 m-1 text-start'>Prize Range : </label>
        <input type='number'
          value={prizerange}
          onChange={(e) => { setPrizerange(e.target.value) }}
          className='col-sm-4 col-8 m-1 border-0 rounded p-2' placeholder="Add PrizeRange" />
        <Button className='col-sm-1 col-2 bg-warning border-0 fs-3 m-1' onClick={addPrizeHandler}>
          <BsDatabaseFillAdd />
        </Button>


        <Row className='justify-content-center p-3 '>
          <Button disabled={!roomName || !startDate || !endDate || playerList.length === 0 || prizerangeList.length === 0}
            type='submit' className='col-md-3 col-5 p-2 mx-2 fw-bold'>
            Add Room
          </Button>
          <Link to='/rooms'
            className='delete-btn col-md-3 col-4 p-3 mx-2 fw-bold  border-0 text-white rounded'>
            Cancel
          </Link>
        </Row>
      </form>
    </Row>
    <PlayersCharts />
   </>
  )
}

export default AddRoom
