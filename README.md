# QuickLinc - URL Shortening Service

QuickLinc is a powerful URL shortening service that integrates with Discord, allowing users to generate and share shortened URLs seamlessly using the `/squeeze` command.

---

## Features
- Generate shortened URLs via a Discord bot.
- Store and retrieve URLs using a PostgreSQL database.
- Web API to shorten and resolve URLs.

---

## Prerequisites

### Software Requirements
- [Node.js](https://nodejs.org/) (version 16 or higher)
- Discord app
  

### Environment Variables
Ensure you have a `.env` file with the following variables:
```env
DISCORD_TOKEN=<Your_Discord_Bot_Token>
PG_CONNECTION_STRING=<Your_PostgreSQL_Connection_String>
```

---

## Installation and Setup

### Step 1: Clone the Repository
```bash
git clone <repository_url>
cd quicklinc
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Service
```bash
nodemon deadend.js
```

---

## Using the Service

### 1. Interact with the Discord Bot
- Open Discord and invite the bot to your server using your TOKEN and CLIENT_ID.
- Use the `/squeeze` command followed by the URL you want to shorten. For example:
  ```
  /squeeze https://www.example.com/some/long/url
  ```
- The bot will respond with a shortened URL, such as:
  ```
  Your shortened URL: https://quicklinc-1.vercel.app/api/short/abc123
  ```

### 2. Access the Shortened URL
- Share the shortened URL with others.
- Visiting the shortened URL will redirect to the original URL.

### 3. Web API
You can also interact with the service via its API:
- **Create Short URL:**
  ```
  POST /api/short
  Content-Type: application/json
  {
      "url": "https://www.example.com/some/long/url"
  }
  ```
- **Resolve Short URL:**
  ```
  GET /api/short/:shortCode
  ```

---

## Development Notes

### Running Locally
- Ensure your PostgreSQL server is running and accessible.
- Use `nodemon` to start the server for development:
  ```bash
  nodemon deadend.js
  ```

### Discord Command Setup
Ensure the Discord bot is registered with the `/squeeze` command for proper functionality.

---

## Troubleshooting

### Common Errors
- **Database Connection Issues:** Ensure your `PG_CONNECTION_STRING` is correct and the PostgreSQL server is running.
- **Bot Not Responding:** Verify the bot is online and has the necessary permissions in your Discord server.

### Logs
Monitor the console output for logs and errors.

---

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any bugs or enhancements.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact
For any questions or support, please contact:
- Avichal Trivedi
- avichaltrivedi111@gmail.com

Happy /sqeezing (skull)! 

