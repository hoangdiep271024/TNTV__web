import { useTheme } from "@emotion/react";
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import ForgetPassword from '../Account/ForgetPassword';
import Login from '../Account/Login';
import Profile from '../Account/Profile';
import Signup from '../Account/Signup';
import ChatBot from '../chatBot/ChatBot';
import ChatBotToggle from '../chatBot/ChatBotToggle';
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';
import Bap_nuoc from './Bap_nuoc';
import './BookingProcess.css';
import Mua_ve from './Mua_ve';
import Thanh_toan from './Thanh_toan';
import Thong_tin_ve from './Thong_tin_ve';

const BookingTicket = () => {
    const [isClickLogin, setIsClickLogin] = useState(false);
    const [isClickProfile, setIsClickProfile] = useState(false);
    const [isClickForgotPassword, setIsClickForgotPassword] = useState(false);
    const [isClickSignup, setIsClickSignup] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const LoginClick = () => {
        setIsClickLogin(!isClickLogin);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const SignupClick = () => {
        setIsClickSignup(!isClickSignup);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const SetAccClick = () => {
        setIsClickLogin(!isClickLogin);
        setIsClickSignup(!isClickSignup);
    };

    const ProfileClick = () => {
        setIsClickProfile(!isClickProfile);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const forgotPasswordClick = () => {
        setIsClickLogin(false);
        setIsClickForgotPassword(!isClickForgotPassword);
    };

    useEffect(() => {
        document.body.style.overflow = (isClickLogin || isClickSignup || isClickProfile || isClickForgotPassword) ? 'hidden' : 'auto';
    }, [isClickLogin, isClickSignup, isClickProfile, isClickForgotPassword]);

    const theme = useTheme();

    const toggleChatClick = () => {
        setIsOpen(!isOpen);
    };

    const [step, setStep] = useState(0); // 0: Chọn ghế, 1: Bắp nước, 2: Thanh toán, 3: Thông tin vé

    const nextStep = () => {
        setStep(prevStep => Math.min(prevStep + 1, 3)); // Giới hạn không vượt quá số bước
    };

    const prevStep = () => {
        setStep(prevStep => Math.max(prevStep - 1, 0)); // Giới hạn không thấp hơn 0
    };

    return (
        <><Box>
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
                        onClick={LoginClick} />
                    <Login onSetAccClick={SetAccClick} onSetForgotPassword={forgotPasswordClick}></Login>
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
                        onClick={SignupClick} />
                    <Signup />
                </>
            )}
            {isClickProfile && (
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
                        onClick={ProfileClick} />
                    <Profile />
                </>
            )}
            {isClickForgotPassword && (
                <>
                    <Box
                        sx={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 4
                        }}
                        onClick={forgotPasswordClick} />
                    <ForgetPassword></ForgetPassword>
                </>
            )}
            {!isOpen && (
                <Box sx={{ position: 'fixed', right: '3vw', top: '90vh' }}>
                    <ChatBotToggle toggleChat={toggleChatClick}></ChatBotToggle>
                </Box>
            )}
            {isOpen && (
                <Box sx={{ position: 'fixed', right: '3vw', top: '50vh', width: '23vw', height: '35vh' }}>
                    <ChatBot closeClick={toggleChatClick}></ChatBot>
                </Box>
            )}
        </Box><div>
                <div className="progress-bar">
                    <div className={`step ${step === 0 ? 'active' : ''}`}>Chọn Ghế</div>
                    <div className={`step ${step === 1 ? 'active' : ''}`}>Bắp Nước</div>
                    <div className={`step ${step === 2 ? 'active' : ''}`}>Thanh Toán</div>
                    <div className={`step ${step === 3 ? 'active' : ''}`}>Thông Tin Vé</div>
                </div>

                <div className="step-content">
                    {step === 0 && <Mua_ve nextStep={nextStep} />}
                    {step === 1 && <Bap_nuoc nextStep={nextStep} prevStep={prevStep} />}
                    {step === 2 && <Thanh_toan nextStep={nextStep} prevStep={prevStep} />}
                    {step === 3 && <Thong_tin_ve prevStep={prevStep} />}
                </div>
            </div></>

    );
};

export default BookingTicket;
