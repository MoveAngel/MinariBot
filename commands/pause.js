exports.run = (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);
  if(!fetched) return message.reply("There isn't any music playing in your guild.");
  if(message.member.voice.channel !== message.guild.me.voice.channel) return message.reply("Sorry, you aren't connected to the same channel");
  
  if(fetched.dispatcher.paused) return message.reply("Music is already paused!");
  
  fetched.dispatcher.pause();
  message.reply(`Successfully paused **${fetched.queue[0].songTitle}**`);
}