import { Client, Events, GatewayIntentBits } from 'discord.js';
import express from "express";
import pg from "pg";
import * as env from "dotenv";
import bodyParser from 'body-parser';
import shortid from 'shortid';

env.config();

const db = new pg.Client({
    // user:process.env.PG_USER,
    // host:process.env.PG_HOST,
    // database:process.env.PG_DATABASE,
    // password:process.env.PG_PASSWORD,
    // port:process.env.PG_PORT,
    connectionString: process.env.PG_CONNECTION_STRING,
});

db.connect();

//this client has access to the guilds and guild messages thorugh intents
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
] });

client.on("messageCreate", async (message)=>{
    // console.log(message.content);
    if(message.author.bot) return;

    else if(message.content.startsWith('create')){
        // const url = message.content.split('create')[1]; 
        // the above did not work because i used 'create' instead of 'create ' (SPACE)
        const url = message.content.trim().split("create ")[1]?.trim();
        
 let shortCode = shortid.generate();
 let shortUrl = `http://localhost:4200/api/short/${shortCode}`;

 
        await db.query("INSERT INTO urls(originalurl, shortenedurl) VALUES($1,$2)", [url, shortUrl]);

        message.reply({
            content: `${shortUrl}`,
        });
        
        // return message.reply({
        //     content: `Generating Short ID for ${url} ... quicklinc : ${shortUrl}`,
        // })

    }
   

});

client.on("interactionCreate", async (interaction)=>{
// console.log(interaction);
if (!interaction.isCommand()) return;
if (interaction.commandName==='squeeze'){
    const url = interaction.options.getString('url').trim();
        
    let shortCode = shortid.generate();
    let shortUrl = `http://localhost:4200/api/short/${shortCode}`;
   
    
           await db.query("INSERT INTO urls(originalurl, shortenedurl) VALUES($1,$2)", [url, shortUrl]);
await interaction.reply({
    content: `Your shortened URL: ${shortUrl}`,
          ephemeral: true, 
})
}

interaction.reply({
    content:"Pong!"
})
});

const TOKEN = process.env.DISCORD_TOKEN;

client.login(TOKEN);






// CREATE TABLE urls (
//     id SERIAL PRIMARY KEY,              
//     originalURL TEXT NOT NULL,          
//     shortenedURL VARCHAR(50) NOT NULL,  
//     createdAt TIMESTAMP DEFAULT NOW()    
// );
