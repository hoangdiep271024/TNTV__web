
import dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OpenAIApi,
});


const chatbot = async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.message }],
    });
    console.log(response.choices[0].message.content);
  } catch (error) {
    return res.status(500).json({
        error: error.message
    });
  }
};

export default chatbot;
