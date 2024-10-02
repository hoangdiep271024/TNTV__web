import React from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
export default function Film_card(props) {
  return (
    <Box>
        <img src={props.image}></img>
        <Typography>{props.name}</Typography>
        <Typography>{props.date}</Typography>
        <div>
           <FavoriteIcon></FavoriteIcon>
           <p>{props.evaluate}</p>
        </div>

    </Box>
  )
}
