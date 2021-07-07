const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const client = new Discord.Client();
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok tyizo !');
});
server.listen(4000);
client.once("ready", () => {
  const channel = client.channels.cache.get("861872417504231454");
  if (!channel) return console.error("The channel does not exist!");
  channel
    .join()
    .then((connection) => {
      const play = () => {
        const { dispatcher } = connection
          .play("./quran.mp3")
          .on("finish", play);
      };
      console.log("Successfully connected.");
      play();
    })
    .catch((e) => {
      console.error(e);
    });
  console.log("Ready!");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
});

client.login(token);
