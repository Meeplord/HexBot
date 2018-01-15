var bot = new Eris("BOT_TOKEN");
bot.on("ready", () => {
    console.log("Ready!");
});
bot.on("messageCreate", (msg) => {
    if(msg.content === "!ping") {
        bot.createMessage(msg.channel.id, "Pong!");
    }
});
bot.on("messageCreate", (msg) => {
    if(msg.content === "!help") {
        bot.createMessage(msg.channel.id, "**Commands:** \n **Prefix:** !\n **Ping:** Pong. \n **Help:** Displays this message with all the commands of the bot."
    }
});
bot.on("messageCreate", (msg) => {
    var args = message.content.split(" ")
    if(args[0] === "!purge") {
        bot.purgeChannel(msg.channel.id, args[1]);
    }
});
bot.connect();
