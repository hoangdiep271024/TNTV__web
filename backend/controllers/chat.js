import dotenv from 'dotenv';
import { default as Configuration, default as OpenAIApi } from 'openai';

dotenv.config();

// Cấu hình OpenAI
const configuration = new Configuration({
  apiKey: process.env.OpenAIApi, // Đảm bảo biến môi trường này được định nghĩa trong file .env
});

const openai = new OpenAIApi(configuration);

const chat = async (req, res) => {
  const userMessage = req.body.message;
  
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Hoặc model bạn muốn sử dụng
      messages: [
        { role: "user", content: userMessage },
        { role: "system", content: "Bạn là một trợ lý tư vấn cho một rạp chiếu phim. Bạn chỉ sử dụng thông tin mà người dùng cung cấp để trả lời câu hỏi." }
      ],
    });

    const botReply = response.data.choices[0].message.content;
    res.json({ reply: botReply });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ reply: 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
  }
}

export default chat;
