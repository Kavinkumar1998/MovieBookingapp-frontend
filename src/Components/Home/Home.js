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
import { Button, LinearProgress } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import StarIcon from '@mui/icons-material/Star';
import Skeleton from '@mui/material/Skeleton';
export  const Home = () => {

  const history = useHistory();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };
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
    <SwiperSlide className='swiper-slide' key={movies._id}>
      <div className="backdrop-content">
<p className="backdrop-details-title">{movies.title}</p>
<span className="backdrop-details"><span ><StarIcon className='icon' sx={{color:"yellow"}}/></span>{movies.imDbRating}</span>
<span className="backdrop-details"><span ><AccessTimeOutlinedIcon className='icon'/></span>{movies.runtimeStr}</span>
<span className="backdrop-details">{movies.contentRating}</span>
<span className="backdrop-details">4K</span>
<span className="backdrop-details">Doloby-Atoms</span>

<p className="backdrop-details">{movies.plot}</p>
<Button variant="contained" color="success" onClick={()=>{history.push(`/Info/${movies._id}`)}}>Book Ticket</Button>
      </div>
   
      {movies.backdrops && movies.backdrops.link && (
              <img className="backdrop" src={movies.backdrops.link}  alt={movies.title} />
            )}
    </SwiperSlide>
  ))}
</Swiper>
</div>
<div className='Moviepart'>
<div className="container">
{movieList && movieList.map((movies) => (
        <div className="movie-container"  onClick={()=>{history.push(`/Info/${movies._id}`)}} key={movies._id}>
          {!imagesLoaded && (
         <Skeleton
         sx={{ bgcolor: 'grey.900' }}
         variant="rectangular"
         width={230}
         border = "2px solid white"
         borderRadius="15px"
         height={400}
         key= {movies._id}
         > <div className="movie-container" key= {movies._id} ></div>
         </Skeleton>
          )}
          <img
            className={`cards-img ${!imagesLoaded ? 'hidden' : ''}`}
            src={movies.image}
            alt={movies.title}
            onLoad={handleImageLoad}
          />
          {imagesLoaded && (
            <div className="text-overlay">
              <div className='overlay-title'>{movies.title}</div>
              <div className='overlay-rating'>
                <StarIcon className='icon' sx={{ color: "yellow" }} />
                {movies.imDbRating}/10
              </div>
            </div>
          )}
        </div>
      ))}


</div>
</div>
</div>)}
   </div>
    </div>
  )
}

