import React from 'react'
import { useState, useEffect } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Button } from '@mui/material';
import styled from 'styled-components';
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

export default function Profile() {

    const [login, setLogin] = useState('');
    const [userInfor, setUserInfor] = useState([]);
    const [changeClick, setChangeClick] = useState(false)
    const defaultImage = 'data:image/jpeg;base64,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';

    const [image, setImage] = useState(userInfor.user_img || defaultImage);

    // Hàm xử lý khi chọn file
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); 
                setFormData((prevData) => ({
                    ...prevData,
                    user__img: reader.result // Cập nhật hình ảnh trong formData
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    
    useEffect(() => {
      fetch('/api/userInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseData => {
          if(responseData.success){
            setLogin(true)
            setUserInfor(responseData.userInfo[0])
          }
          else{
            setLogin(false)
          }
          
        })
        .catch(error => console.error('Error:', error));
    }, []);
    const [formData, setFormData] = useState({
        user__img:'',
        user__name: '',
        name: '',
        phone__number: '',
        gmail: '',
        birthday: ''
        
      });
    useEffect(() => {
        if (userInfor) {
          setFormData({
            user__img: userInfor.user_img || '',
            user__name: userInfor.username || '',
            name: userInfor.full_name || '',
            phone__number: userInfor.phone_number || '',
            gmail: userInfor.email || '',
          });
        }
      }, [userInfor]);
  console.log(userInfor)
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
      const handleSubmit = async (e) => {
        try {
            const response = await fetch('/api/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData)
            });
            
            if (response.ok) {
              const data = await response.json();
              if (data.success) {
                setOkMessage(`Thay đổi thông tin thành công: ${data.message}`)
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
                
              } else {
                const error__alert =`Thay đổi thông tin thất bại: ${data.message}`;
                console.log(error__alert);
                setErrorMessage(`Thay đổi thông tin thất bại: ${data.message}`)
              }
            } else {
              // Xử lý lỗi
              console.error('Lỗi khi thay đổi thông tin:', response.statusText);
            }
          } catch (error) {
            console.error('Lỗi mạng:', error);
          }
        };
        const changeClickButton = () => {
            setChangeClick(!changeClick)
            console.log(changeClick)
        }
    
  return (
    <div>
        {login && (<Box
      sx={{
        position: "absolute",
        zIndex: "10",
        top: "0",
        right: "0",
        width: "25vw",
        height: "100vh",
        backgroundColor: "#fff",
        transition: 'linear',
        paddingLeft:'25px',
        paddingTop:'30px'
      }}
      autoComplete="off"
    >
      <img src={image}  style={{width: '70px', height: '70px', objectFit :'cover', borderRadius: '100%', marginLeft:'40%'}}></img>
      <form onSubmit={handleSubmit}>
        {changeClick && 
      <input type="file" name='user__img' accept="image/*" 
      onChange={handleFileChange}></input>
        }
        <br/>
       <label className="name__label" style={{color:'#000'}}>Họ và tên</label>
        <br/>
        <input className="name" value={formData.name} disabled={!changeClick}  name="name" type="text" onChange={handleChange} required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px', marginBottom: '10px'}}></input>
         <br/>
         <label className="user__name" name="user__name" onChange={handleChange} style={{color:'#000'}}>Tên đăng nhập</label>
        <br/>
        <input className="user__name" disabled={!changeClick} value={formData.user__name} name="user__name" onChange={handleChange} type="text" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px', marginBottom: '10px'}}></input>
         <br/>
         <label className="gmail__label" style={{color:'#000'}}>E-mail</label>
        <br/>
        <input className="gmail" disabled={!changeClick} value={formData.gmail} name="gmail" onChange={handleChange} type="text" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px', marginBottom: '10px'}}></input>
         <br/>
         <label className="phone__label" style={{color:'#000'}}>Số điện thoại</label>
        <br/>
        <input className="phone__number" disabled={!changeClick}  value={formData.phone__number} onChange={handleChange}  name="phone__number" type="text" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px', marginBottom: '10px'}}></input>
         <br/>
         {!changeClick && <Button onClick={changeClickButton}>Chỉnh sửa</Button>}
         {changeClick && <SubmitButton type="submit" value="Cập nhật" />}
      </form>
    </Box>)}
    </div>
  )
    }
