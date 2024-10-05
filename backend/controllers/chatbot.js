import { NlpManager } from 'node-nlp';
import connection from '../models/SQLConnection.js';
// Tạo NlpManager
const manager = new NlpManager({ languages: ['vi'] });

// Huấn luyện các câu hỏi mẫu
manager.addDocument('vi', 'tư vấn phim %movie%', 'film.suggestion');
manager.addDocument('vi', 'cho tôi biết về phim %movie%', 'film.info');

// Trả lời
manager.addAnswer('vi', 'film.suggestion', 'Bạn có thể thử xem %movie%.');
manager.addAnswer('vi', 'film.info', async (response) => {
  const movieName = response.entities.find(entity => entity.entity === 'movie').option;
  return getMovieInfo(movieName);
});

// Hàm lấy thông tin phim từ MySQL
async function getMovieInfo(movieName) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM films WHERE film_name = ?';
    connection.query(query, [movieName], (err, results) => {
      if (err) {
        reject(err);
      } else if (results.length > 0) {
        resolve(`Phim: ${results[0].title}, Thể loại: ${results[0].genre}, Năm phát hành: ${results[0].year}`);
      } else {
        resolve(`Xin lỗi, không tìm thấy thông tin về phim ${movieName}.`);
      }
    });
  });
}

// API cho chatbot
const chatbot = async (req, res) => {
  return res.json("a")
  try {
    const userMessage = req.body.message;

    // Xử lý câu hỏi người dùng
    const response = await manager.process('vi', userMessage);

    // Kiểm tra nếu không có câu trả lời phù hợp
    if (!response.answer) {
      return res.json({ reply: "Xin lỗi tôi không hiểu câu hỏi của bạn." });
    }

    // Trả về câu trả lời
    console.log(response.answer);
    return res.json({ reply: response.answer });
  } catch (error) {
    return res.json(error.message)
  }
};

export default chatbot