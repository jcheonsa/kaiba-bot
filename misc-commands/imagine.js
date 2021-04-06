const ima = require("../profile-system/canvas");

module.exports = {

    commands: ['imagine', 'im'],
    description: "Displays profile along with other useful information",
    minArgs: 0,
    maxArgs: 2,
    expectedArgs: `**(<@mentioned-user)**`,
    cooldown: 10,
    callback: (message) => {

        let member = message.mentions.members.first() || message.member;

        ima.imagine(message, member);
    }
}