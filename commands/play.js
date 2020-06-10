const ytdl = require('ytdl-core');

exports.run = async (client, message, args, ops) => {

    if (!message.member.voice.channel) return message.reply("You need to be in a voice channel, first!");

    if (!args[0]) return message.reply("Please search or input an url following the command!");

    let validate = await ytdl.validateURL(args[0]);
    if (!validate) {
      let commandFile = require("./search.js");
      commandFile.run(client, message, args, ops);
    };

    let info = await ytdl.getInfo(args[0]);
  
    let data = ops.active.get(message.guild.id) || {};
    
    if(!data.connection) data.connection = await message.member.voice.channel.join();
    if(!data.queue) data.queue = [];
    data.guildID = message.guild.id;
    data.queue.push({
      songTitle: info.title,
      requester: message.author.tag,
      url: args[0],
      announceChannel: message.channel.id
    });
    if(!data.dispatcher) play(client, ops, data);
    else {
      message.channel.send(`Added to queue: **${info.title}** | Requested by **<@${message.author.id}>**`);
    }
    ops.active.set(message.guild.id, data);
    

}

async function play(client, ops, data) {
  client.channels.cache.get(data.queue[0].announceChannel).send(`Now Playing **${data.queue[0].songTitle}** | Requested by ${data.queue[0].requester}`);
  
  data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, { type: 'opus' }));
  data.dispatcher.setVolume(50/100);
  data.dispatcher.guildID = data.guildID;
  
  data.dispatcher.once('finish', function() {
    finish(client, ops, this);
  });
  
}

function finish(client, ops, dispatcher) {
  let fetched = ops.active.get(dispatcher.guildID);
  fetched.queue.shift();
  
  if(fetched.queue.length > 0) {
    ops.active.set(dispatcher.guildID, fetched);
    play(client, ops, fetched);
  } else {
    ops.active.delete(dispatcher.guildID);
    let vc = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;
    if (vc) vc.leave();
  }
}