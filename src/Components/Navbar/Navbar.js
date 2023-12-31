import React from 'react'
import  "./Navbar.css";
import { Link, useHistory } from 'react-router-dom';



const Navbar = () => {
  
    const history = useHistory();
    const logout= ()=>{
        localStorage.clear();
        history.push("/")
    }

  return (
    <div className="navbar">
   <header className="mycinemas-header">
      <div className="title-header" >
        <div className="title1-header">ZEN</div>
        <div className="title2-header">Cinemas</div>
      </div>

      <div>
        <input type="checkbox" id="active" />
        <label htmlFor="active" className="menu-btn">
          <span />
        </label>
        <label htmlFor="active" className="close" />
        <div className="wrapper">
        <ul style={{listStyleType:"none"}}>
            <li>
            <Link  to="/Home">   <li>Home</li> </Link>
            </li>
            <li>
            <Link  to="/Bookeddata"> <li>Booked</li></Link>
            </li>
            <li>
            <Link  to="/Order"> <li>Order</li></Link>
            </li>
            <li>
            <Link  to="/Info"> <li>About</li></Link>
            </li>
            <li>
            <li  onClick={()=>logout()}>Logout</li>
            </li>
          </ul>
        </div>
      </div>
    </header>

     
    </div>
  )
}

export default Navbar

