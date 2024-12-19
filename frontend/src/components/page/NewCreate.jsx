import { Box, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Footer from "../Footer/Footer";
import Shared from "../Shared";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";


const NewCreate = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const jwt = localStorage.getItem('jwt');
  const [formData, setFormData] = useState({
    film_name: "",
    new_header: "",
    new_footer: "",
    new_content: "",
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/userInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jwt: jwt })
    })
      .then(response => response.json())
      .then(responseData => {
        if (!responseData.success) {
          navigate('/auth');
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const [newImg, setNewImg] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContentChange = (value) => {
    setFormData({
      ...formData,
      new_content: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImg(file); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const parser = new DOMParser();
    const doc = parser.parseFromString(formData.new_content, "text/html");
    const images = doc.querySelectorAll("img");
    images.forEach((img) => {
      img.style.width = "700px";
    });

    
    const updatedContent = doc.body.innerHTML;

    const data = new FormData();
    data.append("film_name", formData.film_name);
    data.append("new_header", formData.new_header);
    data.append("new_footer", formData.new_footer);
    data.append("new_content", updatedContent);

    if (newImg) {
      data.append("new_img", newImg);
    }
    console.log(localStorage.getItem('jwt'))
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/news/create`, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        body: data,
      });
      const result = await response.json();
      console.log("Response:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <Box>
      <Shared />
      <Box sx={{ marginTop: '19vh' }}>
        <div style={{
          marginTop: '20px', fontSize: '30px', textAlign: 'center',
          fontFamily: 'Montserrat', fontWeight: '600',
          color: theme.palette.mode === 'dark' ? '#c0c2c4' : '#EF4444',
          marginBottom: '15px'
        }}>
          {`TẠO BÀI VIẾT`}
        </div>
        <form onSubmit={handleSubmit} style={{ width: '60%', marginLeft: '20%', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <label>Tên phim:</label>
              <TextField
                type="text"
                name="film_name"
                value={formData.film_name}
                onChange={handleInputChange}
                label="Tên phim"
                required
                sx={{
                  "& .MuiInputLabel-shrink": {
                    transform: "translate(12px, -7px) scale(0.85)", 
                  },
                }}
                InputProps={{
                  style: {
                    height: "40px",
                  },
                }}
                InputLabelProps={{
                  style: {
                    top: '-8px',
                  },
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <label>Tiêu đề</label>
              <TextField
                type="text"
                name="new_header"
                value={formData.new_header}
                onChange={handleInputChange}
                label="Tiêu đề"
                required
                sx={{
                  "& .MuiInputLabel-shrink": {
                    transform: "translate(12px, -7px) scale(0.85)", // Chỉnh vị trí và kích thước
                  },
                }}
                InputProps={{
                  style: {
                    height: "40px",
                  },
                }}
                InputLabelProps={{
                  style: {
                    top: '-8px',
                  },
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <label>Ảnh (New_Image):</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <label>Footer</label>
              <TextField
                type="text"
                name="new_footer"
                value={formData.new_footer}
                onChange={handleInputChange}
                label="Nhập footer"
                required
                sx={{
                  "& .MuiInputLabel-shrink": {
                    transform: "translate(12px, -7px) scale(0.85)", 
                  },
                }}
                InputProps={{
                  style: {
                    height: "40px",
                  },
                }}
                InputLabelProps={{
                  style: {
                    top: '-8px',
                  },
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <label>Nội dung chính:</label>
            <ReactQuill
              theme="snow"
              value={formData.new_content}
              onChange={handleContentChange}
              modules={modules}
              formats={formats}
              placeholder="Nhập nội dung chính... (bao gồm cả ảnh và text)"
              style={{ width: '100%', overflow: 'auto', overflowY: 'scroll', height: '500px' }}
            />
          </div>
          <button type="submit" style={{ marginTop: "20px", position: 'absolute', right: '0px' }}>
            Tạo bài viết
          </button>
        </form>
      </Box>
      <Footer />
    </Box>
  );
};

export default NewCreate;
