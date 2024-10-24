import React from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Link } from 'react-router-dom';
export default function FilmInfo(props) {
  return (
    <Box sx={{width: '100vw', minHeight: '35vh', backgroundColor: 'black', marginTop: '20vh', display: 'flex', alignItems: 'center', gap: 2.5, color: 'white', justifyContent:'center', paddingTop: '10px', paddingBottom: '10px'}}>
     <img src= {props.image} style={{width: 'auto', height: '30vh', objectFit: 'cover'}}></img>
     <div style={{alignItems: 'start', width: '45vw', textWrap: 'wrap'}}>
     <Typography variant="h5" component="h5" sx={{ fontWeight: 'bold'}}>{props.name}</Typography>
     <div style={{display: 'flex', justifyContent:'start', gap: '5px', alignItems:'center'}}>
      <Typography>Thể loại:</Typography>
     <Typography>{props.type}</Typography>
     </div>
    
     <div style={{display: 'flex', justifyContent: 'start', gap: '10px', width: '40vh', marginTop: '10px'}}>
      <button style={{width:'70px', height:'30px', backgroundColor: 'white', color: 'black', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems:'center', gap: 1.4}}>
        <FavoriteIcon/>
        Thích
        </button>
      <button style={{width:'70px', height:'30px', backgroundColor: 'white', color: 'black', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems:'center', gap: 1.4}}>Đánh giá</button>
      <button style={{width:'70px', height:'30px', backgroundColor: 'white', color: 'black', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems:'center', gap: 1.4}}>Trailer</button>
      <button style={{width:'70px', height:'30px', backgroundColor: 'white', color: 'black', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems:'center', gap: 1.4}}>Mua vé</button>
     </div>
     <Typography style={{ marginTop: '7px', fontSize: '14px'}} >{props.descript}</Typography>
     <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '7px'}}>
      <Box>
      <div style={{display: 'flex', justifyContent:'start', gap: '5px', alignItems:'center'}}>
      <Typography>Đánh giá</Typography>
      <StarIcon/>
     </div>
     <div style={{textAlign: 'center'}}>{`${props.evalute}/5`}</div>
      </Box>
      <Box>
      <div style={{display: 'flex', justifyContent:'start', gap: '5px', alignItems:'center'}}>
      <Typography>Khởi chiếu</Typography>
      <NewReleasesIcon/>
     </div>
     <div style={{textAlign: 'center'}}>{props.release}</div>
      </Box>
      <Box>
      <div style={{display: 'flex', justifyContent:'start', gap: '5px', alignItems:'center'}}>
      <Typography>Thời lượng</Typography>
      <AccessTimeIcon/>
     </div>
     <div style={{textAlign: 'center'}}>{`${props.time} phút`}</div>
      </Box>
      <Box>
      <div style={{display: 'flex', justifyContent:'start', gap: '5px', alignItems:'center'}}>
      <Typography>Độ tuổi giới hạn</Typography>
      <SupervisedUserCircleIcon/>
     </div>
     <div style={{textAlign: 'center'}}>{props.age}</div>
      </Box>
     </div>
     
     </div>
     <div style= {{width:'20vw', marginLeft: '20px'}}>
      <div>Diễn viên</div>
      {props.actors.map((actor, index) => {
  return (
    <span key={actor.actor_id}>
      <Link to={`/actor/${actor.actor_id}`} style={{ color: '#53dce0', textDecoration: 'none' }}>
        {actor.actor_name}
      </Link>
      {index < props.actors.length - 1 && <span>, </span>}
    </span>
  );
})}
      <div>Đạo diễn</div>
      {props.directors.map((director, index) => {
  return (
    <span key={director.director_id}>
      <Link to={`/director/${director.director_id}`} style={{ color: '#53dce0', textDecoration: 'none' }}>
        {director.director_name}
      </Link>
    </span>
  );
})}
     </div>
     
    </Box>
  )
}
