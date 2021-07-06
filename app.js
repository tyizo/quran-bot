const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const client = new Discord.Client();

client.once("ready", () => {
  const channel = client.channels.cache.get("861872417504231454");
  if (!channel) return console.error("The channel does not exist!");
  channel
    .join()
    .then((connection) => {
      const dispatcher = connection.play("./quran.mp3");
      dispatcher.on("start", () => {
        console.log("Quran is now playing!");
      });
      console.log("Successfully connected.");

      let isFinish = false;
      dispatcher.on("finish", () => {
        isFinish = true;
      });

      if (isFinish) {
        connection.play("./quran.mp3");
        console.log("Playing Quran Again!");
      }
    })
    .catch((e) => {
      // Oh no, it errored! Let's log it to console :)
      console.error(e);
    });

  console.log("Ready!");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (message.member.hasPermission("ADMINISTRATOR")) {
    if (command === "pause") {
      dispatcher.pause();
    }
    if (command === "leave") {
      connection.disconnect();
    }
    if (command === "end") {
      dispatcher.destroy();
    }
    if (command === "play") {
      // it's playing by default so don't use this command a lot.
      connection.play("./quran.mp3");
    }
  }
  if (!message.member.hasPermission("ADMINISTRATOR")) return;
});

client.login(token);
