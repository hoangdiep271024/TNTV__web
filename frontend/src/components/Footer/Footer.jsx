import React from 'react'
import { useTheme } from '@emotion/react'
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import './footer.css'
export default function Footer() {
    const theme = useTheme();
  return (
    <Box sx={{width: '100vw', height: '400px', backgroundColor: '#3586FF', marginTop: '180px', position:'relative'}}>
      <div className='waves'>
        <div className='wave wave1'></div>
        <div className='wave wave2'></div>
        <div className='wave wave3'></div>
        <div className='wave wave4'></div>
      </div>
 {/* {theme.palette.mode === "dark" && <img src='/white.gif' style={{marginTop: '-15px',width: '50px', height: 'auto', objectFit: 'cover'}}></img>}
        {theme.palette.mode === "light" && <img src='/black.gif' style={{marginTop: '-15px', width: '50px', height: 'auto', objectFit: 'cover'}}></img>} */}
    </Box>
  )
}
