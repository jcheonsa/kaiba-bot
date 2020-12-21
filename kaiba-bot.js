// constants  
const Discord = require("discord.js"),
  config = require('./config.json'),
  prefix = config.prefix,
  path = require('path'),
  fs = require('fs'),
  mongo = require('./mongoose'),
  moment = require('moment'),
  client = new Discord.Client(),
  loadFeatures = require('./features/loadFeatures.js'),
  levels = require('./point-system/levels')
require('events').EventEmitter.defaultMaxListeners = 20;

client.on("ready", async () => {
  try {
    await mongo()
    console.log("Time to Duel!");
    client.user
      .setActivity("Maintenance", {
        type: "PLAYING",
      })
      .catch(console.error);
    loadFeatures(client)
    levels(client)

    const baseFile = 'command-proc.js',
      commandBase = require(`./commands/${baseFile}`)

    const readCommands = dir => {
      const files = fs.readdirSync(path.join(__dirname, dir))
      for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))
        if (stat.isDirectory()) {
          readCommands(path.join(dir, file))
        } else if (file !== baseFile) {
          const option = require(path.join(__dirname, dir, file))
          commandBase(client, option)
        }
      }
    }

    readCommands('commands')

  } catch (e) {
    console.log(e)
  }
});

/////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", (member) => {
  let replies = [
    "maybe you'll actually prove to be worth my time unlike these third-rate duelists. ",
    "make sure you follow the rules.. That is unless you have money...",
    "you show promise.. Interesting.",
  ];
  let random = Math.floor(Math.random() * 3);
  const channel = member.guild.channels.cache.find(
    (channel) =>
      channel.name === // welcome message
      "main-channel"
  );
  if (!channel) return;

  channel.send(
    `Welcome to ${member.guild.name}, ${member}, ${replies[random]} Type **${prefix}help* for information on the server.`
  );
});

client.on("message", async (message) => {

  if (message.author.id === config.ownerID || message.author.id === config.myID || !message.content.startsWith(prefix)) return;

  const { guild } = message;
  const args = message.content.slice(prefix.length).split(/ +/g);

  switch (args[0]) {

    //megaphone
    case "space":
      const mP = require('./megaphone')
      mP.MP(message);
      break;

    // show profile
    case "imagine":
      let member = message.mentions.members.first() || message.member;
      const ima = require("./profile-system/canvas.js");
      ima.imagine(message, member);
      break;

    case "spark":
      const combat = require('./combat-system/combat-handler')
      combat.setCombat(message)
      break;

    // case "test":
    //   const player = require('./combat-system/player-handler')
    //   var userData = { dex: 20, luk: 30 }
    //   var mobData = { dex: 50, luk: 10 }
    //   const userACC = await player.calcUserACC(userData, mobData)

    //   console.log(`User Acc ${userACC}`)
    //   break;

    case "mage":
      var test = require('./dead commands/class-check/checkSecondMage')
      test.secondMage(message)
      break;

    case "warrior":
      var test1 = require('./dead commands/class-check/checkSecondWarrior')
      test1.secondWarrior(message)
      break;
    case "ranger":
      var test2 = require('./dead commands/class-check/checkSecondRange')
      test2.secondRange(message)
      break;
    case "thief":
      var test3 = require('./dead commands/class-check/checkSecondThief')
      test3.secondThief(message)
      break;

    case "server":
      if (args[1].toLowerCase() === "stats") {
        let embed = new Discord.MessageEmbed()
          .setAuthor(`${guild.name}`, guild.iconURL())
          .setThumbnail(guild.iconURL())
          .setColor("#73ffdc")
          .addField("Created On", guild.createdAt.toLocaleString(), true)
          .addField("Server Owner", guild.owner.user.tag)
          .addField("Total Members", guild.memberCount, true)
          .addField(
            "Total Bots",
            guild.members.cache.filter((member) => member.user.bot).size
          )
          .setDescription(
            `${guild.roles.cache
              .map((role) => role.toLocaleString())
              .join(" ")}`
          );
        message.channel.send(embed);
      }
      break;

  }


});

client.login(config.token);