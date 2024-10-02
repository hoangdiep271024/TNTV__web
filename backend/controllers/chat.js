import axios from 'axios';
import dotenv from 'dotenv';
// import { default as Configuration, default as OpenAIApi } from 'openai';

dotenv.config();

// // Cấu hình OpenAI
// const configuration = new Configuration({
//   apiKey: process.env.OpenAIApi, // Đảm bảo biến môi trường này được định nghĩa trong file .env
// });

// const openai = new OpenAIApi(configuration);

const chat = async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'hi' }],
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OpenAIApi}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
  } catch (error) {
    if (error.response && error.response.status === 429) {
      // Quá nhiều yêu cầu, thêm delay trước khi thử lại
      console.log('Too many requests, waiting 1 minute...');
      setTimeout(chat, 60000); // Chờ 1 phút rồi thử lại
    } else {
      console.error(error);
    }
  }
}

export default chat;
//sk-WCSlVGKGVQe4cygymbzndozDmh1g03ybMMBpnoNQRXT3BlbkFJQaNV8Hab0fZREcFjgmnSBlKb78aLDX9BlwP1w0QXgA
//AIzaSyDMAZGz9V15KQcu90y2CzUozlvXdKsQ0js