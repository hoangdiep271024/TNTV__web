import React from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography } from '@mui/material';
export default function Ticket__film() {

var data;

fetch('/api/film', {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
},
})
.then(response => response.json())
.then( responseData => { data = responseData;
  processData();
  })
.catch(error => console.error('Error:', error));

function processData() {
   
}

  return (
   <Box sx={{width: '100vw'}}>
<Typography sx={{textAlign: 'center', fontSize: '20px', fontWeight: ''}} >Mua vé theo phim</Typography>

   </Box>
  )
}
