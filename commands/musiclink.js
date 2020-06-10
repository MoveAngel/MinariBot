exports.run = (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    if(!fetched) return message.reply("There isn't any music playing in your guild.");
    let nowPlaying = fetched.queue[0];
    message.reply(`**${nowPlaying.songTitle}**\n${nowPlaying.url}`);
}