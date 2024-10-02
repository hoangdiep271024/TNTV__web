import Box from "@mui/material/Box";
import React, { useState } from 'react';
import HeaderHome from '../header/HeaderHome';
import Navbar from '../navbar/Navbar';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage('Upload failed. Please try again.');
    }
  };

  return (
    <>
      <div>
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
          }}
        >
          <HeaderHome />
          <Navbar />
        </Box>
      </div>
      <h1>Hello</h1>
      
      {/* Thêm input để chọn ảnh và nút upload */}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>

      {/* Hiển thị thông báo từ response */}
      {message && <p>{message}</p>}
    </>
  );
}