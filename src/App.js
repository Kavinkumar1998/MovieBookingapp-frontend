import './App.css';
import { Route } from 'react-router-dom';
import { Signup } from './Components/Signup/Signup';
import { Login } from './Components/Login/Login';
import { Forgetpassword } from './Components/Forgetpassword/Forgetpassword';
import { VerifyOTP } from './Components/Verifyotp/Verifyotp';
import { Setpassword } from './Components/Setpassword/Setpassword';
import Navbar from './Components/Navbar/Navbar';
import { Home } from './Components/Home/Home';
import { Ticket } from './Components/Ticket/Ticket';

function App() {
  return (
    <div className="App">

<Route  exact path = "/">
     <Login/>
      </Route>

<Route  exact path = "/Signup">
     <Signup/>
      </Route>

      <Route path="/Forgetpassword">
     <Forgetpassword/>
      </Route>

      <Route path="/Verifyotp">
     <VerifyOTP/>
      </Route>

      <Route path="/Setpassword">
     <Setpassword/>
      </Route>
     

      <Route path="/Navbar">
     <Navbar/>
      </Route>

      <Route path="/Home">
        <Home/>
      </Route>

      <Route path="/BookTicket">
        <Ticket/>
      </Route>


    </div>
  );
}

export default App;
