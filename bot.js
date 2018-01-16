const Eris = require("eris");
// Replace BOT_TOKEN with your bot account's token
var bot = new 
Eris.CommandClient("BOT_TOKEN", {}, {
    description: "A bot made with Eris",
    owner: "Your name",
    prefix: "prefix you want to use"
});


bot.registerCommandAlias("halp", "help"); // Alias !halp to !help


bot.on("ready", () => {
    console.log("Ready!");
});

// An about command
bot.registerCommand("about", "Information about the bot, that you want the command to return when you type it in.", {
    description: "About",
    fullDescription: "This command gives you information about the bot."
});

//A cool !ping command
bot.registerCommand("ping", "Pong!", { // Make a ping command
// Responds with "Pong!" when someone says "!ping"
    description: "Pong!",
    fullDescription: "This command could be used to check if the bot is up. Or entertainment when you're bored.",
    reactionButtons: [ // Add reaction buttons to the command
        {
            emoji: "⬅",
            type: "edit",
            response: (msg) => { // Reverse the message content
                return msg.content.split().reverse().join();
            }
        },
        {
            emoji: "🔁",
            type: "edit", // Pick a new pong variation
            response: ["Pang!", "Peng!", "Ping!", "Pong!", "Pung!"]
        },
        {
            emoji: "⏹",
            type: "cancel" // Stop listening for reactions
        }
    ],
    reactionButtonTimeout: 30000 // After 30 seconds, the buttons won't work anymore
});

// An echo command that is linked with line 64 through 75, use it like !echo reverse (msg)
var echoCommand = bot.registerCommand("!echo", (msg, args) => { // Make an echo command
    if(args.length === 0) { // If the user just typed "!echo", say "Invalid input"
        return "Invalid input";
    }
    var text = args.join(" "); // Make a string of the text after the command label
    return text; // Return the generated string
}, {
    description: "Make the bot say something",
    fullDescription: "The bot will echo whatever is after the command label.",
    usage: "<text>"
});

//Linked with lines 50 through 61

echoCommand.registerSubcommand("reverse", (msg, args) => { // Make a reverse subcommand under echo
    if(args.length === 0) { // If the user just typed "!echo reverse", say "Invalid input"
        return "Invalid input";
    }
    var text = args.join(" "); // Make a string of the text after the command label
    text = text.split("").reverse().join(""); // Reverse the string
    return text; // Return the generated string
}, {
    description: "Make the bot say something in reverse",
    fullDescription: "The bot will echo, in reverse, whatever is after the command label.",
    usage: "<text>"
});


echoCommand.registerSubcommandAlias("backwards", "reverse"); // Alias "!echo backwards" to "!echo reverse"

//Kick command
//Usage: !kick @Username
bot.registerCommand("!kick", (msg, args) => {
    bot.kickGuildMember(msg.channel.guild.id, msg.mentions[0].id);
        bot.createMessage(msg.channel.id, "Kicked user " + msg.mentions[0].username);
},{
    requirements: {
        permissions: {
        "kickMembers": true
    }
    }
});


//Ban Command
//Usage: !ban @Username
bot.registerCommand("!ban", (msg, args) => {
    bot.banGuildMember(msg.channel.guild.id, msg.mentions[0].id);
        bot.createMessage(msg.channel.id, "Banned user " + msg.mentions[0].username);
},{
    requirements: {
        permissions: {
        "banMembers": true
    }
    }
});

bot.connect();
