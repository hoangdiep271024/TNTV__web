import React, { useEffect, useState } from 'react';
import Shared from '../Shared';
function Thong_tin_ve() {
    const [paymentInfo, setPaymentInfo] = useState(null);
    // const {showtime_id} = useBooking()
    const [step, setStep] = useState(3); // 0: Chọn ghế, 1: Bắp nước, 2: Thanh toán, 3: Thông tin vé

     useEffect(() => {
        // Lấy các tham số từ URL
        const searchParams = new URLSearchParams(window.location.search);
        
        // Tạo một object để lưu các tham số nếu cần
        const paymentData = {
            partnerCode: searchParams.get("partnerCode"),
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("amount"),
            resultCode: searchParams.get("resultCode"),
            message: searchParams.get("message"),
        };

        // Lưu paymentData vào state để sử dụng sau
        setPaymentInfo(paymentData);

        // Xóa các tham số khỏi URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }, []);
     // Điều kiện hiển thị
     if (!paymentInfo?.resultCode) {
        return <div className='ticket-booking'>Bạn chưa thực hiện đặt vé.</div>;
    } else if (paymentInfo.resultCode !== "0") {
        return <div className='ticket-booking'>Thanh toán thất bại. Vui lòng thử lại.</div>;
    } else if (paymentInfo.resultCode === "0")
    return (
            <><Shared></Shared><div className="progress-bar">
                    <div className={`step ${step === 0 ? 'active' : ''}`}>Chọn Ghế</div>
                    <div className={`step ${step === 1 ? 'active' : ''}`}>Bắp Nước</div>
                    <div className={`step ${step === 2 ? 'active' : ''}`}>Thanh Toán</div>
                    <div className={`step ${step === 3 ? 'active' : ''}`}>Thông Tin Vé</div>
                </div>
            <div className='ticket-booking'>
            <h1>Thông Tin Vé</h1>

            <h2>Chi Tiết Ghế</h2>
        </div></>
    );
}

export default Thong_tin_ve;