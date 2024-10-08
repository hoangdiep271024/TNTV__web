import React from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from "@emotion/react";
import { Link } from 'react-router-dom';

function createSlug(name) {
  return name
    .trim() // Xóa khoảng trắng ở đầu và cuối
    .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, '-'); // Thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
}
export default function Film_card(props) {
  const name = createSlug(props.name);
  const theme = useTheme();

  return (
    <Link to={`/auth/${name}`} key={props.index}  style={{textDecoration:'none', width: '150px', height: '300px', paddingLeft: '4px', marginTop:'8px', cursor:'pointer', color: theme.palette.mode === "light" ? "black" : "white"}}>
        <img style={{borderRadius: '4px', width:'150px', height:'auto', objectFit: 'cover'}} src={props.image}></img>
        <Typography style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '800'}}>{props.name}</Typography>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography style={{color: theme.palette.mode === "light" ? "#807d77" : "white", fontSize: '13px'}} >{props.date}</Typography>
        <div>
           <FavoriteIcon style={{color: theme.palette.mode === "light" ? "red" : "white"}}></FavoriteIcon>
           {/* <p>{props.evaluate}</p> */}
        </div>

        </div>
       
    </Link>
  )
}
