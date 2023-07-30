import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    movieList:[],
    BookingList:[],
    selectedBooking:{},
    selectedMovie:{},
    isLoading:false,
    error:""

}

const Base_URL = "https://ticketbooker.onrender.com";


//get all data from server
export const getMovieFromServer= createAsyncThunk(
    "movies/getMovieFromsever",
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
            console.log("movieList",data);
            return data;
           }else{
            return rejectWithValue({ error: "No Movies Found" });
           }
    }
);

//get selected data from server

export const getMovieById= createAsyncThunk(
    "movies/getMovieById",
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
    "movies/addMovie",
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
export const addBooking = createAsyncThunk(
    "movies/addBooking",
    async(Booking,rejectWithValue)=>{
        const response = await fetch(`${Base_URL}/addTicket`,{
            meathod:"POST",
            body:JSON.stringify(Booking),
            headers:{
                "x-auth-token": localStorage.getItem("token"),
                "Content-Type":"application/json"
            }
        });
        if (response.ok) {
            const Ticket = await response.json();
            return Ticket;
          } else {
            return rejectWithValue({ error: "Something Went Wrong" });
          }
    }
);

//geting booking data
export const BookingData = createAsyncThunk(
    "movies/BookingData",
    async(_,rejectWithValue)=>{
       const response = await fetch(`${Base_URL}/Bookings`,{
        meathod:"GET",
        headers: {
            "x-auth-token": localStorage.getItem("token"),
           "Content-Type":"application/json"
          },
       });
       if(response.ok){
        const Bookings = await response.json();
        return Bookings
       }else{
        return rejectWithValue({error:"No Bookings Found"})
       }
    }
);

//getting Booking data by id
export const getBookingById = createAsyncThunk(
    "movies/getBookingById",
    async(id,rejectWithValue)=>{
        const response = await fetch(`${Base_URL}/Booking/${id}`,{
            meathod:"GET",
        headers: {
            "x-auth-token": localStorage.getItem("token"),
           "Content-Type":"application/json"
          },
        });
        if(response.ok){
            const Bookings = await response.json();
            return Bookings
           }else{
            return rejectWithValue({error:"No Bookings Found"})
           } 
    }
);


//deleteing booking data
export const deleteBookingData = createAsyncThunk(
    "movies/deleteBookingData",
    async(id,rejectWithValue)=>{
        const response = await fetch(`${Base_URL}/cancelBookings/${id}`,{
            method:"DELETE",
            headers: {
              "x-auth-token": localStorage.getItem("token"),
              "Content-Type":"application/json"}
        });
        if(response.ok){
            const data = await response.json();
            return data;
           }else{
            return rejectWithValue({error:"No Bookings Found"})
           } 
    }
);


const movieSlice = createSlice({
    name:"movieSlice",
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(getMovieFromServer.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getMovieFromServer.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.movieList=action.payload;
            state.error = ''
        })
        .addCase(getMovieFromServer.rejected,(state,action)=>{
            state.isLoading=false;
            state.movieList=[];
            state.error = action.payload.error;
        })
        .addCase(getMovieById.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getMovieById.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.selectedMovie=action.payload;
            state.error = ''
        })
        .addCase(getMovieById.rejected,(state,action)=>{
            state.isLoading=false;
            state.selectedMovie={};
            state.error = action.payload.error;
        })
        .addCase(addMovie.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(addMovie.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.movieList=action.payload;
            state.error = ''
        })
        .addCase(addMovie.rejected,(state,action)=>{
            state.isLoading=false;
            state.movieList=[];
            state.error = action.payload.error;
        })
        .addCase(addBooking.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(addBooking.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.BookingList=action.payload;
            state.error = ''
        })
        .addCase(addBooking.rejected,(state,action)=>{
            state.isLoading=false;
            state.BookingList=[];
            state.error = action.payload.error;
        })
        .addCase(BookingData.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(BookingData.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.BookingList=action.payload;
            state.error ='';
        })
        .addCase(BookingData.rejected,(state,action)=>{
            state.isLoading=false;
            state.BookingList=[];
            state.error = action.payload.error;
        })
        .addCase(getBookingById.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getBookingById.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.selectedMovie=action.payload;
            state.error ='';
        })
        .addCase(getBookingById.rejected,(state,action)=>{
            state.isLoading=false;
            state.selectedMovie={};
            state.error = action.payload.error;
        })
        .addCase(deleteBookingData.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(deleteBookingData.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.selectedMovie=action.payload;
            state.error ='';
        })
        .addCase(deleteBookingData.rejected,(state,action)=>{
            state.isLoading=false;
            state.selectedMovie={};
            state.error = action.payload.error;
        })
      
    }
});

export default movieSlice.reducer;