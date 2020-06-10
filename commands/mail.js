const request = require('request');
const Discord = require('discord.js');

exports.run = (client, message, args, ops) => {
    var password = args[1];
    if(!args[0]) return message.reply("Insert the username you want to use");
    if(!args[1]) {
        password = Math.random().toString(36).slice(-8);
    }
    var url = "https://pddimp.yandex.ru/api2/admin/email/add";
    var pddtoken = "QW6Y3OFLLAISUSVUP5JYOIXOF4XMY5S7JHQ5RXLKFR5NYBIE4XHA";
    var domain = "universemail.tk";
    request(url, {
        headers: {
            "PddToken": pddtoken,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        body: `domain=${domain}&login=${args[0]}&password=${password}`,
    }, function(err, response, req, body) {
        if(err) {
            console.log(err);
            return message.reply("Can't create mail at the moment, try again later...");
        }
        var mailparse = JSON.parse(response.body);
        console.log(`${message.author.tag} requested a new mailbox, this is the log:\n${response.body}`);
        message.channel.messages.fetch({ limit: 1 }).then(messages => {
            message.channel.bulkDelete(messages)
        });
        if(mailparse.success == "ok") {
            message.reply("I'm sending you a private message with the new mailbox informations");
            const mailEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('New mailbox informations')
            .setURL(`https://mail.${domain}`)
            .setDescription(`WARNING: You shouldn't use this mail for normal use, but for privacy use, you've been warned`)
            .addField("Website URL", `https://mail.${domain}`)
            .addField("Login", `${args[0]}@${domain}`)
            .addField("Password", `${password}`)
            .setFooter("Powered by Yandex", "https://alternativebk.com/wp-content/uploads/2020/02/5e434e2ed746d.png");
            message.author.send(mailEmbed);
        }
        if(mailparse.success == "error") {
            var replyError = "An error occured, try to contact the bot administrator to resolve this bug";
            if(mailparse.error == "passwd-tooshort") replyError = "Password is too short!";
            if(mailparse.error == "occupied") replyError = "Username is not available";
            message.reply(replyError);
        }
    })
}