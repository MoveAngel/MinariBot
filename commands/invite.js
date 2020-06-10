exports.run = (client, message, args, ops) => {
	message.reply("I'm sending you the invite to add the bot in your Discord server");
	message.author.send(process.env.BOT_INVITE);
}