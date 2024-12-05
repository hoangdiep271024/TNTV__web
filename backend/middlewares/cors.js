import cors from "cors";

const whitelist = new Set(['https://example.org', 'http://localhost:5173']);

const corOptions = {
    optionsSuccessStatus: 200, // Sửa lỗi chính tả từ `optionsSuccesStatus`
    origin: function (origin, callback) {
        // Cho phép khi `origin` là null hoặc nằm trong whitelist
        if (!origin || whitelist.has(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};


export default cors(corOptions);