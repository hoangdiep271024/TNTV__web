
import axios from 'axios';
import { default as React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from "@emotion/react";
import "./Mua_ve.css";

const Mua_ve = () => {
const theme =useTheme();
    const showtime_id = localStorage.getItem('showTime_id');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleSeatClick = (seat) => {
        const pairSeat = findPairSeat(seat);
        const isSelected = selectedSeats.some(selectedSeat => selectedSeat.seat_id === seat.seat_id);

        let updatedSeats;
        if (isSelected) {
            // Bỏ chọn cả ghế và ghế đôi nếu đã được chọn
            updatedSeats = selectedSeats.filter(
                selectedSeat => selectedSeat.seat_id !== seat.seat_id && (!pairSeat || selectedSeat.seat_id !== pairSeat.seat_id)
            );
        } else {
            // Chọn ghế và ghế đôi nếu chưa được chọn
            updatedSeats = pairSeat
                ? [...selectedSeats, seat, pairSeat]
                : [...selectedSeats, seat];
        }

        setSelectedSeats(updatedSeats);

        // Cập nhật tổng tiền
        const newTotalPrice = updatedSeats.reduce((total, seat) => total + seat.price, 0);
        setTotalPrice(newTotalPrice);
    };

    // Hàm để tìm ghế đôi (ghế liền kề) trong hàng 'K' có seat_type = 2
    const findPairSeat = (seat) => {
        if (seat.seat_type === 2) {
            const seatRow = seat.seat_location.charAt(0); // Lấy hàng (ký tự đầu tiên)
            const seatNumber = parseInt(seat.seat_location.slice(1)); // Lấy số ghế

            // Tìm ghế cặp dựa vào số ghế là lẻ hay chẵn
            const pairSeatLocation = seatNumber % 2 === 0
                ? `${seatRow}${seatNumber - 1}`
                : `${seatRow}${seatNumber + 1}`;

            return data.seats.find(s => s.seat_location === pairSeatLocation && s.seat_type === 2);
        }
        return null;
    };

    useEffect(() => {
        // Fetch the showtime data from the API
        axios.post(`/api/muaVe/showtime_id=${showtime_id}`)
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [showtime_id]);

    if (loading) return <p>Loading...</p>;
    if (!data) return <p>Data not found.</p>;
    return (
        <div className="ticket-booking">
            <div className="book-info">
                <p style={{fontSize: '18px'}}>{data.film_name}</p>
                <p style={{fontSize: '15px'}}><strong>{data.cinema_name}</strong></p>
                <p style={{fontSize: '15px'}}>Suất chiếu: {data.show_time} {data.show_date}</p>
                <p style={{fontSize: '15px'}}><strong>Phòng chiếu:</strong> {`P${data.room_name.substring(5)}`}</p>
            </div>

            <div className="sum-price" style={{marginBottom: '15px'}}>
                <p style={{fontSize: '15px', fontWeight: '800'}}>TỔNG ĐƠN HÀNG:</p>
                <p style={{fontSize: '15px'}}>{totalPrice.toLocaleString()}đ</p>
            </div>
            <button id="back">
                ←
            </button>
            <button id="tiep-tuc" style={{
        color: "white", 
        transition: "color 0.2s", 
      }}
      onMouseEnter={(e) => {
        e.target.style.color = theme.palette.mode === "dark" ? "white" : "black";
      }}
      onMouseLeave={(e) => {
        e.target.style.color = "white";
      }}>
                Tiếp tục
            </button>
            <div className="ghe-info">
                <div id="ghe-ban-chon" style={{
                    backgroundColor: '#00b300',
                    boxShadow: '0 0 11px #00b300', color: '#fff', width: '25px', height: '25px', padding: '10px', margin: '10px'
                }}></div>

                <div>Ghế bạn chọn</div>
                <div id="da-ban" style={{ background: 'repeating-linear-gradient(45deg, hsla(0, 0%, 60%, .4), hsla(0, 0%, 60%, .4) 10px, hsla(0, 0%, 60%, .6) 0, hsla(0, 0%, 60%, .6) 20px)', width: '25px', height: '25px', margin: '10px' }}></div>
                <div>Đã bán</div>
            </div>
            <div className="man-hinh">MÀN HÌNH</div>
            <div className="seat-row">
                <div className="seat-row-child">A</div>
                <div className="seat-row-child">B</div>
                <div className="seat-row-child">C</div>
                <div className="seat-row-child">D</div>
                <div className="seat-row-child">E</div>
                <div className="seat-row-child">F</div>
                <div className="seat-row-child">G</div>
                <div className="seat-row-child">H</div>
                <div className="seat-row-child">I</div>
                <div className="seat-row-child">J</div>
            </div>
            <div className="seats">
                {data.seats && data.seats.map((seat, index) => {
                    const isSelected = selectedSeats.some(selectedSeat => selectedSeat.seat_id === seat.seat_id);
                    const isDoubleSeat = seat.seat_type === 2;

                    // Kiểm tra xem `seat_location` là số lẻ hay chẵn
                    const doubleSeatClass = isDoubleSeat
                        ? parseInt(seat.seat_location.slice(1)) % 2 === 1
                            ? 'double_seat1'
                            : 'double_seat2'
                        : '';

                    return (
                        <div
                            key={seat.seat_id}
                            className={`seat ${seat.seat_status === 0 ? 'available' : 'occupied'} ${isSelected ? 'selected' : ''} ${doubleSeatClass}`}
                            style={{
                                boxShadow: isSelected ? '0 0 11px #00b300' : 'none',
                                background: seat.seat_status === 1
                                    ? 'repeating-linear-gradient(45deg, hsla(0, 0%, 60%, .4), hsla(0, 0%, 60%, .4) 10px, hsla(0, 0%, 60%, .6) 0, hsla(0, 0%, 60%, .6) 20px)'
                                    : 'none',
                                backgroundColor: isSelected
                                    ? '#00b300'
                                    : seat.seat_type === 0
                                        ? '#dfdfdf'
                                        : seat.seat_type === 1
                                            ? '#d4b15f'
                                            : '#3b5998',
                                filter: seat.seat_status === 1 ? 0.7 : 1,
                            }}
                            onClick={() => handleSeatClick(seat)}
                            onMouseOver={(e) => {
                                if (!isSelected) {
                                    e.currentTarget.innerText = seat.seat_location;
                                }
                                e.currentTarget.style.filter = 'brightness(0.8)';
                                e.currentTarget.style.opacity = 0.8;
                            }}
                            onMouseOut={(e) => {
                                if (!isSelected) {
                                    e.currentTarget.innerText = "";
                                }
                                e.currentTarget.style.filter = 'none';
                                e.currentTarget.style.opacity = 1;
                            }}
                        >
                            {isSelected && seat.seat_location}
                        </div>
                    );
                })}

            </div>
        </div >
    );
};

export default Mua_ve;
