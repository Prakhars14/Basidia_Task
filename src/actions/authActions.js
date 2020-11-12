import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GoogleSpreadsheet } from 'google-spreadsheet';
import jwt from "jsonwebtoken";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  try{
    sheetfunc(userData);
    history.push("/signin")
  }
  catch{
          dispatch({
        type: GET_ERRORS,
        payload: "Try Again"
      })
  }
};
const sheetfunc=async(userData)=>{
  const SHEET_ID = process.env.REACT_APP_SHEET_ID;
  const doc = new GoogleSpreadsheet(SHEET_ID);
  await doc.useServiceAccountAuth({
      private_key: process.env.REACT_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
      client_email: process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
  });

  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0];
  await sheet.addRow({ Name: userData.name, Email: userData.email, Password: userData.password });
}

// Login - get user token
export const loginUser = (userData, history) => async dispatch => {
  
  try{
    
    const SHEET_ID = process.env.REACT_APP_SHEET_ID;
    const doc = new GoogleSpreadsheet(SHEET_ID);
    await doc.useServiceAccountAuth({
        private_key: process.env.REACT_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
        client_email: process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
    });
  
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows(); 
    rows.map(row=>{
      if(row.Email===userData.email&&row.Password===userData.password){
        const payload = {
          id: userData.email,
          name: userData.name
        };// Sign token
        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            localStorage.setItem("jwtToken", "Bearer " + token);
            const tokenr = "Bearer " + token;
            history.push("/home")
            setAuthToken(tokenr);
            const decoded = jwt_decode(tokenr);
            dispatch(setCurrentUser(decoded));
          }
        ); 
      }
    })
  }
  catch{
    dispatch({
      type: GET_ERRORS,
      payload: "Try Again"
    })
  }

  // axios.post("/api/users/login", userData)
  //   .then(res => {
  //     // Save to localStorage// Set token to localStorage
  //     const { token } = res.data;
  //     localStorage.setItem("jwtToken", token);
  //     // Set token to Auth header
  //     setAuthToken(token);
  //     // Decode token to get user data
  //     const decoded = jwt_decode(token);
  //     // Set current user
  //     dispatch(setCurrentUser(decoded));
  //   })
  //   .catch(err =>
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.response.data
  //     })
  //   );
};
const sheetread=async(userData)=>{
  const SHEET_ID = process.env.REACT_APP_SHEET_ID;
  const doc = new GoogleSpreadsheet(SHEET_ID);
  await doc.useServiceAccountAuth({
      private_key: process.env.REACT_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
      client_email: process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
  });

  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows(); 
  rows.map(row=>{
    if(row.Email===userData.email&&row.Password===userData.password){
      const payload = {
        id: userData.email,
        name: userData.name
      };// Sign token
      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          localStorage.setItem("jwtToken", "Bearer " + token);
          return "Bearer "+token;
        }
      );
      
    }
    return true;
  })
}

// Set logged in user
export const setCurrentUser = decoded => {
  console.log("decodedd",decoded)
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};