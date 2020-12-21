// allows admins to bulk clear messages
module.exports = {

  commands: ['clear'],
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: '<num1>',
  description: "Allows admins to mass clear chat logs",
  permissions: ['ADMINISTRATOR'],
  callback: (message, args) => {
    try {

      if (!args[0]) return message.reply("Error - please define second arg.");
      message.channel.bulkDelete(args[0]);
      message.channel.send(`**Obelisk, fist of fate!**`).then((message) =>
        message.delete({
          timeout: 5000,
        })
      );
      console.log(message.member.displayName + " used the clear command.");
    } catch {

    }
  },

}