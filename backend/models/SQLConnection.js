import mysql from 'mysql2';

// Tạo một kết nối đơn lẻ
const connection = mysql.createConnection({
    host: 'localhost', // Địa chỉ của máy chủ cơ sở dữ liệu
    port: 3306,
    user: 'root', // Tên người dùng của cơ sở dữ liệu
<<<<<<< HEAD
    password: '5ang15122003', // Mật khẩu của cơ sở dữ liệu
    database: 'test' // Tên của cơ sở dữ liệu
=======
    password: 'Noname4ever@', // Mật khẩu của cơ sở dữ liệu
    database: 'newschema' // Tên của cơ sở dữ liệu
>>>>>>> eabbd50661aceb97a55d3d40a8d760f9a8644edc
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