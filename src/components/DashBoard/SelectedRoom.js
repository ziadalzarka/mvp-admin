import React, { useState } from 'react'
import { Button, Row } from 'react-bootstrap'

import { TbArrowBigRightLineFilled } from 'react-icons/tb';
import { RiDeleteBin5Fill } from 'react-icons/ri';

import goldMedal from "../../images/medals/gold.png";
import silverMedal from "../../images/medals/silver.png";
import bronzeMedal from "../../images/medals/bronze.png";
import normalMedal from "../../images/medals/normal.png";
import { useParams } from 'react-router-dom';
const medals = [goldMedal, silverMedal, bronzeMedal, normalMedal, normalMedal];

// today date
var today = new Date();
var currDay = ('0' + today.getDate()).slice(-2);
var currMonth = ('0' + (today.getMonth()+1)).slice(-2);
var currYear =  today.getFullYear();

const SelectedRoom = () => {
  const {id}= useParams();
  const [rooms, setRooms] = useState({
    "results": [
      {
        "_id": "63cc06801e2a5edff27f01e4",
        "startDate":"2022-03-17",
        "endDate": "2022-03-23",
        "players": [
          "yassin",
          "fo2sh",
          "yousef",
          "ziad" ,
          "hamed"    
        ],
        "coinsSummary": {
          "fo2sh": 26.5,
          "yassin": 59.5,
          "yousef": 80 ,
          "ziad" : 70 ,
          "hamed" : 40    
        },
        "prizeRanges": [
          200,
          100,
          50
        ],
        "name": "Room 1"
      } ,
      {
        "_id": "63cc06343e2a5edff27f01e3",
        "startDate":"2023-03-17",
        "endDate": "2023-03-23",
        "players": [
          "yassin",
          "fo2sh",
          "yousef",
          "ziad" ,
          "hamed"    
        ],
        "coinsSummary": {
          "fo2sh": 26.5,
          "yassin": 59.5,
          "ziad": 80 ,
          "yousef": 70 ,
          "hamed" : 40    
        },
        "prizeRanges": [
          200,
          100,
          50
        ],
        "name": "Room 2"
      },
      {
        "_id": "63cc063345e2a5edff27f01e3",
        "startDate": "2022-09-09",
        "endDate": "2023-09-13",
        "players": [
          "yassin",
          "fo2sh",
          "yousef",
          "ziad" ,
          "hamed"    
        ],
        "coinsSummary": {
          "fo2sh": 26.5,
          "yassin": 59.5,
          "ziad": 80 ,
          "yousef": 70 ,
          "hamed" : 40    
        },
        "prizeRanges": [
          200,
          100,
          50
        ],
        "name": "Room 3"
      },
      {
        "_id": "63cc06343e2asad5edff27f01e3",
        "startDate": "2022-09-09",
        "endDate": "2023-09-13",
        "players": [
          "yassin",
          "fo2sh",
          "yousef",
          "ziad" 
        ],
        "coinsSummary": {
          "fo2sh": 26.5,
          "yassin": 59.5,
          "ziad": 80 ,
          "yousef": 70   
        },
        "prizeRanges": [
          200,
          100,
          50
        ],
        "name": "Room 4"
      }
    ]
  });
  for(let i=0 ; i < rooms.results.length ; i++) {
    for (var k1 in rooms.results[i].players)
    for (var k2 in rooms.results[i].players)
    if (rooms.results[i].coinsSummary[rooms.results[i].players[k1]] > rooms.results[i].coinsSummary[rooms.results[i].players[k2]])
    [rooms.results[i].players[k1], rooms.results[i].players[k2]] =
    [rooms.results[i].players[k2], rooms.results[i].players[k1]];
  }

  return (
    <>
  {rooms.results.map((data) => (data._id===id ?
    <div key={data._id} className={
        data.startDate.slice(-10 ,-6)<=currYear && data.startDate.slice(-10 ,-6)>=currYear&&
        data.startDate.slice(-5 ,-3)<=currMonth && currMonth<=data.endDate.slice(-5 ,-3)&&
        data.startDate.slice(-2)<=currDay && currDay<=data.endDate.slice(-2)?
      'bg-success m-1 my-4 py-3 p-4 rounded row col-12 text-white ':
      'bg-light m-1 my-4 py-3 p-4 rounded row col-12 text-dark'} >

       <h2 className={
         data.startDate.slice(-10 ,-6)<=currYear && data.startDate.slice(-10 ,-6)>=currYear&&
         data.startDate.slice(-5 ,-3)<=currMonth && currMonth<=data.endDate.slice(-5 ,-3)&&
         data.startDate.slice(-2)<=currDay && currDay<=data.endDate.slice(-2)?
            "col-sm-4  fw-bold" : 'col-8 fw-bold'} >{data.name}</h2> 
          <div className={
            data.startDate.slice(-10 ,-6)<=currYear && data.startDate.slice(-10 ,-6)>=currYear&&
            data.startDate.slice(-5 ,-3)<=currMonth && currMonth<=data.endDate.slice(-5 ,-3)&&
            data.startDate.slice(-2)<=currDay && currDay<=data.endDate.slice(-2)?
            "d-none" : 'col-4 text-center p-0 ' }>
            <Button className='delete-btn  col-sm-6 col-9 border-0 fs-4'>
              <RiDeleteBin5Fill/>
            </Button>
          </div>
        <div className={
          data.startDate.slice(-10 ,-6)<=currYear && data.startDate.slice(-10 ,-6)>=currYear&&
          data.startDate.slice(-5 ,-3)<=currMonth && currMonth<=data.endDate.slice(-5 ,-3)&&
          data.startDate.slice(-2)<=currDay && currDay<=data.endDate.slice(-2)?
          'row col-sm-8  py-3 fw-bold': 'row py-3 text-secondary fw-bold' }>
          <span className='col-12 date'>
            <span className='mx-2'> {data.startDate}</span> 
             <TbArrowBigRightLineFilled className='fs-1 '/> 
            <span className='mx-2'>{data.endDate}</span>
          </span>
        </div>
          {data.players.map((player, index) => (
            <div className="single-score" key={player}>
              <span className="fw-bold">{player}</span>
              <span className="">
                {index < 5 && (
                  <img
                    className="prize-icon"
                    src={medals[index]}
                    alt="medal"
                  />
                )}
                <span className={
                  data.startDate.slice(-10 ,-6)<=currYear && data.startDate.slice(-10 ,-6)>=currYear&&
                  data.startDate.slice(-5 ,-3)<=currMonth && currMonth<=data.endDate.slice(-5 ,-3)&&
                  data.startDate.slice(-2)<=currDay && currDay<=data.endDate.slice(-2)?
                'fw-bold text-warning' : 'fw-bold text-danger'}>
                  {data.prizeRanges[index]} EGP</span>
                <span className='px-2'>{data.coinsSummary[player]} pts</span>
              </span>
            </div>
          ))}
    </div> : ''
   ))} 
  </>
  )
}

export default SelectedRoom
