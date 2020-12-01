const Discord = require('discord.js')

module.exports = {
    async sort(message) {
        let reacted = 0;
        const reactionEmoji = message.guild.emojis.cache.find(
            (emoji) => emoji.name === "Futaba"
        );
        const reactionFilter = (reaction, user) =>
            reaction.emoji.name === "Futaba" && !user.bot;
        const lolEmbed = new Discord.MessageEmbed({
            title: "Team Randomizer",
            description: "React to the message to be sorted into a team",
            fields: [
                {
                    name: "Players",
                    value: "none",
                },
            ],
        });

        try {
            message.channel
                .send(lolEmbed)
                .then((message) => message.react(reactionEmoji))
                .then((mReaction) => {
                    const collector = mReaction.message.createReactionCollector(
                        reactionFilter,
                        {
                            max: 10,
                            time: 45000,
                            dispose: true,
                        }
                    );

                    collector.on("collect", (reaction) => {
                        reacted++;
                        let embedLikeField = Object.assign({}, lolEmbed.fields[0]);
                        embedLikeField.value = mReaction.users.cache
                            .filter((user) => user.id != client.user.id)
                            .map((user) => `${user.tag}`)
                            .join("\n");
                        const newlolEmbed = new Discord.MessageEmbed({
                            title: lolEmbed.title,
                            description: lolEmbed.description,
                            fields: [embedLikeField],
                        });
                        reaction.message.edit(newlolEmbed);

                    });

                    collector.on("remove", (reaction) => {
                        reacted--;
                        let embedLikeField = Object.assign({}, lolEmbed.fields[0]);
                        if (reacted == 0) {
                            embedLikeField.value = "none";
                            reacted = 0;

                            const newlolEmbed = new Discord.MessageEmbed({
                                title: lolEmbed.title,
                                description: lolEmbed.description,
                                fields: [embedLikeField],
                            });
                            reaction.message.edit(newlolEmbed);
                        } else {
                            embedLikeField.value = mReaction.users.cache
                                .filter((user) => user.id != client.user.id)
                                .map((user) => `${user.tag}`)
                                .join("\n");
                            const newlolEmbed = new Discord.MessageEmbed({
                                title: lolEmbed.title,
                                description: lolEmbed.description,
                                fields: [embedLikeField],
                            });
                            reaction.message.edit(newlolEmbed);
                        }
                    });

                    collector.on("end", (reaction) => {
                        reacted = 1;
                        var array = mReaction.users.cache
                            .filter((user) => user.id != client.user.id)
                            .map((user) => `${user.tag}`);
                        array = this.shuffle(array);
                        var half_length = Math.ceil(array.length / 2);
                        var leftSide = array.splice(0, half_length);
                        const finEmbed = new Discord.MessageEmbed({
                            title: lolEmbed.title,
                            description: "Final Teams",
                            fields: [
                                {
                                    name: "Team 1",
                                    value: array.join("\n"),
                                    inline: "true",
                                },
                                {
                                    name: "Team 2",
                                    value: leftSide.join("\n"),
                                    inline: "true",
                                },
                            ],
                        });
                        message.channel.send(finEmbed);
                    });
                });
        } catch {
            message.channel.send("Timed out");
        }
    },

    shuffle: (array) => {
        var cI = array.length,
            tV,
            rI;
        while (0 != cI) {
            rI = Math.floor(Math.random() * cI);
            cI -= 1;

            tV = array[cI];
            array[cI] = array[rI];
            array[rI] = tV;
        }
        return array;
    }

}