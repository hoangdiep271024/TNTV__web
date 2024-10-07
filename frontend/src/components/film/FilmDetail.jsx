import React from 'react'
import { useParams } from 'react-router-dom';
export default function FilmDetail() {
  const { film_name } = useParams();
  const decodedFilmName = decodeURIComponent(film_name);
  return (
    <h1>Thông tin chi tiết về phim: {decodedFilmName}</h1>
  )
}
