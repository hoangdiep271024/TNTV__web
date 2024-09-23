import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { Typography } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import { useTheme } from "@emotion/react";
import ChangeMode from "../ChangeMode";
const Header = () => {
  const theme = useTheme();

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
        <Box sx={{display: 'flex', alignItems: 'center', gap :1}}>
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
                style: { height: "40px", fontSize: "14px", width: "200px" },
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{cursor:'pointer'}} />
                  </InputAdornment>
                ),
                style: { height: '40px', fontSize: '14px', width: '200px' }
              }}
          />
          <Button
        sx={{
          textTransform: 'none',
          color: theme.palette.mode === 'light' ? 'black' : 'white',
          border: `1px solid ${theme.palette.mode === 'light' ? 'black' : 'white'}`
        }}
      >
        Register
      </Button>
      <Button
  sx={{
    textTransform: 'none',
    color: theme.palette.mode === 'light' ? 'black' : 'white',
    backgroundColor: theme.palette.mode === 'light' ? '#a0ba50' : '#0184FA',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light' ? 'grey' : '#005bb5', // Màu nền khi hover
    },
  }}
>
  Login
</Button>
<ChangeMode/>
        </Box>

      </Box>
    </div>
  );
};

export default Header;
