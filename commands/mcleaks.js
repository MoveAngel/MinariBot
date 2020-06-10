const request = require('request');
const Discord = require('discord.js');

exports.run = (client, message, args, ops) => {
    var url = "https://auth.mcleaks.net/v1/redeem";
    if(!args[0]) return message.reply("No, this is not a generator, but it is a MCLeaks token validator.\nTo get a token, go to https://mcleaks.net and click **GET MC ACCOUNT NOW**, then copy the token after the command, and you'll get some infos.\nIf you want to use it in Minecraft, download the MCLeaks Authenticator and renew the alt (https://mcleaks.net/renew).");
    request(url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({"token":args[0]})
    }, function(err, response, req, body) {
        if (err) {
            console.log(err);
            return message.reply("Can't get any MCLeaks information at the moment, try again later");
        }
        console.log(`${message.author.tag} requested MCLeaks account informations, this is the log:\n${response.body}`);
        var mcleaksparse = JSON.parse(response.body);
        if(mcleaksparse.success == false) return message.reply("Token is invalid, you may used an already used token, or you used this command again with the same previous token and if so, renew your token.");
        let commandFile = require("./mcskin.js");
        args[0] = mcleaksparse.result.mcname;
        commandFile.run(client, message, args, ops);
    })
}