import express from "express";
import pg from "pg";
import shortRouter from "./routes/short.js";
import bodyParser from "body-parser";

const PORT = 4200;
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.use("/api", shortRouter);


// url, shortened url 
// {
//     "id": "1",
//     "url": "https://www.example.com/some/long/url",
//     "shortCode": "abc123",
//     "createdAt": "2021-09-01T12:00:00Z",
//     "updatedAt": "2021-09-01T12:00:00Z"
//   }

// {
//     "id": "1",
//     "url": "https://www.example.com/some/long/url",
//     "shortCode": "abc123",
//     "createdAt": "2021-09-01T12:00:00Z",
//     "updatedAt": "2021-09-01T12:00:00Z"
//   }

app.get("/", (req,res)=>{
    res.send("This is home...")
})

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}...`);
})

export default app;