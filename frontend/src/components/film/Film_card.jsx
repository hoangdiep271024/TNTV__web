import React from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from "@emotion/react";

export default function Film_card(props) {
  const theme = useTheme();
  return (
    <Box sx={{width: '150px', height: '300px', paddingLeft: '4px', marginTop:'8px'}}>
        <img style={{borderRadius: '4px', width:'150px', height:'auto', objectFit: 'cover'}} src={props.image}></img>
        <Typography style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '800'}}>{props.name}</Typography>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography style={{color: theme.palette.mode === "light" ? "#807d77" : "white", fontSize: '13px'}} >{props.date}</Typography>
        <div>
           <FavoriteIcon style={{color: theme.palette.mode === "light" ? "red" : "white"}}></FavoriteIcon>
           {/* <p>{props.evaluate}</p> */}
        </div>

        </div>
       
    </Box>
  )
}
