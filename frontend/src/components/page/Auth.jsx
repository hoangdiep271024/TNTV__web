import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Login from "../Account/Login";
import Profile from "../Account/Profile";
import Signup from "../Account/Signup";
import Ticket__film from "../film/Ticket__film";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";
import "./chatBot.css";
export default function Auth() {
  const [isClickLogin, setIsClickLogin] = useState(false);
  const [isClickProfile, setIsClickProfile] = useState(false);
  const LoginClick = () => {
    setIsClickLogin(!isClickLogin);
  };
  const [isClickSignup, setIsClickSignup] = useState(false);
  const SignupClick = () => {
    setIsClickSignup(!isClickSignup);
    console.log(isClickSignup);
  }
  const SetAccClick = () => {
    setIsClickLogin(!isClickLogin);
    setIsClickSignup(!isClickSignup);
  }
  const ProfileClick = () => {
    setIsClickProfile(!isClickProfile)
  }
  const theme = useTheme();

  //chatBot
  const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng của khung chat
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null); // Tạo tham chiếu đến phần cuối của tin nhắn

  // Tự động cuộn khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Hàm mở/đóng khung chat
  const toggleChat = () => {
    setIsOpen(!isOpen); // Đảo ngược trạng thái khi nhấn vào nút
  };

  // Hàm xử lý thay đổi nội dung input
  const handleInputChange = (e) => {
    setInput(e.target.value); // Cập nhật giá trị input khi người dùng nhập
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', parts: [{ text: input }] };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    var postMessage = input
    setInput(''); // Xóa nội dung input sau khi gửi
    try {
      const response = await axios.post('/api/chatBot', { message: postMessage });
      console.log(response)
      const botMessage = { role: 'model', parts: [{ text: response.data }] };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

  };

  return (
    <><Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ top: '0', left: '0', position: 'fixed', backgroundColor: theme.palette.mode === "light" ? "white" : "#121212" }}>
        <Header onLoginClick={LoginClick} onSignupClick={SignupClick} onProfileClick={ProfileClick}></Header>
        <Navbar></Navbar>
      </div>

      {isClickLogin && (
        <>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 9,
            }}
            onClick={LoginClick} />{" "}
          <Login onSetAccClick={SetAccClick}></Login>
        </>
      )}
      {isClickSignup && (
        <>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 8,
            }}
            onClick={SignupClick} />{" "}
          <Signup />
        </>

      )}
      {isClickProfile && <>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 8,
          }}
          onClick={ProfileClick} />{" "}
        <Profile />
      </>}
      <Ticket__film></Ticket__film>
    </Box>

    {/* chatBot */}
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={toggleChat}>
        {isOpen ? '✖' : '💬'}
      </button>
      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">Trợ lí ảo Lilias</div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={message.role === 'user' ? 'chatbot-message user' : 'chatbot-message model'}>
                {message.parts.map((part, i) => (
                  <p key={i}>{part.text}</p>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Nhập tin nhắn..." />
          <button onClick={handleSendMessage}>Gửi</button>
        </div>
      )}
    </div>
    </>
  );
}