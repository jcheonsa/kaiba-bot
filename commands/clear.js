
module.exports.clear = async (message) => {
    try {

        if (!args[1]) return message.reply("Error - please define second arg.");
        message.channel.bulkDelete(args[1]);
        message.channel.send(`**Obelisk, fist of fate!**`).then((message) =>
          message.delete({
            timeout: 5000,
          })
        );
        console.log(message.member.displayName + " used the clear command.");
        break;
    } catch {

    }
}