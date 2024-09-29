import React from "react";
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

const Login = ({onSetAccClick}) => {
  const [formData, setFormData] = useState({
    user__name: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn form reload trang
    console.log('Thông tin form:', formData); // In ra thông tin form
  };
  return (
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
      <form method="post" onSubmit={handleSubmit}>
        <label className="user__name__label" style={{color:'#000'}}>Tài khoản</label>
        <br/>
        <input onChange={handleChange} className="user__name"  name="user__name" type="text" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px'}}></input>
         <br/>
        
         <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'85%'}}>
         <label className="password__label" style={{color:'#000'}}>Mật khẩu</label>
         <p style={{fontSize:'13px', color:'grey', cursor:'pointer', fontWeight:'500'}}>Quên mật khẩu?</p>
         </div>
        
         <input onChange={handleChange} className="password" name="password" type="password" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px'}}></input>
         <SubmitButton type="submit" value="Đăng nhập" />
      </form>
      <div style={{display: 'flex', fontSize:'13px'}}>
        <p style={{color:'grey', marginLeft:'16%'}}>Chưa có tài khoản?</p>
        <p style={{color:'#207ee3', cursor:'pointer', marginLeft:'3px' }} onClick={onSetAccClick} >Đăng kí ngay!</p>
      </div>
    </Box>
  );
};

export default Login;
