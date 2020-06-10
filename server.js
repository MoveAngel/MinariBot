const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./minaribot.js', {
  token: process.env.TOKEN,
  autoSpawn: true
});
console.log("[More&More Service] Starting bot shards...");
try {
  manager.spawn(2);
} catch (err) {
}
manager.on('shardCreate', (shard) => console.log(`[More&More Service] Shard ${shard.id} launched successfully`));