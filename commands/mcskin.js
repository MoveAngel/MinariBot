exports.run = (client, message, args, ops) => {
    const Discord = require('discord.js');
    if(!args[0]) return message.reply("Input a Minecraft Java Edition username to get its skin!");
    const skin = new Discord.MessageEmbed()
    .setTitle(`${args[0]}`)
    .setColor(`RANDOM`)
    .setImage(`https://minotar.net/armor/body/${args[0]}/150.png`)
    .setURL(`https://minotar.net/download/${args[0]}`)
    .setFooter("API provided by Minotar");
    message.channel.send(skin);
}