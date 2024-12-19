import crypto from "crypto";
import https from "https";
import { isTokenExpired, verifyToken } from '../../middlewares/JWT.js';
import connection from "../../models/SQLConnection.js";
async function updateSeatStatus(showtime_id, bookedSeat, reserved_until) {
    try {
        // Chuyển đổi bookedSeat thành chuỗi để sử dụng trong câu truy vấn
        const seatIds = bookedSeat.map(seat => seat.seat_id).join(',');
        // Thực hiện join các bảng cần thiết để lấy thông tin
        await connection.promise().query(`
            update seat_status set reserved_until = ? where showtime_id = ? AND seat_id IN (${seatIds})
        `, [reserved_until, showtime_id]);

    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái ghế:', error);
    }
}

export const giuGhe = async (req, res) => {
    const { showtime_id, bookedSeat } = req.body;
    const reserved_until = new Date(Date.now() + 5 * 60 * 1000); // Thời gian hiện tại + 5 phút
    try {
        // Cập nhật trạng thái ghế thành 1 (đã đặt)
        await updateSeatStatus(showtime_id, bookedSeat, reserved_until);
        return res.json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error reserving seats' });
    }
}

export const QRPayment = async (req, res) => {
    const { showtime_id, amount: total_amount, selectedSeats, selectedCombos } = req.body;

    try {
        const token = req.body.jwt;

        if (!token) {
            return res.json({
                message: "Người dùng chưa đăng nhập",
                success: false
            });
        }

        if (isTokenExpired(token)) {
            return res.json({
                message: "Người dùng hết phiên đăng nhập",
                success: false
            });
        }

        const decoded = verifyToken(token);
        const user_id = decoded.id;

        // trả về link momopay
        const accessKey = 'F8BBA842ECF85';
        const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
        const partnerCode = 'MOMO';
        const redirectUrl = `http://fall2024c8g13.int3306.freeddns.org/thong_tin_ve`;
        const ipnUrl = 'http://fall2024c8g13.int3306.freeddns.org/api/payment/callback';
        const requestType = "payWithMethod";
        const amount = total_amount;
        const orderId = partnerCode + new Date().getTime();
        const requestId = orderId;
        const extraData = JSON.stringify({ user_id, showtime_id, selectedSeats, selectedCombos });;
        const autoCapture = true;
        const lang = 'vi';

        const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=pay with MoMo&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
        const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

        const requestBody = JSON.stringify({
            partnerCode,
            partnerName: "Test",
            storeId: "MomoTestStore",
            requestId,
            amount,
            orderId,
            orderInfo: 'pay with MoMo',
            redirectUrl,
            ipnUrl,
            lang,
            requestType,
            autoCapture,
            extraData,
            signature
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
                    return res.json({ paymentUrl: response.payUrl, orderId: response.orderId });
                } else {
                    return res.status(500).json({ error: 'Payment initiation failed' });
                }
            });
        });

        paymentReq.on('error', (e) => {
            console.error(`Problem with request: ${e.message}`);
            res.status(500).json({ error: 'Internal Server Error' });
        });

        paymentReq.write(requestBody);
        paymentReq.end();
    } catch (error) {
        console.error('Transaction error:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};


export const callback = async (req, res) => {
    const { orderId, resultCode, extraData } = req.body;

    try {
        if (resultCode === 0) { // Thanh toán thành công
            const { user_id, showtime_id, selectedSeats, selectedCombos } = JSON.parse(extraData);
            // Thêm vào bảng orders
            const [orderResult] = await connection.promise().query(
                'INSERT INTO orders (user_id, showtime_id, order_date, total_price) VALUES (?, ?, NOW(), ?)',
                [user_id, showtime_id, req.body.amount]
            );

            const order_id = orderResult.insertId;
            // Thêm vào bảng tickets
            for (const seat of selectedSeats) {
                await connection.promise().query(
                    'INSERT INTO tickets (order_id, seat_id, ticket_price) VALUES (?, ?, ?)',
                    [order_id, seat.seat_id, seat.price]
                );
            }

            // Cập nhật bảng seat_status
            for (const seat of selectedSeats) {
                await connection.promise().query(
                    'UPDATE seat_status SET seat_status = 1 WHERE seat_id = ? AND showtime_id = ?',
                    [seat.seat_id, showtime_id]
                );
            }

            // Thêm vào bảng popcorn_orders
            for (const [comboId, combo] of Object.entries(selectedCombos)) {
                await connection.promise().query(
                    'INSERT INTO popcorn_orders (order_id, combo_id, combo_quantity) VALUES (?, ?, ?)',
                    [order_id, comboId, combo.quantity]
                );
            }

            return res.status(200).json({ message: 'Payment successful and order created.' });
        } else {
            const { showtime_id, selectedSeats} = JSON.parse(extraData);
            try {
                // Cập nhật trạng thái ghế lại thành 0 (chưa đặt)
                await updateSeatStatus(showtime_id, selectedSeats, null);
                console.log('Payment failed or canceled:', req.body);
                return res.status(400).json({ message: 'Payment failed or canceled.' });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ success: false, message: 'Error canceling reservation' });
            }
        }
    } catch (error) {
        console.error('Error in callback:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
