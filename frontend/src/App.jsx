import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/Account/Login";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Signup from "./components/Account/Signup";

function App() {
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
    </Box>
  );
}

export default App;
