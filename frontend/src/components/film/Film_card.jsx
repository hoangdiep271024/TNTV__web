import React from 'react';
import { Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from "@emotion/react";
import { useNavigate } from 'react-router-dom'; // Thay vì Link
import { useState } from 'react';

function createSlug(name) {
  return name
    .trim() // Xóa khoảng trắng ở đầu và cuối
    .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, '-'); // Thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
}

export default function Film_card(props) {
  const name = createSlug(props.name);
  const theme = useTheme();
  const [index, setIndex] = useState(props.index);
  const navigate = useNavigate(); 

  const handleNavigate = (film_name, film_id) => {
    localStorage.setItem('film_id', film_id)
  navigate(`/phim/${film_name}`);
  };

  return (
    <div 
      onClick={ () => handleNavigate( encodeURIComponent(createSlug(props.name)), props.index)} 
      style={{ 
        textDecoration: 'none', 
        width: '150px', 
        height: '300px', 
        paddingLeft: '4px', 
        marginTop: '8px', 
        cursor: 'pointer', 
        color: theme.palette.mode === "light" ? "black" : "white" 
      }}
    >
      <img 
        style={{ borderRadius: '4px', width: '150px', height: 'auto', objectFit: 'cover' }} 
        src={props.image} 
        alt={props.name} 
      />
      <Typography style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '800' }}>
        {props.name}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography style={{ color: theme.palette.mode === "light" ? "#807d77" : "white", fontSize: '13px' }}>
          {props.date}
        </Typography>
        <div style={{display:'flex'}}>
          <span style={{color: theme.palette.mode === "light" ? "#807d77" : "white", fontSize: '13px'}}>{props.rate}</span>
          <StarIcon style={{ color: theme.palette.mode === "light" ? "yellow" : "white" , marginTop:'-1px',height:'18px',width:'18px',marginRight:'-6px'}} />
        </div>
      </div>
    </div>
  );
}
