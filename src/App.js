import './App.css';
import Home from './components/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Weather from './components/Weather';
import Landing from './components/Landing';
import PrivateRoute from './components/Route/privateRoute';
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import store from "./store";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import Logout from './components/Logout';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  console.log("yaha");
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
  //   // Logout user
    store.dispatch(logoutUser());    // Redirect to login
    window.location.href = "./signin";
  }
}

const App = () => {

    return(
          <Provider store={store}>
            <BrowserRouter>
              <div> 
                <Route path="/" exact component={Landing} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Switch>
                  <PrivateRoute path="/home" exact component={Home} />
                  <PrivateRoute path="/weather" exact component={Weather} />
                  <PrivateRoute path="/logout" exact component={Logout} />
                </Switch>
              </div>
            </BrowserRouter>
          </Provider>
          )
      }


export default App;
