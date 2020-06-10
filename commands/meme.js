const request = require('request');

exports.run = (client, message, args, ops) => {
    const Discord = require('discord.js');
    const url = 'http://meme-api.herokuapp.com/gimme';
    request(url, function(err, response, body) {
        if(err) {
            message.reply("Can't get memes, try again later.");
        }
        body = JSON.parse(body);
        const memeEmbed = new Discord.MessageEmbed()
        .setTitle(`${body.title}`)
        .setColor(`RANDOM`)
        .setURL(`${body.postLink}`)
        .setImage(`${body.url}`)
        .setFooter("API provided by Meme API");
        message.channel.send(memeEmbed);
    });
}