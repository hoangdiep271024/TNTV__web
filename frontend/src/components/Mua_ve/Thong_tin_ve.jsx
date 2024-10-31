import React from 'react';

const Thong_tin_ve = ({ prevStep }) => {
    return (
        <div>
            <h2>Thông Tin Vé</h2>
            {/* Nội dung thông tin vé */}
            <button onClick={prevStep}>Quay Lại</button>
        </div>
    );
};

export default Thong_tin_ve;
