import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import FilmInfo from '../film/FilmInfo';
import { Link } from 'react-router-dom';
import { useTheme } from "@emotion/react";
import Footer from '../Footer/Footer';
import Shared from '../Shared';

function createSlug(name) {
  return name
    .trim()
    .replace(/\s*:\s*/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function FilmDetail() {
  const { film_name } = useParams();
  const [selectedArea, setSelectedArea] = useState(null);
  const [data, setData] = useState(null);
  const film_id = localStorage.getItem('film_id');
  const theme = useTheme();

  const handleAreaChange = (newArea) => {
    setSelectedArea(newArea); 
  };

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

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await fetch(`/api/film/filmInfo/id=${film_id}/lichChieu/khuVuc_id=${selectedArea?.region_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result);
        } else {
          console.error('Lỗi khi truy cập:', response.statusText);
        }
      } catch (error) {
        console.error('Lỗi mạng:', error);
      }
    };

    if (film_id && selectedArea) {
      fetchCinemas();
    }
  }, [film_id, selectedArea]);

  return (
    <>
    <Shared></Shared>
      {data && (() => {
        const item = data.info.film[0]; 
        const exactlyDate = item.Release_date.substring(8, 10) + '/' + item.Release_date.substring(5, 7) + '/' + item.Release_date.substring(0, 4);
  
        return (
          <>
            <FilmInfo
              image={item.film_img}
              name={item.film_name}
              type={data.info.categorys}
              descript={item.film_describe}
              evalute={JSON.parse(data.info.evaluate[0].film_rate).toFixed(1)}
              release={exactlyDate} 
              time={item.duration}
              age={item.age_limit}
              actors={data.info.actors}
              directors={data.info.directors}
            />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '7%', paddingTop: "15px", fontSize: '16px' }}>
              <Link to={`/phim/${encodeURIComponent(createSlug(data.info.film[0].film_name))}`} style={{ textDecoration: 'none', cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>Thông tin</Link>
              <Link to={`/lich_chieu/${encodeURIComponent(createSlug(data.info.film[0].film_name))}`} style={{ textDecoration: 'none', cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>Lịch chiếu</Link>
              <Link to={`/danh_gia/${encodeURIComponent(createSlug(data.info.film[0].film_name))}`} style={{ textDecoration: 'none', cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>Đánh giá</Link>
              <Link to={`/mua_ve/${encodeURIComponent(createSlug(data.info.film[0].film_name))}`} style={{ textDecoration: 'none', cursor: 'pointer', color: theme.palette.mode === 'dark' ? '#c7c1c1' : '#8a8888' }}>Mua vé</Link>
            </div>
            <hr style={{ width: "42%", marginLeft: '29%' }} />
          </>
        );
      })()}
      <Footer/>
    </>
  );
}
