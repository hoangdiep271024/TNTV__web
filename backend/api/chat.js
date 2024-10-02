import express from "express";
import chat from "../controllers/chat.js";

const routerChat = express.Router()
routerChat.post("/",chat)

export default routerChat; 