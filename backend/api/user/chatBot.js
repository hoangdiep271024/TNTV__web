import express from "express";
import chatBot from "../../controllers/user/chatBot";

const routerChatBot = express.Router()
routerChatBot.post("/",chatBot)

export default routerChatBot; 