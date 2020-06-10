exports.run = (client, message, args, ops) => {

	if(message.author.id !== ops.ownerID) return message.reply("**Only the bot's creator can use this command!**");

	try {
		delete require.cache[require.resolve(`./${args[0]}.js`)];
	} catch (e) {
		return message.reply(`Unable to reload: **${args[0]}**`);
		console.log(`Unable to reload: ${args[0]}`);
	}

	message.channel.send(`Successfully reloaded: **${args[0]}**`);
	console.log(`Successfully reloaded: ${args[0]}`);
}