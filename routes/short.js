import express, { Router } from "express";
import pg from "pg";
import * as env from "dotenv";
import shortid from "shortid";

const router = express.Router();
env.config();

const db = new pg.Client({
    // user:process.env.PG_USER,
    // host:process.env.PG_HOST,
    // database:process.env.PG_DATABASE,
    // password:process.env.PG_PASSWORD,
    // port:process.env.PG_PORT,
    connectionString:process.env.PG_CONNECTION_STRING,
});

db.connect();

router.get("/short", (req,res)=>{
    res.send("shortened service");
})

router.post("/short", async(req,res)=>{
    try {
        const url = req.body.url;
    const result = await db.query("SELECT * FROM urls WHERE originalurl = $1", [url]);
    if(result.rows.length!==0)
    {
        const shortUrl = result.rows[0].shortenedurl;
        console.log(shortUrl);
        res.status(200).json({ shortUrl, message: "URL already shortened!" });
        
    } else {

 let shortCode = shortid.generate();
 let shortUrl = `https://quicklinc.vercel.app/api/short/${shortCode}`;
 console.log(shortUrl);
 
        await db.query("INSERT INTO urls(originalurl, shortenedurl) VALUES($1,$2)", [url, shortUrl]);
        res.status(201).json({shortUrl, message: "URL shortened successfully!"});
    }
   
    
    } catch (error) {
        console.log("Error : ", error);
        res.status(500).json({ message: "Internal server error" });
    }



})

router.get("/short/:shortCode", async (req,res)=>{
    const shortCode = req.params.shortCode;
    const shortURL = `https://quicklinc-1.vercel.app/api/short/${shortCode}`;

    try {
        const result = await db.query("SELECT originalurl FROM urls WHERE shortenedurl=$1", [shortURL]);

        if(result.rows.length!=0){
            const originalURL = result.rows[0].originalurl;
            res.redirect(originalURL);
        } else {
            res.status(404).json({message: "Shortened URL not found!"});
        }
    } catch (error) {
        console.log("Error retrieving URL.", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



export default router;