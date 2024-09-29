import express from "express";
const app = express();
const port = 8888;

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.listen(port,()=>{
    console.log("app is listening port "+port);
})