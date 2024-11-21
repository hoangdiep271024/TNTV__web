import React, { useEffect, useState } from 'react'
import Box  from '@mui/material/Box'
import Shared from '../Shared';
import Footer from '../Footer/Footer';
export default function Actor() {
    const actor_id = localStorage.getItem('actor_id')
    const[data, setData]= useState()
    const fetchActorData = async () => {
      try {
        const response = await fetch(`/api/actor/${actor_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          setData(result[0]);
          console.log(result[0]);
        } else {
          console.error('Lỗi khi truy cập:', response.statusText);
        }
      } catch (error) {
        console.error('Lỗi mạng:', error);
      }
    };
    useEffect(() => {
      fetchActorData()
    }, [])

    // const fetchActorData = async () => {
    //   try {
    //     const response = await fetch(`/api/actor/${actor_id}`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //     if (response.ok) {
    //       const result = await response.json();
    //       setData(result[0]);
    //       console.log(result[0]);
    //     } else {
    //       console.error('Lỗi khi truy cập:', response.statusText);
    //     }
    //   } catch (error) {
    //     console.error('Lỗi mạng:', error);
    //   }
    // };


  return (
    <Box>
      <Shared/>
      {data &&  <Box sx= {{width: '100vw', height: 'auto', minHeight: '35vh', display: 'flex', marginTop: '17vh', backgroundColor: 'black', alignItems: 'center', paddingLeft: '15vw', gap: 4, color: 'white'}}>
     
      <img src = {data.actor_img} style={{ width: '150px',
      height: 'auto'}}></img>
       
       <Box sx= {{height: 'auto', minHeight: '150px', paddingTop: '0', paddingRight: '20px'}}>
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
        <div style={{fontSize: '22px'}}>Diễn viên:</div>
        <div style={{fontSize: '26px', color : '#ebf5eb'}}>{data.actor_name}</div>
        </div>
       
        <div style={{color: '#e1e3e1', fontSize: '17px'}}>{data.actor_describe}</div>
       </Box>
      </Box>}
     

      {data && <Footer/>}

    </Box>
  )
}
