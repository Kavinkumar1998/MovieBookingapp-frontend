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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import StarIcon from '@mui/icons-material/Star';
import GooglePayButton from "@google-pay/button-react";

export const Ticket = () => {

 
  const {selectedMovie,isLoading,BookingList} = useSelector((state) => state.movies);
 const dispatch = useDispatch();
 const history = useHistory();
 const [selectedSeats, setSelectedSeats] = useState([]);
 const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
 const cols = [1, 2, 3, 4, 5, 6, 7, 8,9,10];
 
//for seat
 const handleClick = (seat) => {
  if (selectedSeats.includes(seat)) {
    setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
  } else {
    setSelectedSeats([...selectedSeats, seat]);
  }
};


//for price

const  total=  getTotalPrice()
function getTotalPrice() {
 
  return selectedSeats.length * 200; 
};

//for show time
const [showTime, setshowTime] = useState('');

const handleChange = (event) => {
  setshowTime(event.target.value);
};

//for date
const [selectedDate, setSelectedDate] = useState();

const handleDateChange = (date) => {
  setSelectedDate(date);
 
};
const formattedDate = selectedDate ? selectedDate.toLocaleDateString() : '';
//for modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:400,
  height:500,
  border: '2px solid white',
  borderRadius:"10px",
  boxShadow: 24,
  p: 4,
  backgroundColor:"black"
};

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //adding data in server
  const addticket=(movie,date,showTime,seat,amount)=>{
    
   const values={
      movie,date,showTime,seat,amount
    }
dispatch(addBooking(values))
history.push("/Bookeddata")
  }

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
      <div className='showTime-date'>
        <div>
        <h4>Select a Date</h4>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
      />
      
        </div>
        <div>
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
        <Button variant="contained" color="success"  onClick={handleOpen}  id="confirm-ticket-id" > Confirm Ticket</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <div className='modal-content'>
    <div className="modal-left">
<img  src={selectedMovie.image} className="modal-img" alt={selectedMovie.title}/>
     </div>
  <div className="modal-right">
<div className="modal-title">{selectedMovie.title}</div><br/>
<span className="modal-details"><span ><StarIcon className='icon' sx={{color:"yellow",marginBottom:"-5px"}}/></span>{selectedMovie.imDbRating}</span>
<span className="modal-details"><span ><AccessTimeOutlinedIcon sx={{marginBottom:"-6px",size:"5px"}} className='icon'/></span>{selectedMovie.runtimeStr}</span>
<span className="modal-details">4K</span><br/>
<br/>
<div className="showtime">ShowTime : {showTime}</div><br/>
<div className='Date'>Date: {formattedDate}</div>
</div>
    </div>
    <br/>
    <hr />
  <div className="ticket-seat">
    <div className="ticket">Tickets : {selectedSeats.length}</div>
    <div className="Seats"> Seats : {selectedSeats.join(",")}</div>
  </div>
  <hr />
  <div className='booking-summary'>
    <div className="ticketprice">Ticket Price : Rs. 200</div>
    <div className='total'>Total Price : {selectedSeats.length} x Rs. 200 = Rs. {total}</div>
  </div>
  <GooglePayButton
              className='gpay'
            buttonColor="white"
            buttonType="pay"
            environment="TEST"
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: "CARD",
                  parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["MASTERCARD", "VISA"],
                  },
                  tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: {
                      gateway: "example",
                      gatewayMerchantId: "exampleGatewayMerchantId",
                    },
                  },
                },
              ],
              merchantInfo: {
                merchantId: "12345678901234567890",
                merchantName: "Demo Merchant",
              },
              transactionInfo: {
                totalPriceStatus: "FINAL",
                totalPriceLabel: "Total",
                totalPrice: `${total}`,
                currencyCode: "INR",
                countryCode: "IN",
              },
            }}
            onLoadPaymentData={() => { addticket(selectedMovie,formattedDate,showTime,selectedSeats,total) }}
          />
  </Box>
</Modal>
      </div>
    </div>
      </div>
    </div>
  )
}


