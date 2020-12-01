const Discord = require('discord.js')

module.exports = {
    async poll(message, userCreatedPolls) {

        message.channel.send("Enter options. Max 5. Type done when finished.");
        let filter = (m) => {
            if (m.author.id === message.author.id) {
                if (m.content.toLowerCase() === "done") collector.stop();
                else return true;
            } else return false;
        };
        let collector = message.channel.createMessageCollector(filter, {
            maxMatches: 5,
        });
        let pollOptions = await this.getPollOptions(collector);
        let embed = new Discord.MessageEmbed();
        embed.setTitle(`**P O L L**`);
        embed.setDescription(pollOptions.join("\n"));
        embed.setColor("#A652BB");
        let confirm = await message.channel.send(embed);

        await confirm.react("✅");
        await confirm.react("❎");

        let reactionFilter = (reaction, user) =>
            user.id === message.author.id && !user.bot;
        let reaction = (
            await confirm.awaitReactions(reactionFilter, {
                max: 1,
            })
        ).first();
        let user = message.member;
        if (reaction.emoji.name === "✅") {
            message.channel.send("Poll will begin in 2 seconds.");
            await this.delay(2000);
            message.channel.send("Cast your vote now!");
            let userVotes = new Map();
            let pollTally = new Discord.Collection(pollOptions.map((o) => [o, 0]));
            let pollFilter = (m) => !m.bot;
            let voteCollector = message.channel.createMessageCollector(pollFilter, {
                time: 60000
            });
            userCreatedPolls.set(message.author.id, voteCollector);
            await this.processPollResults(
                voteCollector,
                pollOptions,
                userVotes,
                pollTally
            );
            let max = Math.max(...pollTally.array());
            console.log(pollTally.entries());
            let entries = [...pollTally.entries()];
            let winners = [];
            let embed = new Discord.MessageEmbed();
            let desc = "";
            let title = "Results";
            entries.forEach((entry) =>
                entry[1] === max ? winners.push(entry[0]) : null
            );
            entries.forEach(
                (entry) => (desc += entry[0] + " received " + entry[1] + " votes(s)\n")
            );
            embed.setDescription(desc);
            embed.setTitle(title);
            embed.setColor("#A652BB");

            console.log(user.displayName);

            if (winners.length === 1) {
                message.channel.send(winners[0] + " is the winner!", embed);
            } else {
                message.channel.send("We have a draw!", embed);
            }
        } else if (reaction.emoji.name === "❎") {
            message.channel.send("Poll cancelled.");
        }
    },

    async stopVote(message, userCreatedPolls) {
        if (userCreatedPolls.has(message.author.id)) {
            console.log("Trying to stop poll.");
            userCreatedPolls.get(message.author.id).stop();
            userCreatedPolls.delete(message.author.id);
        } else {
            message.channel.send("You don't have a poll going on right now.");
        }
    },

    async processPollResults(voteCollector, pollOptions, userVotes, pollTally) {
        return new Promise((resolve, reject) => {
            voteCollector.on("collect", (msg) => {
                let option = msg.content.toLowerCase();
                if (!userVotes.has(msg.author.id) && pollOptions.includes(option)) {
                    userVotes.set(msg.author.id, msg.content);
                    let voteCount = pollTally.get(option);
                    pollTally.set(option, ++voteCount);
                }
            });
            voteCollector.on("end", (collected) => {
                console.log("Collected " + collected.size + " votes.");
                resolve(collected);
            });
        });
    },

    async getPollOptions(collector) {
        return new Promise((resolve, reject) => {
            collector.on("end", (collected) =>
                resolve(collected.map((m) => m.content.toLowerCase()))
            );
        });
    },

    async delay(time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }
}