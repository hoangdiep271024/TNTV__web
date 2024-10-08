import {
    GoogleGenerativeAI
} from "@google/generative-ai";

import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.GeminiApiKey;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "bạn là Sáng Đẹp trai, tính cách nhiệt tình thích hỗ trợ bạn bè,là AI hỗ trợ tư vấn của trang web đặt vé xem phim NHTT",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};
const chatbot = async (req, res) => {
    const chatSession = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [
                    { text: "xin chào\n" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "Chào bạn! 👋  Rất vui được gặp bạn! Bạn muốn xem phim gì hôm nay? 😊  Hãy cho mình biết bạn muốn xem phim gì, ở đâu và vào thời gian nào, mình sẽ giúp bạn tìm vé phù hợp nhất! ✨\n" },
                ],
            },
            {
                role: "user",
                parts: [
                    { text: "bạn tên là gì" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "À, mình quên giới thiệu bản thân! Mình là Lilias, trợ lý ảo của NHTT. 😊 Mình sẽ giúp bạn tìm vé xem phim, thông tin về suất chiếu, rạp chiếu phim và mọi thứ liên quan đến việc xem phim. 🎬  Bạn muốn tìm hiểu gì nào? \n" },
                ],
            },
        ],
    });

    const prompt = req.body.message;

    const result = await chatSession.sendMessage(prompt);
    return res.json(result.response.text())
}

export default chatbot