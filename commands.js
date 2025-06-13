import { REST, Routes } from 'discord.js';
import * as env from "dotenv";


env.config();

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },

   {
    name: 'pong',
    description: 'Replies with Pong!',
  },

  {
    name: 'squeeze',
    description: "Generate a shortened URL.",
    options: [
        {
          name: 'url',
          type: 3, //STRING
          description: 'The URL you want to shorten',
          required: true,
        },
      ],

  }
];

const TOKEN = process.env.DISCORD_TOKEN;
const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
    console.log('Started refreshing application (/) commands.');
    const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }