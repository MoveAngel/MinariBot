const Discord = require('discord.js');
const client = new Discord.Client();
const active = new Map();
const pingFrequency = (30 * 1000);
const waitingTime = (10 * 1000);
const fs = require('fs');

const prefix = process.env.PREFIX;
const ownerID = process.env.OWNERID;

client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
});

client.on("guildDelete", guild => {
    console.log("Left a guild: " + guild.name);
});

client.on('message', message => {

	let args = message.content.slice(prefix.length).trim().split(' ');
	let cmd = args.shift().toLowerCase();

	if(message.author.bot) return;
	if(!message.content.startsWith(prefix)) return;

	try {
		let ops = {
			ownerID: ownerID,
            active: active
		}
		let commandFile = require(`./commands/${cmd}.js`);
		commandFile.run(client, message, args, ops);
	} catch (e) {
		console.log(`${message.author.tag} issued command '${prefix}${cmd}', but it doesn't exist`);
		message.reply(`Unknown command. Try __${prefix}help__ for a list of commands.`);
	}
});

function getGuildsNumber() {
	client.shard.fetchClientValues('guilds.cache.size')
	.then(results => {
		return client.user.setActivity(`${prefix}help | ${prefix}invite | ${results.reduce((prev, guildCount) => prev + guildCount, 0)} servers`);
	})
	.catch(console.error);
}

client.on('ready', () => {
	setTimeout(getGuildsNumber, waitingTime)
	client.setInterval(getGuildsNumber, pingFrequency);
});
client.login(process.env.TOKEN);