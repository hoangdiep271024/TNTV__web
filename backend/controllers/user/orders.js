import connection from "../../models/SQLConnection.js";
const getOrderDetail = async(req,res) =>{
    const order_id = req.params.order_id;
    console.log(order_id)
    try {
        // Truy vấn thông tin đơn hàng từ bảng orders
        const [orderData] = await connection.promise().query(
            'SELECT * FROM orders WHERE order_id = ?',
            [order_id]
        );

        if (orderData.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Truy vấn thông tin vé từ bảng tickets
        const [ticketsData] = await connection.promise().query(
            'SELECT * FROM tickets WHERE order_id = ?',
            [order_id]
        );

        // Truy vấn thông tin bắp nước từ bảng popcorn_orders
        const [popcornData] = await connection.promise().query(
            'SELECT * FROM popcorn_orders WHERE order_id = ?',
            [order_id]
        );

        // Kết hợp thông tin vào một đối tượng trả về
        const orderInfo = {
            order: orderData[0],
            tickets: ticketsData,
            popcornOrders: popcornData,
        };

        res.json(orderInfo);
    } catch (error) {
        console.error('Error fetching order data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default getOrderDetail