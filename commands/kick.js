exports.run = (client, message, args, ops) => {
	if(message.channel.type == 'DM') return message.reply('You can use this command only in servers');
	if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply("You haven't the permission to execute this command!");
	let mentionMember = message.mentions.members.first();
	if(!mentionMember) return message.reply("Mention the user you want to kick!");
	if(!mentionMember.kickable) return message.reply("I haven't the permission to kick this user. Does he have a higher role? Have I got the permission to kick him?");
	try {
		mentionMember.kick()
	} catch (error) {
		message.reply("Can't kick this user, does he have a higher role? Is the server creator? Have I got the permission to kick him?");
	}
	const Discord = require('discord.js');
	const kickConfirm = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setDescription(`✅ ${mentionMember} has been successfully kicked!`);
	message.channel.send(kickConfirm);
}