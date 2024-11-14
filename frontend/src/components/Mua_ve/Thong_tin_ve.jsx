import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Shared from '../Shared';
function Thong_tin_ve() {
    // const {showtime_id} = useBooking()
    const [step, setStep] = useState(3); // 0: Chọn ghế, 1: Bắp nước, 2: Thanh toán, 3: Thông tin vé
    const location = useLocation();
    const navigate = useNavigate();
    const [orderSuccess, setOrderSuccess] = useState({
        orderId: localStorage.getItem('order_id') || null,
        resultCode: localStorage.getItem('resultCode') || null,
    });
    const [orderInfo, setOrderInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Lấy các tham số từ URL
        const searchParams = new URLSearchParams(location.search);
        const orderId = searchParams.get('order_id');
        const resultCode = searchParams.get('resultCode');
        console.log(orderId)
        if (orderId && resultCode) {
            // Lưu vào state và localStorage
            setOrderSuccess({ orderId, resultCode });
            localStorage.setItem('order_id', orderId);
            localStorage.setItem('resultCode', resultCode);

            // Ẩn các tham số khỏi URL
            navigate('/thong_tin_ve', { replace: true });
        }
    }, [location, navigate]);

    useEffect(() => {
        // Gọi API khi orderId và resultCode đã được cập nhật
        if (orderSuccess.orderId && orderSuccess.resultCode === "0") {
            fetchOrderInfo(orderSuccess.orderId);
        }
    }, [orderSuccess]);


    const fetchOrderInfo = async (orderId) => {
        try {
            const response = await fetch(`/api/orders/order_id=${orderId}`);
            if (!response.ok) throw new Error('Order not found');
            const data = await response.json();
            console.log(data)
            setOrderInfo(data);
        } catch (error) {
            setError(error.message);
        }
    };
    // Điều kiện hiển thị
    if (!orderSuccess.resultCode) {
        return <div className='ticket-booking'>Bạn chưa thực hiện đặt vé.</div>;
    } else if (orderSuccess.resultCode !== "0") {
        return <div className='ticket-booking'>Thanh toán thất bại. Vui lòng thử lại.</div>;
    }
    return (
        <>
            <div className="step-content"></div>
            <div style={{ height: '100px' }}></div><div className="progress-bars">
                <div className={`step ${step === 0 ? 'active' : ''}`}> <i class="fe fe-grid"></i><span>Chọn Ghế</span></div>
                <div className='step-between'>»</div>
                <div className={`step ${step === 1 ? 'active' : ''}`}> <i class="fe fe-shopping-bag"></i><span>Bắp Nước</span></div>
                <div className='step-between'>»</div>
                <div className={`step ${step === 2 ? 'active' : ''}`}> <i class="fe fe-credit-card"></i><span>Thanh Toán</span></div>
                <div className='step-between'>»</div>
                <div className={`step ${step === 3 ? 'active' : ''}`}> <i class="fe fe-inbox"></i><span>Thông Tin Vé</span></div>
            </div>
            <div className='ticket-booking'>
                <h2>Đơn hàng</h2>
                <p>{orderInfo}</p>
            </div>
            <Shared></Shared><Footer></Footer></>
    );
}

export default Thong_tin_ve;