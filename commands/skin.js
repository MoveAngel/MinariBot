exports.run = async (client, message, args, ops) => {
    let commandFile = require("./mcskin.js");
    commandFile.run(client, message, args, ops);
}