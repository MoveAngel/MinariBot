const ytdl = require("ytdl-core");

exports.run = async (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);
  if(!fetched) return message.reply("There isn't any music playing in your guild.");
  if(message.member.voice.channel !== message.guild.me.voice.channel) return message.reply("Sorry, you aren't connected to the same channel");
  let data = ops.active.get(message.guild.id) || {};
  let dispatcher = await data.connection.play(ytdl(data.queue[0].url, { type: 'opus' }));
  dispatcher.guildID = data.guildID;
  ops.active.delete(dispatcher.guildID);
  let vc = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;
  if (vc) vc.leave();
  message.guild.me.voice.channel.leave();
  message.reply('Successfully left the voice channel.');
}