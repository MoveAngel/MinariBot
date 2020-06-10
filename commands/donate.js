exports.run = (client, message, args, ops) => {
	message.reply("I'm sending you the donate url to give beer for my owner");
	message.author.send(process.env.DONATE_URL);
}