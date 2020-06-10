const request = require('request');

exports.run = (client, message, args, ops) => {
    const Discord = require('discord.js');
    const url = 'https://api.thevirustracker.com/free-api?global=stats';
    request(url, function(err, response, body) {
        if(err) {
            message.reply("Can't get COVID-19 stats, try again later.");
        }
        body = JSON.parse(body);
        const covidEmbed = new Discord.MessageEmbed()
        .setTitle(`COVID-19 stats`)
        .setColor(`#ba0d0d`)
        .setURL(`https://thevirustracker.com`)
        .addField(`New cases today`, body.results[0].total_new_cases_today, false)
        .addField(`New deaths today`, body.results[0].total_new_deaths_today, false)
        .setFooter("API provided by The Virus Tracker");
        message.channel.send(covidEmbed);
    });
}
