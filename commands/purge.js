exports.run = async (client, message, args, ops) => {
    let commandFile = require("./clear.js");
    commandFile.run(client, message, args, ops);
}