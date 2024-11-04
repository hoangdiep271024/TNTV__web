import React from 'react';

const Thanh_toan = ({ nextStep, prevStep }) => {
    return (
        <div>
            <h2>Thanh Toán</h2>
            {/* Nội dung thanh toán */}
            <button onClick={prevStep}>Quay Lại</button>
            <button onClick={nextStep}>Tiếp Theo</button>
        </div>
    );
};

export default Thanh_toan;
