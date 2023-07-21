import './App.css';
import { Route } from 'react-router-dom';
import { Signup } from './Components/Signup/Signup';
import { Login } from './Components/Login/Login';
import { Forgetpassword } from './Components/Forgetpassword/Forgetpassword';
import { VerifyOTP } from './Components/Verifyotp/Verifyotp';
import { Setpassword } from './Components/Setpassword/Setpassword';

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
     
    </div>
  );
}

export default App;
