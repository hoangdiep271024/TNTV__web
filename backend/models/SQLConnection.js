import mysql from 'mysql2';

// Tạo một kết nối đơn lẻ
const connection = mysql.createConnection({
    host: 'localhost', // Địa chỉ của máy chủ cơ sở dữ liệu
    port: 3306,
    user: 'root', // Tên người dùng của cơ sở dữ liệu
    password: 'Noname4ever@', // Mật khẩu của cơ sở dữ liệu
    database: 'newschema' // Tên của cơ sở dữ liệu
});

// Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

export default connection;