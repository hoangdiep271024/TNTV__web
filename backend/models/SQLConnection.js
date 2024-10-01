import mysql from 'mysql2';

// Tạo một connection pool
const pool = mysql.createPool({
    host: 'localhost', // Địa chỉ của máy chủ cơ sở dữ liệu
    port: 3306,
    user: 'root', // Tên người dùng của cơ sở dữ liệu
    password: '27102004', // Mật khẩu của cơ sở dữ liệu
    database: 'web_phim', // Tên của cơ sở dữ liệu
    waitForConnections: true, // Chờ cho đến khi có kết nối sẵn sàng
    connectionLimit: 10, // Số lượng kết nối tối đa trong pool
    queueLimit: 0 // Không giới hạn số lượng yêu cầu trong hàng đợi
});

// Sử dụng kết nối từ pool
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);

    // Sau khi hoàn thành sử dụng, trả lại kết nối cho pool
    connection.release();
});

export default pool;