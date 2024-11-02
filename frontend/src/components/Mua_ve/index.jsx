import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Bap_nuoc from "./Bap_nuoc";
import "./BookingProcess.css";
import Mua_ve from "./Mua_ve";
import Thanh_toan from "./Thanh_toan";
import Thong_tin_ve from "./Thong_tin_ve";
import Shared from "../Shared";

const BookingTicket = () => {
  const theme = useTheme();
  const [step, setStep] = useState(0); // 0: Chọn ghế, 1: Bắp nước, 2: Thanh toán, 3: Thông tin vé
  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 3)); // Giới hạn không vượt quá số bước
  };
  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0)); // Giới hạn không thấp hơn 0
  };
  return (
    <>
      <Box>
        <Shared></Shared>
      </Box>
      <div>
        <Box sx= {{display: 'flex', justifyContent: 'center', width: '100vw'}}>
        <div className="progress-bar">
          <div
            className={`step ${step === 0 ? "active" : ""}`}
            style={{borderRight: '1px solid #ccc'}}
          >
            Chọn Ghế
          </div>
          <div
            className={`step ${step === 1 ? "active" : ""}`}
            style={{borderRight: '1px solid #ccc'}}
          >
            Bắp Nước
          </div>
          <div
            className={`step ${step === 2 ? "active" : ""}`}
            style={{borderRight: '1px solid #ccc'}}
          >
            Thanh Toán
          </div>
          <div
            className={`step ${step === 3 ? "active" : ""}`}
          >
            Thông Tin Vé
          </div>
        </div>
        </Box>

        <div className="step-content">
          {step === 0 && <Mua_ve nextStep={nextStep} />}
          {step === 1 && <Bap_nuoc nextStep={nextStep} prevStep={prevStep} />}
          {step === 2 && <Thanh_toan nextStep={nextStep} prevStep={prevStep} />}
          {step === 3 && <Thong_tin_ve prevStep={prevStep} />}
        </div>
      </div>
    </>
  );
};

export default BookingTicket;
