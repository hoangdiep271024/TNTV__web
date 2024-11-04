import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useBooking } from './BookingContext';

const Thanh_toan = ({ nextStep}) => {
    const { showtime_id,seatTotalAmount, popcornTotalAmount, selectedSeats, selectedCombos} = useBooking();
    const [loading, setLoading] = useState(false); // Thêm trạng thái loading
    const [timeLeft, setTimeLeft] = useState(300); // 5 phút = 300 giây

    const totalAmount = seatTotalAmount + popcornTotalAmount;

    useEffect(() => {
        // Đồng hồ đếm ngược 5 phút
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleTimeOut();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Xử lý khi hết giờ
    const handleTimeOut = async () => {
        alert('Đã hết giờ giữ ghế! Bạn sẽ được chuyển về trang đặt ghế.');
        await axios.post('/api/payment/huy_giu_ghe', {
            showtime_id: showtime_id,
            bookedSeat: selectedSeats,
        });
        window.location.href = `/auth`; // Chuyển về trang chủ
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();

            // Gửi yêu cầu hủy giữ ghế
            axios.post('/api/payment/huy_giu_ghe', {
                showtime_id: showtime_id,
                bookedSeat: selectedSeats,
            })
                .catch(error => console.error('Lỗi khi hủy giữ ghế:', error));

            event.returnValue = ''; // Hiện cảnh báo khi người dùng thoát
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [showtime_id, selectedSeats]);


    const handlePayment = async () => {
        setLoading(true); // Bắt đầu loading khi nhấn nút Thanh Toán

        try {
            const response = await axios.post('/api/payment', { showtime_id:  showtime_id, amount: totalAmount });
            if (response.data && response.data.paymentUrl) {
                // Mở trang mới và chuyển hướng tới URL thanh toán
                window.location.href = response.data.paymentUrl;
            } else {
                alert('Không lấy được URL thanh toán. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('Đã có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại.');
        } finally {
            setLoading(false); // Dừng loading sau khi xử lý xong
        }
    };

    const getSeatName = (seatType) => {
        if (seatType === 0) return "Ghế thường";
        if (seatType === 1) return "Ghế VIP";
        if (seatType === 2) return "Ghế đôi";
        return "Ghế không xác định";
    };

    // Nhóm ghế theo loại và tính tổng số lượng và giá
    const groupedSeats = selectedSeats.reduce((acc, seat) => {
        const seatTypeName = getSeatName(seat.seat_type);
        if (!acc[seatTypeName]) {
            acc[seatTypeName] = { quantity: 0, price: 0 };
        }
        acc[seatTypeName].quantity += 1;
        acc[seatTypeName].price += seat.price;
        return acc;
    }, {});

    return (
        <div className='ticket-booking'>
            <h2>Thanh Toán</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(groupedSeats).map(([seatTypeName, details], index) => (
                            <tr key={`seat-${index}`}>
                                <td>{seatTypeName}</td>
                                <td>{details.quantity}</td>
                                <td>{details.price.toLocaleString()}đ</td>
                            </tr>
                        ))}
                        {Object.values(selectedCombos).map((combo, index) => (
                            <tr key={`combo-${index}`}>
                                <td>{combo.combo_name}</td>
                                <td>{combo.quantity}</td>
                                <td>{(combo.price * combo.quantity).toLocaleString()}đ</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='sum-price'>Tổng tiền: {totalAmount.toLocaleString()}đ  thời gian giữ ghế: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</div>
            <button id='tiep-tuc' onClick={handlePayment}>Thanh Toán</button>
        </div>
    );
};

export default Thanh_toan;
