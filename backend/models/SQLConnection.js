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
    password: '27102004', // Mật khẩu của cơ sở dữ liệu
    database: 'web_phim' // Tên của cơ sở dữ liệu
>>>>>>> 76055eb4ffe73813246578d9a1a6744c26addf5e
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