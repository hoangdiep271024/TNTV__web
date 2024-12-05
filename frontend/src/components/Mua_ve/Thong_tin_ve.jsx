import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Shared from "../Shared";
import "./Thong_tin_ve.css";
function Thong_tin_ve() {
    const [orderInfo, setOrderInfo] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // const {showtime_id} = useBooking()
    const [step, setStep] = useState(3); // 0: Chọn ghế, 1: Bắp nước, 2: Thanh toán, 3: Thông tin vé

    const formatVND = (number) => {
        const price = parseFloat(number)
        return price.toLocaleString('vi-VN');
    };

    useEffect(() => {
        // Fetch seat data
        const fetchOrderInfo = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/orders/getLastestOrder`);
                setOrderInfo(response.data.order); // Lưu thông tin đơn hàng vào state
                setLoading(false); // Đánh dấu việc load dữ liệu xong
            } catch (error) {
                setError("Đã xảy ra lỗi khi tải thông tin.");
                setLoading(false); // Đánh dấu việc load dữ liệu xong
            }
        };

        fetchOrderInfo();
    }, []);

    if (loading) {
        return (
            <div className="ticket-booking">
                Đang tải thông tin...
            </div>
        );
    }

    if (error) {
        return (
            <div className="ticket-booking">
                {error}
            </div>
        );
    }

    if (!orderInfo) {
        return (
            <><div className="ticket-booking">
                Bạn chưa đặt bất cứ vé nào.
            </div><Shared /><Footer /></>
        );
    }

    return (
        <>
            <><div className="ticket-booking">
                <div className='orderInfoContainerRoot'>
                    <div className='orderInfo-container'>
                        <div className='orderInfo-container-grid1'>
                            <img src={orderInfo.film_img} className='img1' />
                        </div>
                        <div className='orderInfo-container-grid2'>
                            <div>
                                <h1>{orderInfo.film_name}</h1>
                                <p>{orderInfo.cinema_name}</p>
                                <p>Suất chiếu : {orderInfo.show_date.split("T")[0]} , {orderInfo.show_time}</p>
                                <p style={{ display: 'flex' }}>Ghế: {orderInfo.seats.map((seat) => (
                                    <span style={{ marginLeft: '3px' }}>{seat.seat_name}</span>
                                ))} , {orderInfo.room_name}</p>
                                {orderInfo.popcorns.length > 0 ? (
                                    <>
                                        {orderInfo.popcorns.map((pop) => (
                                            <p>
                                                Combo {pop.combo_name} x{pop.combo_quantity}
                                            </p>
                                        ))}
                                    </>
                                ) : (
                                    <p>Combo bỏng+nước: không</p>
                                )}
                            </div>
                        </div>
                        <div className='orderInfo-container-grid3'>
                            <img src="http://res.cloudinary.com/dh3qus4yk/image/upload/v1732765979/qtncugo3qk1ehyqfs0oo.jpg" className='img2' />
                            <h2>Tổng tiền: {formatVND(orderInfo.total_price)}</h2>
                        </div>
                    </div>
                </div>
                <div style={{ height: '100px' }}></div><div className="progress-bars" style={{ paddingTop: "20px" }}>
                    <div className={`step ${step === 0 ? 'active' : ''}`}> <i class="fe fe-grid"></i><span>Chọn Ghế</span></div>
                    <div className='step-between'>»</div>
                    <div className={`step ${step === 1 ? 'active' : ''}`}> <i class="fe fe-shopping-bag"></i><span>Bắp Nước</span></div>
                    <div className='step-between'>»</div>
                    <div className={`step ${step === 2 ? 'active' : ''}`}> <i class="fe fe-credit-card"></i><span>Thanh Toán</span></div>
                    <div className='step-between'>»</div>
                    <div className={`step ${step === 3 ? 'active' : ''}`}> <i class="fe fe-inbox"></i><span>Thông Tin Vé</span></div>
                </div>
            </div><Shared /><Footer /></></>
    );
}

export default Thong_tin_ve;
