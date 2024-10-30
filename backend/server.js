import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express, { json } from "express";
import session from 'express-session';
import path from "path";
import { fileURLToPath } from 'url';
import api from "./api/user/index.js";
import corMw from "./middlewares/cors.js";
const app = express();

import { adminApi } from "./api/admin/index.js";

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Bỏ secure nếu không dùng HTTPS
}));

config();

const PORT = process.env.PORT;

// Tạo __dirname và __filename trong môi trường ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../frontend');


//set up
app.use(express.urlencoded({ extended: false }))
app.use(json());
app.use(cookieParser());
app.set('trust proxy', 1)
app.options('*', corMw);
app.use(bodyParser.json());

app.use(express.static(path.join(distPath, 'dist'))); // Hoặc 'build'

// tạo api
app.use('/api',api);

adminApi(app);

// Các route khác sẽ trả về index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(distPath, 'dist', 'index.html')); // Chuyển đổi thành đường dẫn tuyệt đối
});

app.listen(PORT,()=>{
    console.log("Server is listening port "+PORT);
})