import React, { useState, useEffect } from 'react'
import Shared from '../Shared'
import Footer from '../Footer/Footer'
import Box from '@mui/material/Box'
import DOMPurify from "dompurify";
import { useTheme } from '@emotion/react';
export default function NewDetail() {
  const theme = useTheme();
  const new_id =localStorage.getItem('new_id')
  const [dataDetail, setDataDetail] = useState();
  const fetchNewDetail = async () => {
    try {
      const response = await fetch(`/api/new/${new_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setDataDetail(result);
        console.log(result);
      } else {
        console.error('Lỗi khi truy cập:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi mạng:', error);
    }
  };
  useEffect(() => {
    fetchNewDetail()
  }, [])
  return (
    <Box>
      <Shared/>
      <Box sx= {{display: 'flex', width: '80%', marginLeft: '8%', gap: '4%', marginTop: '19vh'}}>
          {dataDetail && <Box sx= {{width: '57%', minWidth: '730px', backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#383836', borderRadius: '10px', padding: '20px 15px'}}>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dataDetail[0].new_content) }} /> 
            </Box>}
      </Box>
      <Footer/>
    </Box>
  )
}
