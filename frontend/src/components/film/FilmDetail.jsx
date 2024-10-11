import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Shared from '../Shared';
import FilmInfo from './FilmInfo';

export default function FilmDetail() {
  const { film_name } = useParams();
  const decodedFilmName = decodeURIComponent(film_name);

  const [data, setData] = useState(null);
  const film_id = localStorage.getItem('film_id');

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
  
        return (
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
          />
        );
      })()}
    </>
  );
}
