import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    movieList:[],
    BookingList:[],
    selectedBookong:{},
    selectedMovie:{},
    isLoading:false,
    error:" "

}

const Base_URL = "https://ticketbooker.onrender.com";


//get all data from server
export const getMovieFromServer= createAsyncThunk(
    "movie/getMovieFromsever",
    async(_,rejectWithValue)=>{
        const response = await fetch(`${Base_URL}/getMovie`,{
            method:"GET",
            headers: {
              "x-auth-token": localStorage.getItem("token"),
             "Content-Type":"application/json"
            },
           });
           if(response.ok){
            const data = await response.json();
            return data
           }else{
            return rejectWithValue({ error: "No Movies Found" });
           }
    }
);

//get selected data from server

export const getMovieById= createAsyncThunk(
    "movie/getMovieById",
    async(id,rejectWithValue)=>{
        const response = await fetch(`${Base_URL}/movie/${id}`,{
            meathod:"GET",
            headers: {
                "x-auth-token": localStorage.getItem("token"),
               "Content-Type":"application/json"
              },
        });
        if(response.ok){
            const data = await response.json();
            return data;
        }else{
            return rejectWithValue({error:"No Movie Found"})
        }
    }
);

//add Movie
export const addMovie = createAsyncThunk(
    "movie/addMovie",
    async(movie,rejectWithValue)=>{
        const response = await fetch(`${Base_URL}/addMovie`,{
            meathod:"POST",
             body: JSON.stringify(movie),
            headers: {
                "x-auth-token": localStorage.getItem("token"),
               "Content-Type":"application/json"
              },
        });
        if (response.ok) {
            const movie = await response.json();
            return movie;
          } else {
            return rejectWithValue({ error: "Something Went Wrong" });
          }
    }
);

//adding booking
