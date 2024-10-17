import React from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography } from '@mui/material';
import FilmList from './FilmList';
import { useState, useEffect } from 'react';
import Film_card from './Film_card';
import { useTheme } from "@emotion/react";
export default function Ticket__film() {
  
  const theme = useTheme()
  const [data, setData] = useState([[]]);
  const [showing, setShowing] = useState(true)
  useEffect(() => {
    fetch('/api/film/filmShowing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(responseData => {
      setData(responseData); // Lưu dữ liệu vào state
    })
    .catch(error => console.error('Error:', error));
  }, []); 
  const showingClick = () =>{
    setShowing(true)
  }
  const unShowingClick = () =>{
    setShowing(false)
  }

  return (
   <Box sx={{width: '100vw', marginTop: '17vh'}}>
    
    {theme.palette.mode === "light" && showing &&(
      <Box sx={{display: 'flex' , alignItems: 'center', textAlign:'center', justifyContent: 'center', gap: '15px'}}>
      <div style={{ fontSize: '20px',cursor: 'pointer', color: '#babfc2'}} onClick={showingClick}>Đang chiếu</div>
      <div style={{ fontSize: '50px'}} >|</div>
    <div style={{ fontSize: '20px',cursor: 'pointer'}} onClick={unShowingClick}>Sắp chiếu</div>
    </Box>
    )}
    {theme.palette.mode === "light" && !showing &&(
      <Box sx={{display: 'flex' , alignItems: 'center', textAlign:'center', justifyContent: 'center', gap: '15px'}}>
      <div style={{ fontSize: '20px',cursor: 'pointer'}} onClick={showingClick}>Đang chiếu</div>
      <div style={{ fontSize: '50px'}} >|</div>
      <div style={{ fontSize: '20px',cursor: 'pointer', color: '#babfc2'}} onClick={unShowingClick}>Sắp chiếu</div>
    </Box>
    )}
    {theme.palette.mode === "dark" && showing &&(
      <Box sx={{display: 'flex' , alignItems: 'center', textAlign:'center', justifyContent: 'center', gap: '15px'}}>
      <div style={{ fontSize: '20px',cursor: 'pointer', color: '#00BCD4'}} onClick={showingClick}>Đang chiếu</div>
      <div style={{ fontSize: '50px'}} >|</div>
    <div style={{ fontSize: '20px',cursor: 'pointer'}} onClick={unShowingClick}>Sắp chiếu</div>
    </Box>
    )}
    {theme.palette.mode === "dark" && !showing &&(
      <Box sx={{display: 'flex' , alignItems: 'center', textAlign:'center', justifyContent: 'center', gap: '15px'}}>
      <div style={{ fontSize: '20px',cursor: 'pointer'}} onClick={showingClick}>Đang chiếu</div>
      <div style={{ fontSize: '50px'}} >|</div>
      <div style={{ fontSize: '20px',cursor: 'pointer', color: '#00BCD4'}} onClick={unShowingClick}>Sắp chiếu</div>
    </Box>
    )}

<FilmList>
  {showing && data[0].map((item, index) => {
    const datee = item.Release_date.substring(0, 10);
    const year = datee.substring(0, 4);
    const month = datee.substring(5, 7);
    const day = datee.substring(8, 10);
    const exactlyDate = `${day}/${month}`;
    return item.film_type === 1 && (
      <Film_card
        key={item.film_id}  
        index={item.film_id}  
        image={item.film_img}
        name={item.film_name}
        date={exactlyDate}
      />
    );
  })}
  {!showing && data[0].map((item, index) => {
    const datee = item.Release_date.substring(0, 10);
    const year = datee.substring(0, 4);
    const month = datee.substring(5, 7);
    const day = datee.substring(8, 10);
    const exactlyDate = `${day}/${month}`;
    return item.film_type === 2 && (
      <Film_card 
      key={item.film_id}  
      index={item.film_id}  
        image={item.film_img}
        name={item.film_name}
        date={exactlyDate}
      />
    );
  })}
</FilmList>

   </Box>
  )
}
