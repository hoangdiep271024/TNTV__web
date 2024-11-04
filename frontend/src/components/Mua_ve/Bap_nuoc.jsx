import React from 'react';

const Bap_nuoc = ({ nextStep, prevStep }) => {
    return (
        <div>
            <h2>Bắp Nước</h2>
            {/* Nội dung chọn bắp nước */}
            <button onClick={prevStep}>Quay Lại</button>
            <button onClick={nextStep}>Tiếp Theo</button>
        </div>
    );
};

export default Bap_nuoc;
