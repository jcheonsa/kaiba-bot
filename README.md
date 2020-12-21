# Seto Kaiba Bot

A Discord bot that includes many server moderation tools including but not limited to: role management, voice/text channel management, announcements, and reminders. Utilizes canvasJS and MongoDB to allow users to create, save, and share their own duelist cards.

Streamlines server management/moderation for server owners and moderators by automating almost all of the processes that would normally require them to click through a bunch of windows.

## Table of Contents

* [Features](#features)
* [Requirements](#requirements)
* [Getting started](#getting-started)
* [Author](#author)
* [To Do](#to-do)

## Features

(WIP) Seto Kaiba also features a text-based aventure RPG called ``Duelist Kingdom``. Although still a WIP, most spells and mobs are inspired by Yu-Gi-Oh! Utilizing traditional RPG concepts for the gameplay, Duelist Kingdom will contain dozens of classes, spells, mobs to kill, quests to complete, hundreds of lines of flavor text and lore to provide a great user epxerience sure to spice up any Discord server.

Select a faction and rep your team with unique evolving badges! Users are rewarded XP and points for voice/text activity in your server. They can then level up and allocate stat points to build their own unique character to go dungeon-crawling with. Use your points to support your faction and teammates, and purchase equipment to fight bigger and stronger monsters.

- team sorting
- polling
- channel moderation
- role management
- factions/xp & level/ economy system
- customizable user profile cards
- RPG/Turn-based combat
- Yu-Gi-Oh! jokes  

## Requirements

- [Node](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)

- [MongoDB](https://www.mongodb.com/)
- [Mongoose-ODM](https://www.npmjs.com/package/mongoose)

- [Canvasjs](https://www.npmjs.com/package/canvasjs)
- [Momentjs](https://www.npmjs.com/package/moment)
- [Cron](https://www.npmjs.com/package/cron)

## Getting started

```bash
# Clone the respository
git clone https://github.com/jcheonsa/kaiba-bot

# Enter into the directory
cd kaiba-bot/

# Install the dependencies
See the requirements above!
npm install *
```
1) open 'config.json' in Seto Kaiba's root directory
2) configure your desired command prefix, and Kaiba/guild/channel IDs in the corresponding areas
3) check the mongoDB site on setting up a [mongodb cloud](https://www.mongodb.com/cloud)
4) you have the choice of keeping user data on a local mongoDB server or monbgodb cloud atlas but the bot utilizes mongoose as the primary management tool for these objects.

## To Do
- [ ] adding instructional gifs
- [x] link requirements
- [ ] installation instructions
- [x] basic economy/faction system
- [x] fix economy/xp leaderboard
- [x] XP/Level system
- [ ] balance Duelist Kingdom RPG
- [ ] player stat allocation
- [ ] xp/gold rewards for successful combat encounter
- [ ] modular dependencies

## Author

Johnnie Tan