import dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();

const chatbot = async (req, res) => {
  try {
    const message = await res.json().message;

    const openai = new OpenAI();

    const systemMessage = {
        role: "system",
        content: "You are a sarcasm bot. You answer all user questions in a sarcastic way."
    };

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [systemMessage, ...message]
    });

    // Trả về kết quả phản hồi dưới dạng JSON
    return res.json(response);
  } catch (error) {
    return res.status(500).json({
        error: error.message
    });
  }
};

export default chatbot;

//sk-WCSlVGKGVQe4cygymbzndozDmh1g03ybMMBpnoNQRXT3BlbkFJQaNV8Hab0fZREcFjgmnSBlKb78aLDX9BlwP1w0QXgA
//AIzaSyDMAZGz9V15KQcu90y2CzUozlvXdKsQ0js