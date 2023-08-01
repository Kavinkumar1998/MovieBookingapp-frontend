import React, { useEffect } from 'react'
import "./MovieInfo.css"
import Navbar from '../Navbar/Navbar'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieById } from '../MovieRedux/Slice';
import { useHistory } from 'react-router-dom'
import { Button, LinearProgress } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import StarIcon from '@mui/icons-material/Star';

export  const MovieInfo = () => {

  const {Id} = useParams();
  const {selectedMovie,isLoading} = useSelector((state) => state.movies);
 const dispatch = useDispatch();
 const history = useHistory();
  useEffect(()=>{
    dispatch(getMovieById(Id))
  },[dispatch]);


  return (
    <div className="MovieInfo">
<Navbar/>
<div className="MovieInfo-Main">
{isLoading ?(<LinearProgress/>):(

 <div className="movieinfo-bacdrops">
 {selectedMovie.backdrops && selectedMovie.backdrops.link && (
              <img className="backdrop-mi" src={selectedMovie.backdrops.link}  alt={selectedMovie.title} />
            )}
  <div className="MovieInfo-content">
     <div className="MovieInfo-left">
<img  src={selectedMovie.image} className="movieinfo-img" alt={selectedMovie.title}/>
     </div>
     <div className="MovieInfo-right">
<div className="MovieInfo-title">{selectedMovie.title}</div>
<span className="MovieInfo-details"><span ><StarIcon className='icon' sx={{color:"yellow",marginBottom:"-5px"}}/></span>{selectedMovie.imDbRating}</span>
<span className="MovieInfo-details"><span ><AccessTimeOutlinedIcon sx={{marginBottom:"-6px"}} className='icon'/></span>{selectedMovie.runtimeStr}</span>
<span className="MovieInfo-details">{selectedMovie.contentRating}-Rated</span>
<span className="MovieInfo-details">4K</span>
<span className="MovieInfo-details">Doloby-Atoms</span>
<p className="MovieInfo-details">{selectedMovie.plot}</p>
<div className="MovieInfo-details">Genre : {selectedMovie.genres}</div>
<div className="MovieInfo-details">Director : <br/>{selectedMovie.directors}</div>
<div className="MovieInfo-details">Stars : <br/>{selectedMovie.stars && selectedMovie.stars.join(" , ")}</div>
<div className="MovieInfo-details">Box Office  <br/>{selectedMovie.boxOffice && selectedMovie.boxOffice &&(
  <div className="MovieInfo-details">Budget :{selectedMovie.boxOffice.budget}</div>
)}</div>
<Button variant="contained" color="success" onClick={()=>{history.push(`/BookTicket`)}}>Book Ticket</Button>
     </div>  
     <div className="trailer-backdrops">
     {selectedMovie.trailer && selectedMovie.trailer.linkEmbed &&(
         <iframe className="trailer" title ={selectedMovie.trailer.title} src={selectedMovie.trailer.linkEmbed}></iframe>
      )}
   </div>
 </div> 
 
  </div>
  
)}
</div>
    </div>
  )
}


