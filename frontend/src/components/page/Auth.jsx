import { useTheme } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import React, { useEffect, useRef, useState } from "react";
import Login from "../Account/Login";
import Profile from "../Account/Profile";
import Signup from "../Account/Signup";
import Ticket__film from "../film/Ticket__film";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";
import ForgetPassword from "../Account/ForgetPassword";
import ChatBotToggle from "../chatBot/ChatBotToggle";
import ChatBot from "../chatBot/ChatBot";
export default function Auth() {
  const [isClickLogin, setIsClickLogin] = useState(false);
  const [isClickProfile, setIsClickProfile] = useState(false);
  const [isClickForgotPassword, setIsClickForgotPassword] = useState(false);
  const LoginClick = () => {
    setIsClickLogin(!isClickLogin);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [isClickSignup, setIsClickSignup] = useState(false);
  const SignupClick = () => {
    setIsClickSignup(!isClickSignup);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  
  }
  const SetAccClick = () => {
    setIsClickLogin(!isClickLogin);
    setIsClickSignup(!isClickSignup);
  }
  const ProfileClick = () => {
    setIsClickProfile(!isClickProfile)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const forgotPasswordClick =() => {
    setIsClickLogin(false)
    setIsClickForgotPassword(!isClickForgotPassword)
    console.log(isClickForgotPassword)
  }
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false); 
  const toggleChatClick = () => {
    setIsOpen(!isOpen); 
    console.log('open r')
  };
  return (
    <><Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ top: '0', left: '0', position: 'fixed', backgroundColor: theme.palette.mode === "light" ? "white" : "#121212" }}>
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
            onClick={LoginClick} />{" "}
          <Login onSetAccClick={SetAccClick} onSetForgotPassword={forgotPasswordClick}></Login>
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
            onClick={SignupClick} />{" "}
          <Signup />
        </>

      )}
      {isClickProfile && <>
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
          onClick={ProfileClick} />{" "}
        <Profile />
      </>}
      {isClickForgotPassword && (
        <>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 4
            }}
            onClick={forgotPasswordClick} />{" "}
          <ForgetPassword></ForgetPassword>
        </>
      )}
      <Ticket__film></Ticket__film>
    </Box>
    {!isOpen && <Box sx={{position:'fixed', right: '3vw', top: '90vh'}}>
    <ChatBotToggle toggleChat={toggleChatClick}></ChatBotToggle>
    </Box>}
    {isOpen && <Box sx={{position:'fixed', right: '3vw', bottom: '20px', width: '20vw', height: '32vh'}}>
      
      <ChatBot closeClick={toggleChatClick}></ChatBot>
      </Box>}
    </>
  );
}