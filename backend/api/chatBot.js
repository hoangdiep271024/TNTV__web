import express from "express";
import chatbot from "../controllers/chatbot3.js";

const routerChatBot = express.Router()
routerChatBot.post("/",chatbot)

export default routerChatBot; 