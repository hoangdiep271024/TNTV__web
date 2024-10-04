import { useTheme } from "@emotion/react";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React from "react";
import ChangeMode from "../ChangeMode";
import { useState, useEffect } from "react";
// const [login, setLogin] = useState('');




const Header = ({ onLoginClick, onSignupClick }) => {
  const theme = useTheme();
  useEffect(() => {
    fetch('/api/userInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
      })
      .catch(error => console.error('Error:', error));
  }, []);
  return (
    <div
      style={{
        height: "70px",
        width: "100vw",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          marginLeft: "5px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <LiveTvIcon />
        <Typography
          variant="span"
          style={{ marginTop: "4px", fontSize: "20px" }}
        >
          TNTV Movie Tickets
        </Typography>
      </Box>
      <Box sx={{ alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
  id="outlined-search"
  label="Search..."
  type="search"
  InputLabelProps={{
    style: {
      fontFamily: "Arial",
      fontSize: "14px",
      textAlign: "center",
      top: "-6.5px",
    },
  }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <SearchIcon sx={{ cursor: "pointer" }} />
      </InputAdornment>
    ),
    sx: {
      height: '40px', 
    },
  }}
  sx={{
    width: '230px',
    '& .MuiOutlinedInput-root': {
      height: '40px', 
    },
    '& .MuiInputBase-input': {
      padding: '10px', 
    },
  }}
/>
          <Button
            sx={{
              textTransform: "none",
              color: theme.palette.mode === "light" ? "black" : "white",
              border: `1px solid ${
                theme.palette.mode === "light" ? "black" : "white"
              }`,
              width:'100px',
              height:'37px'
            }}
            onClick={onSignupClick}
          >
            Đăng ký
          </Button>
          <Button
            sx={{
              textTransform: "none",
              color: theme.palette.mode === "light" ? "black" : "white",
              backgroundColor:
                theme.palette.mode === "light" ? "#a0ba50" : "#0184FA",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "light" ? "grey" : "#005bb5", // Màu nền khi hover
              },
              width: '100px'
            }}
            onClick={onLoginClick}
          >
            Đăng nhập
          </Button>
          <ChangeMode />
        </Box>
      </Box>
    </div>
  );
};

export default Header;
