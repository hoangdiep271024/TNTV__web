import React, { useState } from 'react'
import { useEffect } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useTheme } from '@mui/material/styles';

export default function AreaList() {
    const [areas, setAreas] = useState(null);
    const [areaClick, setAreaClick] = useState(null)
    const theme = useTheme();
    const fetchData = async () => {
        try {
          const response = await fetch(`/api/lichChieu/khuVuc`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const result = await response.json();
            if (result) {
              console.log(result)
              setAreas(result)
            //   setData(result);
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
      useEffect(() => {
        fetchData(); 
      }, []);
      
    useEffect(() => {
        console.log(areaClick); 
    }, [areaClick]);

    const AreaClick = (id) => {
        if (areas) {
            setAreaClick(id); 
        }
    };
  return (
    <Box sx = {{display: 'flex', justifyContent: 'center', alignItems: 'start'}}>
    <Box sx={{marginTop: '17vh'}}>
    <div style={{color: 'white',width: '200px', height: '30px', backgroundColor: '#2096F3', border: `1px solid ${theme.palette.mode === 'dark' ? '#c7c4c3' : '#c7c4c3'}`, cursor: 'pointer', display: 'flex',paddingLeft: '10px', alignItems: 'center', fontSize: '18px' , borderRadius: '5px 5px 0 0'}}>Khu vực</div>
    {areas && (
        areas.map((area, key) => {
            return (
                 <Box key={area.region_id} sx={{width: '200px', height: '30px',paddingRight: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: `1px solid ${theme.palette.mode === 'dark' ? '#c7c4c3' : '#c7c4c3'}`, cursor: 'pointer', paddingLeft: '10px', '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#14b5f5' : '#e9eef0',
                  }}} onClick={() => AreaClick(area.region_id)}>{area.region_name}
                   <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center',width: '22px', fontSize: '12px', height: '22px', borderRadius: '100%', backgroundColor: '#42bdff', color: 'white'}}>{area['count(*)']}</Box>
                 </Box>
            )
        })
    )}
    </Box>
    
    
    
    </Box>
    
  )
}
