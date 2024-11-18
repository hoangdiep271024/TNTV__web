import React, { useState, useEffect } from 'react'
import Shared from "../Shared";
import Footer from '../Footer/Footer';
import Box from '@mui/material/Box';

export default function Films() {
    const [formData, setFormData] = useState({
        filmType: '',
        country: '',
        categoryId: '',
      });
      const [dataa, setDataa] = useState(null)
      const handleSubmit = () => {fetch('/api/film/phim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          };
          useEffect(() => {
            handleSubmit();
        }, []);
          useEffect(() => {
            if (formData.filmType || formData.country || formData.categoryId) {
              handleSubmit();
            }
          }, [formData]);
  return (
   <Box>
    <Shared/>
    <Box sx={{marginTop: '20vh', display: 'flex', justifyContent: 'center'}}>
    <select onChange={handleChange} className="filmType" value={formData.filmType} name="filmType" style={{outline: 'none', borderRadius: '7px', border: '1px solid #e6e4e3', height: '35px', width: '10vw', fontSize: '17px', paddingLeft: '7px'}}>
          <option selected hidden>Trạng thái</option>
          <option value="1">Đang chiếu</option>
          <option value="2">Sắp chiếu</option>
          <option value="4">Tất cả</option>
          </select>
     <select onChange={handleChange} className="categoryId"  name="categoryId" value={formData.categoryId} style={{ marginLeft: '10vw',outline: 'none', borderRadius: '7px', border: '1px solid #e6e4e3', height: '35px', width: '10vw', fontSize: '17px', paddingLeft: '7px'}}>
          <option value="" selected hidden> Thể loại</option>
          <option value="1">Kinh Dị</option>
          <option value="3">Hành Động</option>
          <option value="4">Tội Phạm</option>
          <option value="5">Phiêu Lưu</option>
          <option value="6">Hoạt Hình</option>
          <option value="7">Gia Đình</option>
          <option value="8">Khoa Học Viễn Tưởng</option>
          <option value="9">Bí Ẩn</option>
          <option value="10">Giả Tưởng</option>
          <option value="11">Lãng Mạn</option>
          <option value="12">Drama</option>
          <option value="13">Giật Gân</option>
          <option value="14">Âm Nhạc</option>
          <option value="15">Tiểu Sử</option>
          <option value="16">Lịch Sử</option>
          <option value="2">Hài kịch</option>
          <option value="17">Chiến Tranh</option>
          <option value="18">Tất cả</option>
    </select>
    <select onChange={handleChange} className="country" value={formData.country} name="country" style={{ marginLeft: '10vw', outline: 'none', borderRadius: '7px', border: '1px solid #e6e4e3', height: '35px', width: '10vw', fontSize: '17px', paddingLeft: '7px'}}>
          <option value="" selected hidden>Quốc gia</option>
          <option value="0">Việt Nam</option>
          <option value="1">Quốc gia khác</option>
          <option value="2">Tất cả</option>
          </select>
    
    </Box>
    {dataa && <Footer/>}
   </Box>
  )
}
