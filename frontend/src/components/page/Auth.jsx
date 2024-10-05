import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useState } from "react";
import Login from "../Account/Login";
import Signup from "../Account/Signup";
import Ticket__film from "../film/Ticket__film";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";
import { useTheme } from "@emotion/react";
import Profile from "../Account/Profile";
export default function Auth() {
    const [isClickLogin, setIsClickLogin] = useState(false);
    const [isClickProfile, setIsClickProfile] = useState(false);
    const LoginClick = () => {
      setIsClickLogin(!isClickLogin);
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
    const ProfileClick = () =>{
      setIsClickProfile(!isClickProfile)
    }
    const theme = useTheme();


  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{top: '0',left: '0',position: 'fixed', backgroundColor: theme.palette.mode === "light" ? "white" : "#121212"}}>
      <Header onLoginClick={LoginClick} onSignupClick={SignupClick} onProfileClick={ProfileClick}></Header>
      <Navbar></Navbar>
      </div>
    
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
      {isClickProfile &&  <>
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
            onClick={ProfileClick}
          />{" "}
          <Profile/>
        </>}
       <Ticket__film></Ticket__film>
    </Box>
  )
}