import crypto from "crypto";
import https from "https";
import connection from "../../models/SQLConnection.js";
async function updateSeatStatus(showtime_id, bookedSeat, reserved_until){
    try {
        // Chuyển đổi bookedSeat thành chuỗi để sử dụng trong câu truy vấn
        const seatIds = bookedSeat.map(seat => seat.seat_id).join(',');
        // Thực hiện join các bảng cần thiết để lấy thông tin
        await connection.promise().query(`
            update seat_status set reserved_until = ? where showtime_id = ? AND seat_id IN (${seatIds})
        `, [reserved_until,showtime_id]);

    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái ghế:', error);
    }
}

export const giuGhe = async(req,res) => {
    const { showtime_id, bookedSeat } = req.body;
    const reserved_until = new Date(Date.now() + 5 * 60 * 1000); // Thời gian hiện tại + 5 phút
    try {
        // Cập nhật trạng thái ghế thành 1 (đã đặt)
        await updateSeatStatus(showtime_id, bookedSeat, reserved_until);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error reserving seats' });
    }
}

export const huyGiuGhe = async(req,res) => {
    const { showtime_id, bookedSeat } = req.body;
    try {
        // Cập nhật trạng thái ghế lại thành 0 (chưa đặt)
        await updateSeatStatus(showtime_id, bookedSeat, null);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error canceling reservation' });
    }
}

export const QRPayment = (req, res) => {
    const showtime_id = req.body.showtime_id;

    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    var partnerCode = 'MOMO';
    var redirectUrl = `http://localhost:8888/thong_tin_ve`;
    var ipnUrl = 'http://localhost:8888/api/payment/callback';
    var requestType = "payWithMethod";
    var amount = req.body.amount;
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = '';
    var autoCapture = true;
    var lang = 'vi';

    var rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=pay with MoMo&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: 'pay with MoMo',
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        signature: signature
    });

    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    };

    const paymentReq = https.request(options, paymentRes => {
        let data = '';
        paymentRes.on('data', chunk => {
            data += chunk;
        });
        paymentRes.on('end', () => {
            const response = JSON.parse(data);
            if (response.resultCode === 0) {
                // Gửi lại URL thanh toán cho frontend
                res.json({ paymentUrl: response.payUrl, orderId: response.orderId });
            } else {
                res.status(500).json({ error: 'Payment initiation failed' });
            }
        });
    });

    paymentReq.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    });

    paymentReq.write(requestBody);
    paymentReq.end();
};

// API trong backend (ví dụ sử dụng Express.js)
export const QRPaymentUpdate = async (req, res) => {
    const { orderId, resultCode, amount } = req.body;
    try {
        // Xử lý logic cập nhật vào database
        if (resultCode === '0') {
            await updatePaymentStatus(orderId, 'PAID'); // Cập nhật trạng thái thành công
        } else {
            await updatePaymentStatus(orderId, 'FAILED'); // Cập nhật trạng thái thất bại
        }
        res.status(200).json({ message: 'Cập nhật trạng thái thành công' });
    } catch (error) {
        console.error('Lỗi khi cập nhật thanh toán:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};