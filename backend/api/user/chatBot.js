import express from "express";
import chatbot from "../../controllers/user/chatbot3.js";

const routerChatBot = express.Router()
routerChatBot.post("/",chatbot)

export default routerChatBot; 