import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Shared from '../Shared';
import FilmInfo from './FilmInfo';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import { useTheme } from "@emotion/react";
function createSlug(name) {
  return name
  .trim() 
  .replace(/\s*:\s*/g, '-') // Thay thế dấu ":" và các khoảng trắng trước và sau nó bằng dấu gạch ngang
  .replace(/\s+/g, '-') // Thay thế tất cả khoảng trắng còn lại bằng dấu gạch ngang
  .replace(/-+/g, '-');  // Thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
}

export default function FilmDetail() {
  const { film_name } = useParams();
  const decodedFilmName = decodeURIComponent(film_name);

  const [data, setData] = useState(null);
  const film_id = localStorage.getItem('film_id');
  const theme = useTheme()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/film/filmInfo/id=${film_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            console.log(result)
            setData(result);
          } else {
            console.log(`Truy cập: ${result.message}`);
          }
        } else {
          console.error('Lỗi khi truy cập:', response.statusText);
        }
      } catch (error) {
        console.error('Lỗi mạng:', error);
      }
    };

    if (film_id) {
      fetchData();
    }
  }, [film_id]);
  return (
    <>
      <Shared />
      {data && (() => {
        const item = data.info.film[0]; 
        const datee = item.Release_date.substring(0, 10);
        const year = datee.substring(0, 4);
        const month = datee.substring(5, 7);
        const day = datee.substring(8, 10);
        const exactlyDate = `${day}/${month}/${year}`;
  
        return (<>
          <FilmInfo
            image={item.film_img}
            name={item.film_name}
            type={data.info.categorys[0].category_name}
            descript={item.film_describe}
            evalute="1"
            release={exactlyDate} 
            time = {item.duration}
            age= {item.age_limit}
            actors = {data.info.actors}
            directors = {data.info.directors}
          />
          <div style={{display: 'flex', justifyContent: 'center', gap: '7%', paddingTop: "15px", fontSize: '16px'}}>
        <Link to={`/phim/${encodeURIComponent(createSlug(data.info.film[0].film_name))}`} style={{textDecoration: 'none', cursor: 'pointer', color: theme.palette.mode === 'dark' ? '#c7c1c1' : '#8a8888'}}>Thông tin</Link>
        <Link to={`/lich_chieu/${encodeURIComponent(createSlug(data.info.film[0].film_name))}`} style={{textDecoration: 'none', cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'white' : 'black'}}>Lịch chiếu</Link>
        <Link to={`/danh_gia/${encodeURIComponent(createSlug(data.info.film[0].film_name))}`} style={{textDecoration: 'none', cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'white' : 'black'}}>Đánh giá</Link>
        <Link to={`/mua_ve/${encodeURIComponent(createSlug(data.info.film[0].film_name))}`} style={{textDecoration: 'none', cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'white' : 'black'}}>Mua vé</Link>
      </div>
      <hr style={{width:"42%", marginLeft: '29%'}}/>
<div style={{display: 'flex', justifyContent: 'center', width: '100vw', marginTop: '20px'}}> <iframe src={convertYouTubeLinkToEmbed(data.info.film[0].film_trailer)} width="60%" height="600px" frameborder="0" allowfullscreen></iframe></div>
     
       </> );
        
      })()}
      
    </>
  );
}
function convertYouTubeLinkToEmbed(link) {
  
  if (link.includes('youtu.be')) {
      const videoId = link.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${videoId}`;
  } 
  
  
  else if (link.includes('youtube.com/watch?v=')) {
      const videoId = link.split('v=')[1].split('&')[0]; // Tách VIDEO_ID và bỏ các tham số khác nếu có
      const startTime = link.includes('t=') ? link.split('t=')[1].replace('s', '') : 0; // Lấy thời gian bắt đầu nếu có
      return `https://www.youtube.com/embed/${videoId}?start=${startTime}`;
  }
  return link;
}
