import cors from "cors";

const whitelist = new Set(['https://example.org', 'http://localhost:5173']);

const corOptions = {
    optionsSuccesStatus: 200,
    origin: function (origin, callback) {
        if (whitelist.has(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}

export default cors(corOptions);