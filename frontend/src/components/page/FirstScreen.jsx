import React from 'react';
import { Box } from '@mui/material';
import Text from '../\bText';

export default function FirstScreen() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        padding: '0'
      }}
    >
      {/* Video nền */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: '0vh',
          left: '0',
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
        //   borderRadius: '30%',
        
          zIndex: -2, 
        }}
      >
        <source src="/first.mp4" type="video/mp4" />
    
      </video>

    
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: `linear-gradient(-90deg, rgb(26, 25, 25, 0.99) 50%, transparent 100%, transparent 60%, #1a1919 100%)`,
          zIndex: -1, 
        }}
      />

    <Box sx={{position: 'absolute', left: '50vw', width: '50vw'}}>
        <Text fullText ="CChào mừng bạn đến với NHTT Movie Ticket!"></Text>
        <div style={{width: '50vw', textAlign: 'center', fontFamily : 'Montserrat', fontWeight: '800', fontSize: '20px', color: '#fafafa', marginTop: '15px'}}>Dễ dàng đặt vé – Thỏa sức xem phim!</div>

    </Box>
    </Box>
  );
}

