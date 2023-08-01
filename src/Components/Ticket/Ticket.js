import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import "./Ticket.css";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { addBooking } from '../MovieRedux/Slice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const Ticket = () => {

 
  const {selectedMovie,isLoading,BookingList} = useSelector((state) => state.movies);
 const dispatch = useDispatch();
 const history = useHistory();
 const [selectedSeats, setSelectedSeats] = useState([]);
 const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
 const cols = [1, 2, 3, 4, 5, 6, 7, 8,9,10];
 

 const handleClick = (seat) => {
  if (selectedSeats.includes(seat)) {
    setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
  } else {
    setSelectedSeats([...selectedSeats, seat]);
  }
};

const getTotalPrice = () => {
 
  return selectedSeats.length * 200; 
};

const [showTime, setshowTime] = useState('');

const handleChange = (event) => {
  setshowTime(event.target.value);
};

  return (
    <div className="ticket-main">
      <Navbar/>
      <div className="ticket-content">
      <div className="seat-selector">
        <div className='seat-main'>
        <ul className="showcase">
        <li>
          <div className="seat"></div>
          <small>Available</small>
        </li>
        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div className="seat occupied"></div>
          <small>Occupied</small>
        </li>
      </ul>
      <div className='showTime'>
      <FormControl sx={{ m: 1, minWidth: 120,backgroundColor:"red" }} size="small">
      <InputLabel id="demo-select-small-label">Showtime</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={showTime}
        label="ShowTime"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"Morning"}>Morning</MenuItem>
        <MenuItem value={"Afternoon"}>Afternoon</MenuItem>
        <MenuItem value={"Evening"}>Evening</MenuItem>
        <MenuItem value={"Night"}>Night</MenuItem>
      </Select>
    </FormControl>
      </div>
        </div>
    
      <div className="seat-container">
        <div className="screen">Screen</div>
        {rows.map((row) => (
          <div key={row} className="row">
            {cols.map((col) => (
              <div
                key={`${row}${col}`}
                className={`seat ${
                  selectedSeats.includes(`${row}${col}`) ? 'selected' : ''
                } ${
                  row === 'J' ? 'occupied' : ''
                }`}
                id={`${row}${col}`}
                onClick={() => handleClick(`${row}${col}`)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <p className="text">
        <span>{selectedSeats.length}</span> Seats Selected for Rs.
        <span>{getTotalPrice()}</span>
      </p>
      <div className="confirm-ticket">
        <button
          className="btn btn-danger"
          id="confirm-ticket-id"
          // onClick={handleconfirm}
        >
          Confirm Ticket
        </button>
      </div>
    </div>
      </div>
    </div>
  )
}


