import React from 'react';
import FormControl from "@mui/material/FormControl";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
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
      <form method="post">
        <label className="name__label" style={{color:'#000'}}>Họ và tên</label>
        <br/>
        <input className="name"  name="name" type="text" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px', marginBottom: '10px'}}></input>
         <br/>
         <label className="user__name" name="user__name" style={{color:'#000'}}>Tên đăng nhập</label>
        <br/>
        <input className="user__name"  name="user__name" type="text" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px', marginBottom: '10px'}}></input>
         <br/>
         <label className="gmail__label" style={{color:'#000'}}>E-mail</label>
        <br/>
        <input className="gmail"  name="gmail" type="text" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px', marginBottom: '10px'}}></input>
         <br/>
         <label className="phone__label" style={{color:'#000'}}>Số điện thoại</label>
        <br/>
        
        <input className="phone__number"  name="phone__number" type="text" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px', marginBottom: '10px'}}></input>
         <br/>
         <label className="birthday__label" style={{color:'#000'}}>Ngày sinh</label>
        <br/>
        <input className="birthday"  name="birthday" type="date" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px', marginBottom: '10px', marginBottom: '10px'}}></input>
         <br/>
         <div style={{display: 'flex', alignItems:'center',gap:'8px'}}>
          <p style={{color:'black'}}>Giới tính:</p>
         <label style={{color: 'black'}}>
    <input className='gender' type="radio" name="gender" value="male"/>
    Nam
  </label>
  <label style={{color: 'black'}}>
    <input className='gender' type="radio" name="gender" value="female"/>
    Nữ
  </label>
         </div>
        
  
         <label className="password__label" style={{color:'#000'}}>Mật khẩu</label>
        
         <br/>
         <input className="Password"  name="rePassword" type="password" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px', marginBottom: '10px'}}></input>
         <br/>
         <label className="password__label" style={{color:'#000'}}>Xác nhận mật khẩu</label>
         <br/>
        
         <input className="rePassword" name="rePassword" type="password" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px'}}></input>
         <SubmitButton type="submit" value="Đăng ký" />
      </form>
      
    </Box>
        </div>
    );
};

export default Signup;