exports.run = (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);
  if(!fetched) return message.reply("There isn't any music playing in your guild.");
  if(message.member.voice.channel !== message.guild.me.voice.channel) return message.reply("Sorry, you aren't connected to the same channel");
  
  let userCount = message.member.voice.channel.members.size;
  let required = Math.ceil(userCount/2);
  
  if(!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];
  if(fetched.queue[0].voteSkips.includes(message.member.id)) return message.reply(`Sorry, you already voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required.`);
  
  fetched.queue[0].voteSkips.push(message.member.id);
  ops.active.set(message.guild.id, fetched);
  
  if(fetched.queue[0].voteSkips.length >= required) {
    message.channel.send("Successfully skipped song!");
    return fetched.dispatcher.emit('finish');
  }
  
  message.channel.send(`Successfully skipped song! ${fetched.queue[0].voteSkips.length}/${required} required`);
  
}