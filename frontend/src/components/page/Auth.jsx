import Box from "@mui/material/Box";
import { useState, } from "react";
import Login from "../Account/Login";
import Signup from "../Account/Signup";
import Ticket__film from "../film/Ticket__film";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";
export default function Auth() {
    const [isClickLogin, setIsClickLogin] = useState(false);
    const LoginClick = () => {
      setIsClickLogin(!isClickLogin);
      console.log(isClickLogin);
    };
    const[isClickSignup, setIsClickSignup]=useState(false);
    const SignupClick = () =>{
      setIsClickSignup(!isClickSignup);
      console.log(isClickSignup);
    }
    const SetAccClick = () =>{
      setIsClickLogin(!isClickLogin);
      setIsClickSignup(!isClickSignup);
    }



    fetch('/api/payment', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
    },
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
    
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Header onLoginClick={LoginClick} onSignupClick={SignupClick}></Header>
      <Navbar></Navbar>
      
      {isClickLogin && (
        <>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 9,
            }}
            onClick={LoginClick}
          />{" "}
          <Login onSetAccClick={SetAccClick}></Login>
        </>
      )}
      {isClickSignup && (
        <>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 8,
            }}
            onClick={SignupClick}
          />{" "}
          <Signup />
        </>
       
      )}
       <Ticket__film></Ticket__film>
    </Box>
  )
}