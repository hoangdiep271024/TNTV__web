import React, { useEffect } from 'react'
import Footer from '../Footer/Footer'
import Shared from '../Shared'
import Box from '@mui/material/Box'

export default function CinemaTime() {
  const cinema_name = localStorage.getItem('cinema_name')
  const cinema_id = localStorage.getItem('cinema_id')
  const cluster_name = localStorage.getItem('cluster_name')
  const cinema_address = localStorage.getItem('cinema_address')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/rap/cinema_id=${cinema_id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();
            console.log(result);
            // setData(result);
  
        } else {
          console.error("Lỗi khi truy cập:", response.statusText);
        }
      } catch (error) {
        console.error("Lỗi mạng:", error);
      }
    };
  }, [cinema_id]);
 
  return (
    <>
    <Shared/>
    <Box sx={{width : '100vw', height: 'auto', minHeight: '20vh', backgroundColor: 'red', marginTop: '17vh', display: 'flex', justifyContent: 'center', gap :2}}>
          {cluster_name === 'Beta Cinemas' && (
            <img src="/beta.jpg" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cluster_name === 'CGV Cinemas' && (
            <img src="/cgv.jpg" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cluster_name === 'Lotte Cinemas' && (
            <img src="/lotte.png" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cluster_name === 'Cinestar' && (
            <img src="/cinestar.png" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cluster_name === 'Mega GS Cinemas' && (
            <img src="/mega.png" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cluster_name === 'Dcine' && (
            <img src="/dcine.png" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cluster_name === 'Starlight' && (
            <img src="/starlight.jpeg" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cluster_name === 'Rio Cinemas' && (
            <img src="/riocinema.png" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cluster_name === 'Touch Cinema' && (
            <img src="/touch.jpeg" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cluster_name === 'Cinemax' && (
            <img src="/beta.jpg" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
            {cluster_name === 'Đống Đa Cinema' && (
            <img src="/dongda.png" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          <Box>
            <div style={{fontSize: '25px', fontWeight: '800'}}>{cinema_name}</div>
            <p>{cinema_address}</p>
            <p>{cluster_name}</p>
            <a target="_blank" href={`https://www.google.com/maps/search/${createSlug(encodeURIComponent(cinema_name))}`}>Bản đồ</a>
            <p>{`Xem Lịch chiếu và Mua vé tại ${cinema_name} - rạp ${cluster_name} toàn quốc dễ dàng - nhanh chóng tại NHTT. Rạp ${cinema_name} được xây dựng với tiêu chuẩn rạp Hollywood, chuẩn âm thanh Dolby 7.1, màn hình lớn, sắc nét. ${cinema_name} là rạp chiếu phim thuộc hệ thống ${cluster_name} - 1 chuỗi rạp chiếu phim thuộc sở hữu nội địa. Dù là rạp nội địa nhưng ${cinema_name} cam kết dịch vụ chuyên nghiệp - trải nghiệm điện ảnh quốc tế và giá vé hạt dẻ.`}</p>
          </Box>
    </Box>
    
    <Footer/>
    </>
  )
}
function createSlug(name) {
  return name
    .trim() // Xóa khoảng trắng ở đầu và cuối
    .replace(/\s+/g, '+') // Thay thế khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, '+'); // Thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
}