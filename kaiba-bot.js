// constants  
const Discord = require("discord.js");
const config = require('./config.json')
const prefix = config.prefix
const userCreatedPolls = new Map();
const mongoose = require("mongoose");

var client = new Discord.Client();

client.on("ready", () => {
  console.log("Time to duel!");
  client.user
    .setActivity("A Childrens' Card Game", {
      type: "PLAYING",
    })
    .catch(console.error);

  const LBSchema = require('./schemas/LBSchema');
  const FSchema = require('./schemas/factionSchema')

  const fetchTopMembers = async (guildID) => {
    let text = ''

    const results = await FSchema.find({
      guildID
    })

    console.log('RESULTS: ', results)

    return text
  }

  const updateLB = async (client) => {
    const results = await LBSchema.find({})

    for (const result of results) {
      const { channelID, _id: guildID } = result

      const guild = client.guilds.cache.get(guildID)

      if (guild) {
        const channel = guild.channels.cache.get(channelID)
        if (channel) {
          const messages = await channel.messages.fetch()
          const firstM = messages.first()

          const topMembers = await fetchTopMembers(guildID)
        }
      }

    }
    setTimeout(() => {
      updateLB(client)
    }, 1000 * 60)
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
      "🍻-sinnerscorner"
  );
  if (!channel) return;

  channel.send(
    `Welcome to ${member.guild.name}, ${member}, ${replies[random]} Type **${prefix}help* for information on the server.`
  );
});

client.on("message", async (message) => {

  if (message.author.bot || !message.content.startsWith(prefix)) return;
  if (message.author.bot) return;
  const { guild } = message;
  const guildID = message.guild.id;
  const userID = message.author.id;
  let user = message.author;
  const args = message.content.slice(prefix.length).split(/ +/g);

  switch (args[0]) {

    //megaphone
    case "s":
      const mP = require('./commands/megaphone')
      mP.MP(message);

    //help
    case "help":
      const hP = require('./commands/help')
      hP.help(message, guild)

    // clear
    case "clear":
      const cR = require('./commands/clear')
      if (
        !message.member.id === config.ownerID
      )
        return message.channel
          .send("You do not have access to this command.")
          .then(
            console.log(
              message.member.displayName + " tried using the clear command."
            )
          )
      else {
        cR.clear(message)
      };

    // profile customizer
    case "profile":
      const pR = require('./commands/profile')
      pR.profile(message, guildID, userID, user);

    // show profile
    case "imagine":
      const ima = require("./commands/canvas.js");
      const args = message.content.split(" ");
      let member = message.mentions.members.first() || message.member;
      ima.imagine(client, message, member);

    // test function
    case "test":
      const sLB = require('./commands/setLB')
      sLB.setLB(message)

    // check points
    case "points":
      let member = message.mentions.members.first() || message.member
      const fptCheck = require('./commands/point-system/factions')
      fptCheck.balance(message, member)

    // reward points
    case "nice":
      if (message.author.id != config.ownerID) {
        return message.reply("You don't have access to this command.")
      } else {
        let member = message.mentions.members.first()
        const aptCheck = require('./commands/point-system/add-points')
        aptCheck.reward(message, member, args)
      }

    // suggestions
    case "idea":
      const isG = require('./commands/suggestions')
      isG.suggest(message)

    // polling
    case "poll":
      const pL = require('./commands/poll-system/poll')
      if (args[1] === "start") {
        if (userCreatedPolls.has(message.author.id)) {
          message.channel.send("You already have a poll going on right now.");
          return;
        } else {
          pL.poll(message, userCreatedPolls)
        }
      }
      if (args[1] === "stop") {
        pL.stopVote(message, userCreatedPolls)
      }

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
      if (args[1].toLowerCase() === "purge") {

        if (
          !message.member.id === config.ownerID
        )
          return message.channel
            .send("You do not have access to this command.");


        const list = client.guilds.cache.get(config.guildID);

        let sRole = config.sRole
        let smRole = config.smRole
        let bRole = config.bRole
        let scRole = config.scRole
        let exRole = config.exRole
        let cRole = config.cRole
        let gRole = config.gRole

        // Iterate through the collection of GuildMembers from the Guild getting the username property of each member 

        list.members.cache.filter((member) => !member.user.bot).forEach(member => {
          if (member.roles.cache.some(role => role.name === exRole.name)) {
            member.roles.remove(exRole)
              .then(console.log(`Removed role from user ${member.user.tag}.`));
          }
          if (member.roles.cache.some(role => role.name === sRole.name)) {
            member.roles.remove(sRole)
              .then(console.log(`Removed role from user ${member.user.tag}.`));
          }
          if (member.roles.cache.some(role => role.name === bRole.name)) {
            member.roles.remove(bRole)
              .then(console.log(`Removed role from user ${member.user.tag}.`));
          }
          if (member.roles.cache.some(role => role.name === scRole.name)) {
            member.roles.remove(scRole)
              .then(console.log(`Removed role from user ${member.user.tag}.`));
          }
          if (member.roles.cache.some(role => role.name === smRole.name)) {
            member.roles.remove(smRole)
              .then(console.log(`Removed role from user ${member.user.tag}.`));
          }
          member.roles.add(gRole);
        });
        message.channel.send("The annual Purge has begun. Please stay indoors for the next few moments as the server goes under maintenance, lest you face the wrath of Obeslik.")
      }
      console.log(
        message.member.displayName + ` used the ${message.content} command`
      );
      break;

    // team sorting
    case "teamsort":
      const sortT = require('./commands/teamsort')
      sortT.sort(message)
  }

});

client.on("message", (message) => {
  if (message.author.bot) return;
  var content = message.content.split(" ");
  let random = Math.floor(Math.random() * 11);
  const fResponses = require('./util/fresponses.json')
  const forbiddenWords = require('./util/fwords.json')
  const hResponses = require('./util/hresponses.json')
  for (var i = 0; i < forbiddenWords.length; i++) {
    if (message.content.toLowerCase().includes(forbiddenWords[i])) {
      message.channel.send(fResponses[random]);
    }
  }
  if (hResponses[message.content.toLowerCase()]) {
    message.channel.send(hResponses[message.content.toLowerCase()]);
  }
});

client.login(token);
