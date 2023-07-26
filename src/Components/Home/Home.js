import React, { useState } from 'react'
import "./Home.css"
import Navbar from '../Navbar/Navbar'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getMovieFromServer } from '../MovieRedux/Slice';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay,Navigation, Pagination } from 'swiper/modules';
import { LinearProgress } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
export  const Home = () => {

  const history = useHistory();
  const[Data,setData]= useState([]);
  const dispatch = useDispatch();
  const { movieList, isLoading } = useSelector((state) => state.movies);
console.log(movieList)
  useEffect(()=>{
    dispatch(getMovieFromServer());
 
  },[dispatch]);


  return (
    <div className='Home'>
   <Navbar/>
   <div className= "Home-main">
   {isLoading ? (
  <LinearProgress/>
) : (
<div className= "Home-content">
<div className='upper-part'>

 <Swiper 
     slidesPerView={1}
     spaceBetween={30}
     loop={true}
     pagination={{
     clickable: true,
                 }}
                 autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
     navigation={true}
      modules={[Pagination, Navigation,Autoplay]}
    className="mySwiper"
      > 
  {movieList && movieList.map((movies) => (
    <SwiperSlide id='swiper-slide' key={movies._id}>
      <div className="backdrop-content">
<p className="backdrop-details-title">{movies.title}</p>
<span className="backdrop-details">{movies.imDbRating}</span>
<span className="backdrop-details"><AccessTimeOutlinedIcon/>{movies.runtimeStr}</span>
<span className="backdrop-details">{movies.contentRating}</span>
<span className="backdrop-details">4K</span>
<span className="backdrop-details">Doloby-Atoms</span>
<p className="backdrop-details">{movies.plot}</p>
      </div>
      {movies.backdrops &&  (
              <img className="backdrop" src={movies.backdrops.link}  alt={movies.title} />
            )}
    </SwiperSlide>
  ))}
</Swiper>
</div>
<div className='Moviepart'>

</div>
</div>)}
   </div>
    </div>
  )
}

