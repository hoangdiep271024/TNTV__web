import axios from 'axios';
import React, { useEffect } from 'react';
import { useBooking } from './BookingContext';
function Bap_nuoc({ nextStep, prevStep}) {
    const { showtime_id, seatTotalAmount, popcornTotalAmount, setPopcornTotalAmount, selectedSeats, selectedCombos,setSelectedCombos, seatData, popcornData } = useBooking();
   
    // Hàm để cập nhật số lượng combo và tính tổng tiền
    const updateComboQuantity = (comboId, change) => {
        setSelectedCombos(prev => {
            const newQuantity = (prev[comboId]?.quantity || 0) + change;
            if (newQuantity < 0) return prev;
    
            // Tìm thông tin combo dựa trên comboId
            const comboInfo = popcornData.find(c => c.combo_id === comboId);
    
            const updatedCombos = { 
                ...prev, 
                [comboId]: { 
                    ...prev[comboId], 
                    quantity: newQuantity, 
                    price: comboInfo?.combo_price,
                    combo_name: comboInfo?.combo_name  // Thêm combo_name vào đối tượng combo
                } 
            };
    
            // Nếu số lượng combo là 0, xóa combo khỏi danh sách
            if (newQuantity === 0) delete updatedCombos[comboId];
            return updatedCombos;
        });
    };

    // Tính tổng tiền (giá ghế + giá combo)
    useEffect(() => {
        const comboTotal = Object.values(selectedCombos).reduce(
            (acc, combo) => acc + (combo.quantity * combo.price),
            0
        );
        setPopcornTotalAmount(comboTotal); // cập nhật lại thay vì cộng dồn
    }, [selectedCombos]);
    return (
        <div className='ticket-booking '>
            <div className='popcorn-select' style={{ position: 'absolute' }}>
                <h2>Chọn Combo Bắp Nước</h2>
                <ul>
                    {popcornData.map(combo => (
                        <li key={combo.combo_id}>
                            <span>{combo.combo_name}</span> - <span>{combo.combo_price} VND</span>
                            <div>
                                <button onClick={() => updateComboQuantity(combo.combo_id, -1)}>-</button>
                                <span>{selectedCombos[combo.combo_id]?.quantity || 0}</span>
                                <button onClick={() => updateComboQuantity(combo.combo_id, 1)}>+</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="book-info">
                {seatData ? (
                    <>
                        <p style={{ fontSize: '18px' }}>{seatData.film_name}</p>
                        <p style={{ fontSize: '15px' }}><strong>{seatData.cinema_name}</strong></p>
                        <p style={{ fontSize: '15px' }}>Suất chiếu: {seatData.show_time} {seatData.show_date}</p>
                        <p style={{ fontSize: '15px' }}><strong>Phòng chiếu:</strong> {`P${seatData.room_name}`}</p>
                    </>
                ) : (
                    <p>Đang tải thông tin suất chiếu...</p>
                )}
            </div>

            <div className="sum-price" style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '15px', fontWeight: '800' }}>TỔNG ĐƠN HÀNG:</p>
                <p style={{ fontSize: '15px' }}>{(seatTotalAmount+popcornTotalAmount).toLocaleString()}đ</p>
            </div>
            <button id="tiep-tuc" onClick ={async () => {
                try {
                    const response = await axios.post('/api/payment/giu_ghe', { showtime_id: showtime_id, bookedSeat: selectedSeats });
                    if (response.data.success) {
                        nextStep();
                    } else {
                        // Hiển thị alert với danh sách ghế đã được đặt
                    const bookedSeatsList = response.data.bookedSeats.join(', ');
                    alert(`Ghế sau đã được đặt: ${bookedSeatsList}`);
                    }
                } catch (error) {
                    console.error('Error when posting to /api/payment/giu_ghe:', error);
                }
                }}>
                Tiếp tục
            </button>
            <button id='back' onClick={prevStep}>
                ←
            </button>
        </div>
    );
}

export default Bap_nuoc;
