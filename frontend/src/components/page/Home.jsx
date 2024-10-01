import React from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navbar from '../navbar/Navbar';
import HeaderHome from '../header/HeaderHome';

export default function Home() {
  return (
    <div>
      <Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <HeaderHome></HeaderHome>
      <Navbar></Navbar>
      </Box>
    </div>
  )
}
