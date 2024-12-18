import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewCreate = () => {
  const [formData, setFormData] = useState({
    film_name: "",
    new_header: "",
    new_footer: "",
    new_content: "",
  });

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
    setNewImg(file); // Lưu ảnh vào state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(); // Sử dụng FormData để gửi cả text và file
    data.append("film_name", formData.film_name);
    data.append("new_header", formData.new_header);
    data.append("new_footer", formData.new_footer);
    data.append("new_content", formData.new_content);

    if (newImg) {
      data.append("new_img", newImg); // Thêm ảnh vào FormData
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/news/create`, {
        method: "POST",
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tên phim:</label>
        <input
          type="text"
          name="film_name"
          value={formData.film_name}
          onChange={handleInputChange}
          placeholder="Nhập tên phim"
          required
        />
      </div>

      <div>
        <label>Header:</label>
        <input
          type="text"
          name="new_header"
          value={formData.new_header}
          onChange={handleInputChange}
          placeholder="Nhập header"
        />
      </div>

      <div>
        <label>Footer:</label>
        <input
          type="text"
          name="new_footer"
          value={formData.new_footer}
          onChange={handleInputChange}
          placeholder="Nhập footer"
        />
      </div>

      <div>
        <label>Nội dung chính:</label>
        <ReactQuill
          theme="snow"
          value={formData.new_content}
          onChange={handleContentChange}
          modules={modules}
          formats={formats}
          placeholder="Nhập nội dung chính... (bao gồm cả ảnh và text)"
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <label>Ảnh:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <button type="submit" style={{ marginTop: "20px" }}>
        Tạo bài viết
      </button>
    </form>
  );
};

export default NewCreate;
