// development

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
>>>>>>> 4c3aa04eea8b8c4451754abeee8f672a4cea6a06
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

<<<<<<< HEAD
export default connection;
// import mysql from 'mysql2';

// // Tạo một kết nối đơn lẻ
// const connection = await mysql.createConnection({
//     host: '10.96.210.203', // Địa chỉ của máy chủ cơ sở dữ liệu
//     port: 3306, // Cổng của MySQL
//     user: 'fall2024c8g13', // Tên người dùng của cơ sở dữ liệu
//     password: 'nhtt2024', // Mật khẩu của cơ sở dữ liệu
//     database: 'fall2024c8g13_nhtt' // Tên của cơ sở dữ liệu
// });

=======
// deployment

// import mysql from 'mysql2';
// // Tạo một kết nối đơn lẻ
// const connection = mysql.createConnection({
//     host: '10.96.210.203', // Địa chỉ máy chủ MySQL
//     port: 3306,                      // Cổng MySQL (thường là 3306)
//     user: 'fall2024c8g13',           // Tên người dùng MySQL
//     password: 'nhtt2024',            // Mật khẩu của người dùng
//     database: 'fall2024c8g13_nhtt',   // Tên cơ sở dữ liệu
//     connectTimeout: 10000 // Tăng thời gian timeout lên 10 giây
// });
>>>>>>> 4c3aa04eea8b8c4451754abeee8f672a4cea6a06
// // Kết nối đến cơ sở dữ liệu
// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting: ' + err.stack);
//         return;
//     }
//     console.log('Connected as id ' + connection.threadId);
// });

<<<<<<< HEAD
// export default connection;
=======
// export default connection;
>>>>>>> 4c3aa04eea8b8c4451754abeee8f672a4cea6a06
