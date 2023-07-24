import './App.css';
import { Route } from 'react-router-dom';
import { Signup } from './Components/Signup/Signup';
import { Login } from './Components/Login/Login';
import { Forgetpassword } from './Components/Forgetpassword/Forgetpassword';
import { VerifyOTP } from './Components/Verifyotp/Verifyotp';
import { Setpassword } from './Components/Setpassword/Setpassword';
import Header from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';

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
     
     
      <Route path="/Home">
     <Header/>
      </Route>

      <Route path="/Navbar">
     <Navbar/>
      </Route>
    </div>
  );
}

export default App;
