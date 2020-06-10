exports.run = (client, message, args, ops) => {
	let fetched = ops.active.get(message.guild.id);
	if(!fetched) return message.reply("There isn't any music playing in your guild.");
	if(message.member.voice.channel !== message.guild.me.voice.channel) return message.reply("Sorry, you aren't connected to the same channel");

	if(isNaN(args[0]) || args[0] > 50 || args[0] < 0) return message.reply("Please, input a number between 0-50");

	fetched.dispatcher.setVolume(args[0]/100);
	message.reply(`Successfully set volume of **${fetched.queue[0].songTitle}** to **${args[0]}%**`);
}