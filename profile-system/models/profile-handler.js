// add information to user profile card
const Discord = require("discord.js");
const iEditor = require("../img-counter");
const { prefix } = require('../../config.json')

module.exports = {
  async addDesc1(message, guildID, userID, user) {
    let imgEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription("`Type what you want on the first line of your banner.`")
      .setFooter(`type ${prefix}cancel to abort this process at any time.`)
      .setTitle(`${user.username}'s profile customizer`);
    let DSR = await message.channel.send(imgEmbed);
    let filter = (m) => m.author.id === message.author.id;
    let query = await message.channel.awaitMessages(filter, {
      max: 1,
      time: 60000,
    });
    try {
      if (query.first().content === `${prefix}cancel`) {
        return message.reply("I end my turn.");
      } else {
        let DSC1 = [query.first().content];
        const newDesc = await iEditor.addDesc(guildID, userID, DSC1);
        message.reply(`You have updated your profile description.`);
      }
    } catch {
      message.reply("Timed out")
    }
  },
  async addDesc2(message, guildID, userID, user) {
    let imgEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription("`Type what you want on the second line of your banner.`")
      .setFooter(`type ${prefix}cancel to abort this process at any time.`)
      .setTitle(`${user.username}'s profile customizer`);
    let DSR = await message.channel.send(imgEmbed);
    let filter = (m) => m.author.id === message.author.id;
    let query = await message.channel.awaitMessages(filter, {
      max: 1,
      time: 60000,
    });
    try {
      if (query.first().content === `${prefix}cancel`) {
        return message.reply("I end my turn.");
      } else {
        let DSC2 = [query.first().content];
        const newDesc = await iEditor.addDesc2(guildID, userID, DSC2);
        message.reply(`You have updated your profile description.`);
      }
    } catch {
      message.reply("Timed out")
    }
  },
  async addDesc3(message, guildID, userID, user) {
    let imgEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription("`Type what you want on the third line of your banner.`")
      .setFooter(`type ${prefix}cancel to abort this process at any time.`)
      .setTitle(`${user.username}'s profile customizer`);
    let DSR = await message.channel.send(imgEmbed);
    let filter = (m) => m.author.id === message.author.id;
    let query = await message.channel.awaitMessages(filter, {
      max: 1,
      time: 60000,
    });
    try {
      if (query.first().content === `${prefix}cancel`) {
        return message.reply("I end my turn.");
      } else {
        let DSC3 = [query.first().content];
        const newDesc = await iEditor.addDesc3(guildID, userID, DSC3);
        message.reply(`You have updated your profile description.`);
      }
    } catch {
      message.reply('Timed out')
    }
  },
  async addBG(message, guildID, userID, user) {
    let imgEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription("Please provide a URL to your background.")
      .setFooter(`type ${prefix}cancel to abort this process at any time.`)
      .setTitle(`${user.username}'s profile customizer`);
    let DSR = await message.channel.send(imgEmbed);
    let filter = (m) => m.author.id === message.author.id;
    let query = await message.channel.awaitMessages(filter, {
      max: 1,
      time: 60000,
    });
    try {
      if (query.first().content === `${prefix}cancel`) {
        return message.reply("I end my turn.");
      } else {
        let BG = [query.first().content];
        const newDesc = await iEditor.addBG(guildID, userID, BG);
        message.reply(`You have updated your profile background.`);
      }
    } catch {
      message.reply('Timed out')
    }
  },
  async addBGColor(message, guildID, userID, user) {
    let imgEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription("Please provide the **hexcode** to your desired color.")
      .setFooter(`type ${prefix}cancel to abort this process at any time.`)
      .setTitle(`${user.username}'s profile customizer`);
    let DSR = await message.channel.send(imgEmbed);
    let filter = (m) => m.author.id === message.author.id;
    let query = await message.channel.awaitMessages(filter, {
      max: 1,
      time: 60000,
    });
    try {
      if (query.first().content === `${prefix}cancel`) {
        return message.reply("I end my turn.");
      } else if (!query.first().content.startsWith("#")) {
        message.channel.send("Invalid input. Please provide a valid **hexcode**.");
      }
      else {
        let BGcolor = [query.first().content];
        const newDesc = await iEditor.addBGColor(guildID, userID, BGcolor);
        message.reply(`You have updated your banner color.`);
      }
    } catch {
      message.reply('Timed out')
    }
  },
};
