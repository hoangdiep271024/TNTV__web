import React from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography } from '@mui/material';
import FilmList from './FilmList';
import { useState, useEffect } from 'react';
import Film_card from './Film_card';
export default function Ticket__film() {

  const [data, setData] = useState([[]]);
  useEffect(() => {
    fetch('/api/film', {
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


  return (
   <Box sx={{width: '100vw'}}>
<Typography sx={{textAlign: 'center', fontSize: '20px', fontWeight: ''}} >Mua vé theo phim</Typography>
<FilmList>
  {data[0].map((item, index) => {
//      const date = item.Release_date;

//      // Lấy ngày, tháng, năm từ đối tượng Date
//      const day = String(date.getDate()).padStart(2, '0'); // Thêm số 0 ở đầu nếu cần
//      const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
//      const year = date.getFullYear();
//  const datee = `${day}-${month}-${year}`
    const datee = item.Release_date.substring(0,10);
const year = datee.substring(0,4)
const month = datee.substring(5,7)
const day = datee.substring(8,10)
const exactlyDate = `${day}/${month}`
console.log(datee)
    return (
    <Film_card
    key = {item.index}
    image = {item.film_img}
    name = {item.film_name}
    date = {exactlyDate}
    />)
  })
  }
</FilmList>

   </Box>
  )
}
