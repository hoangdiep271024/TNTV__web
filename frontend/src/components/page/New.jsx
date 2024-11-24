import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react'
import DOMPurify from "dompurify";

export default function New() {
  const [data, setData] = useState()
  const fetchNewData = async () => {
    try {
      const response = await fetch(`/api/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setData(result);
        console.log(result);
      } else {
        console.error('Lỗi khi truy cập:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi mạng:', error);
    }
  };
  useEffect(() => {
    fetchNewData()
  }, [])
  return (
    <Box>
    {data && 
      data.map((item, index) => (
        
          <Box>
          <div>{item.new_header}</div>
          <Box sx={{width: '60vw', paddingX: '4vw'}}> <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.new_content) }} /></Box>
         
          </Box>

        
      ))
    }
    </Box>
  )
}
