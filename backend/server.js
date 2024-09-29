import cookieParser from "cookie-parser";
import express, { json } from "express";
import path from "path";
import { fileURLToPath } from 'url';
const app = express();

// Tạo __dirname và __filename trong môi trường ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../frontend');


//set up
app.use(express.urlencoded({ extended: false }))
app.use(json());
app.use(cookieParser());
app.set('trust proxy', 1)

//lay port = 8888
const port = 8888;

app.use(express.static(path.join(distPath, 'dist'))); // Hoặc 'build'

// Các route khác sẽ trả về index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(distPath, 'dist', 'index.html')); // Chuyển đổi thành đường dẫn tuyệt đối
});

app.listen(port,()=>{
    console.log("Server is listening port "+port);
})