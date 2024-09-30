import Box from "@mui/material/Box";
import React from 'react';
import styled from 'styled-components';
import { useState } from "react";
const SubmitButton = styled.input`
  width: 85%;
  height: 40px;
  margin-top: 20px;
  border-radius: 7px;
  outline: none;
  border: none;
  background-color: #12263F;
  color: white;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: black;
  }
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    user__name: '',
    gmail: '',
    phone__number: '',
    birthday: '',
    sex: '',
    password: '',
    rePassword: ''
  });

  // Hàm cập nhật dữ liệu trong form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Hàm xử lý submit
  const handleSubmit = async (e) => {
    // e.preventDefault();
    // console.log('Thông tin form:', formData)
    
    if (formData.password !== formData.rePassword) {
      alert('Mật khẩu không khớp');
      return;
    }

    try {
      const response = await fetch('/api/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        // Xử lý thành công
        const data = await response.json();
        console.log('Đăng ký thành công:', data);
      } else {
        // Xử lý lỗi
        console.error('Lỗi khi đăng ký:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi mạng:', error);
    }
  };

    return (
        <div>
            <Box
      sx={{
        position: "absolute",
        zIndex: "10",
        top: "0",
        left: "0",
        width: "25vw",
        height: "100vh",
        backgroundColor: "#fff",
        transition: 'linear',
        paddingLeft:'25px',
        paddingTop:'30px'
      }}
      autoComplete="off"
    >
      <form onSubmit={handleSubmit}>
        <label className="name__label" style={{color:'#000'}}>Họ và tên</label>
        <br/>
        <input className="name"  name="name" type="text" onChange={handleChange} required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px', marginBottom: '10px'}}></input>
         <br/>
         <label className="user__name" name="user__name" onChange={handleChange} style={{color:'#000'}}>Tên đăng nhập</label>
        <br/>
        <input className="user__name"  name="user__name" onChange={handleChange} type="text" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px', marginBottom: '10px'}}></input>
         <br/>
         <label className="gmail__label" style={{color:'#000'}}>E-mail</label>
        <br/>
        <input className="gmail"  name="gmail" onChange={handleChange} type="text" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px', marginBottom: '10px'}}></input>
         <br/>
         <label className="phone__label" style={{color:'#000'}}>Số điện thoại</label>
        <br/>
        
        <input className="phone__number" onChange={handleChange}  name="phone__number" type="text" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px', marginBottom: '10px'}}></input>
         <br/>
         <label className="birthday__label" style={{color:'#000'}}>Ngày sinh</label>
        <br/>
        <input className="birthday" onChange={handleChange}  name="birthday" type="date" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px', marginBottom: '10px'}}></input>
         <br/>
         <div style={{display: 'flex', alignItems:'center',gap:'8px'}}>
          <p style={{color:'black'}}>Giới tính:</p>
         <label style={{color: 'black'}}>
    <input className='gender' onChange={handleChange} type="radio" name="sex" value="male"/>
    Nam
  </label>
  <label style={{color: 'black'}}>
    <input className='gender' onChange={handleChange} type="radio" name="sex" value="female"/>
    Nữ
  </label>
         </div>
        
  
         <label className="password__label" style={{color:'#000'}}>Mật khẩu</label>
        
         <br/>
         <input className="Password" onChange={handleChange}  name="password" type="password" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px', marginBottom: '10px'}}></input>
         <br/>
         <label className="password__label" style={{color:'#000'}}>Xác nhận mật khẩu</label>
         <br/>
        
         <input className="rePassword" onChange={handleChange} name="rePassword" type="password" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px'}}></input>
         <SubmitButton type="submit" value="Đăng ký" />
      </form>
      
    </Box>
        </div>
    );
};

export default Signup;