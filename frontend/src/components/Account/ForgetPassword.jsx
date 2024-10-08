import React, { useEffect, useState } from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import styled from 'styled-components';
import Alert from '@mui/material/Alert';
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
export default function ForgetPassword() {
    const [errorMessage, setErrorMessage] = useState('');
    const [okMessage, setOkMessage]= useState('')
    const [lastStep, setLastStep] = useState(false)
    const [formData, setFormData] = useState({
        gmail: ''
      });
      const [formDataa, setFormDataa] = useState({
        token: ''
      });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
      const handleChangee = (e) => {
        const { name, value } = e.target;
        setFormDataa((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('/api/forgotPassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          });
      
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
                console.log('thanh cong roi')
              setOkMessage(`${data.message}`);
              setTimeout(() => {
                setLastStep(true);
              }, 1000);
            } else {
              // Đảm bảo rằng bạn đang sử dụng message đúng
              const errorAlert = `Gửi mã xác thực thất bại: ${data.message}`;
              setErrorMessage(errorAlert);
            }
          } else {
            console.error('Lỗi khi gửi:', response.statusText);
            setErrorMessage('Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại.');
          }
        } catch (error) {
          console.error('Lỗi mạng:', error);
          setErrorMessage('Lỗi mạng. Vui lòng kiểm tra kết nối của bạn.');
        }
      };
      
      const handleSubmitt = async (e) => {
        e.preventDefault();
       try {
         const response = await fetch('/api/forgotPassword/check', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(formDataa)
         });
         
         if (response.ok) {
           const data = await response.json();
           if (data.success) {
         console.log('ye ye')
             
           } else {
             const error__alert =`Gửi mã xác thực thất bại: ${data.message}`;
             console.log(error__alert)
           }
         } else {
           console.error('Lỗi khi gửi:', response.statusText);
         }
       } catch (error) {
         console.error('Lỗi mạng:', error);
       }
     };
      useEffect(() => {
        if (errorMessage) {
          const timer = setTimeout(() => {
            setErrorMessage('');
          }, 2000); // 2 giây
    
          return () => clearTimeout(timer);
        }
      }, [errorMessage]);
      useEffect(() => {
        if (okMessage) {
          const timerr = setTimeout(() => {
            setOkMessage('');
          }, 2000); 
    
          return () => clearTimeout(timerr);
        }
      }, [okMessage]);
  return (
    <>
   {!lastStep && (<Box
    sx={{
      position: "absolute",
      zIndex: "15",
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
      {errorMessage && (
        <Alert variant='filled' severity="error" style={{transition: '-moz-initial', width: '100%', position: 'absolute', zIndex:'20', top: '0', left:'0'}}>
          {errorMessage}
        </Alert>
      )}

    {okMessage && (
        <Alert variant='filled' severity="success" style={{transition: '-moz-initial', width: '100%', position: 'absolute', zIndex:'20', top: '0', left:'0'}}>
          {okMessage}
        </Alert>
      )} 

    <form onSubmit={handleSubmit}>
      <label className="gmail__label" style={{color:'#000'}}>Email:</label>
      <br/>
      <input onChange={handleChange} className="gmail"  name="gmail" type="text" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px'}}></input> 
       <SubmitButton type="submit" value="Nhận mã xác thực"/>
    </form>
  </Box>)} 

  {lastStep && (<Box  sx={{
      position: "absolute",
      zIndex: "15",
      top: "0",
      left: "0",
      width: "25vw",
      height: "100vh",
      backgroundColor: "#fff",
      transition: 'linear',
      paddingLeft:'25px',
      paddingTop:'30px'}}>
    <form onSubmit={handleSubmitt}>
      <label className="code__label" style={{color:'#000'}}>Mã xác thực</label>
      <br/>
      <input onChange={handleChangee} className="token"  name="token" type="text" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'10px'}}></input> 
       <SubmitButton type="submit" value="Nhận mã xác thực"/>
    </form>
  </Box>)}
  </>
  )
}
