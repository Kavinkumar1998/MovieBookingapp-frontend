import React, { useEffect } from 'react'
import "./MovieInfo.css"
import Navbar from '../Navbar/Navbar'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieById } from '../MovieRedux/Slice';
import { useHistory } from 'react-router-dom'
import { LinearProgress } from '@mui/material';

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

     </div>
 </div>
   
  </div>
)}
</div>
    </div>
  )
}


