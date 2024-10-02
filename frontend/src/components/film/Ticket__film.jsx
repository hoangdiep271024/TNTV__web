import React from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography } from '@mui/material';
import FilmList from './FilmList';
import { useState } from 'react';
export default function Ticket__film() {

  const [data, setData] = useState([]);

fetch('/api/film', {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
},
})
.then(response => response.json())
.then( responseData => { setData(responseData);
  })
.catch(error => console.error('Error:', error));
console.log(data)

  return (
   <Box sx={{width: '100vw'}}>
<Typography sx={{textAlign: 'center', fontSize: '20px', fontWeight: ''}} >Mua vé theo phim</Typography>
<FilmList>

</FilmList>
   </Box>
  )
}
