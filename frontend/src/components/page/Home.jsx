
import Box from "@mui/material/Box";
import React, { useState } from 'react';
import HeaderHome from '../header/HeaderHome';
import Navbar from '../navbar/Navbar';

export default function Home() {
  return (
    <>
      <div>
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
          }}
        >
          <HeaderHome />
          <Navbar />
        </Box>
      </div>
    </>
  );
}
