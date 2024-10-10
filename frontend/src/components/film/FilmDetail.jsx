import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

export default function FilmDetail() {
  const { film_name } = useParams();

  const decodedFilmName = decodeURIComponent(film_name);
  const film_id = location.state?.index;
  const [data, setData] = useState(null);
  useEffect(() => {
    const film_id = localStorage.getItem('film_id');
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
            setData(result.info);
            console.log(result);
          } else {
            const error_alert = `Truy cập: ${result.message}`;
            console.log(error_alert);
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
    <Box>

    </Box>
  );
}
