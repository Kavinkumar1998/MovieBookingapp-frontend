import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import "./Booked.css";
import { useDispatch, useSelector } from 'react-redux';
import { BookingData } from '../MovieRedux/Slice';
import { Button, LinearProgress } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import StarIcon from '@mui/icons-material/Star';

export const Booked = () => {
 
  const dispatch = useDispatch();

  const {BookingList,isLoading}= useSelector((state)=>state.movies)

  useEffect(()=>{
dispatch(BookingData());
  },[dispatch]) 

  return (
    <div className="Booked">
  <Navbar/>
  <div className="Booked-main"> 
{isLoading ?(<LinearProgress/>):(
  <div className="booked-details">
    {
      BookingList && BookingList.map((tickets)=>(
        <div className="booked-details-content" key={tickets._id}>
          <img className="ticket-image" src={tickets.movie.image}  alt={tickets.movie.title} />
<p className="ticket-details-title">{tickets.movie.title}</p>
<span className="ticket-details"><span ><StarIcon className='icon' sx={{color:"yellow",marginBottom:"-5px"}}/></span>{tickets.movie.imDbRating}</span>
<span className="ticket-details"><span ><AccessTimeOutlinedIcon sx={{marginBottom:"-6px"}} className='icon'/></span>{tickets.movie.runtimeStr}</span>
<span className="ticket-details">{tickets.movie.contentRating}</span>
<span className="ticket-details">{tickets.date}</span>
<span className="ticket-details">{tickets.showTime}</span>
<span className="ticket-details">{tickets.seat.join(",")}</span>
<span className="ticket-details">{tickets.amount}</span>
        </div>
      ))
    }
  </div>
)}
  </div>
    </div>
  )
}

 
