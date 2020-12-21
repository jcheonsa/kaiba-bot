
module.exports = {

    // calculate user damage
    calcUserDMG: (message, combatEmbed, adReaction, userData, userHP, userMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK, turn, minDMG, maxDMG,) => {

        const enemy = require('./mob-handler')
        const combat = require('./combat-handler')

        let { class: className } = userData
        let { mobName, mp: mobMP, description: mobDESC, img: mobIMG } = mobData

        let newUserMP = userMP

        var scaledMaxDMG = Math.floor(maxDMG) + Math.floor(userSTR * 0.7) + Math.floor(userDEX * 0.5)
        var scaledMinDMG = Math.floor(minDMG) + Math.floor(userSTR * 0.5) + Math.floor(userDEX * 0.7)
        // calculate potential damage
        var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 15);

        // calculate mob damage
        let mobDMG = enemy.calcMobDMG(userData, userHP, newUserMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK,)

        // calculate user & mob accuracy
        let userACC = module.exports.calcUserACC(userData, userHP, newUserMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK,)
        let mobACC = enemy.calcMobACC(userData, userHP, newUserMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK,)

        combatEmbed.setDescription(`You deal **${userDMG}** damage with your weapon. **${mobName}** does **${mobDMG}** damage!`)

        // if user misses, deal 0 damage
        if (userACC === 0) {
            userDMG * 0.3
        }
        if (mobACC === 0) {
            mobDMG * 0.3
        }

        return setTimeout(function () {
            combat.combatProc(message, combatEmbed, adReaction, userData, userHP, newUserMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK, userDMG, mobDMG, turn, minDMG, maxDMG)
        }, 1000);

    },

    calcUserMagDMG: (message, combatEmbed, adReaction, userData, userHP, userMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK, turn, minDMG, maxDMG) => {

        const enemy = require('./mob-handler')
        const combat = require('./combat-handler')

        let { class: className } = userData
        let { mobName, mp: mobMP, description: mobDESC, img: mobIMG } = mobData

        var scaledMaxDMG = Math.floor(100) + Math.floor(userINT * 1.2)
        var scaledMinDMG = Math.floor(30) + Math.floor(userLUK * 0.8)

        // calculate potential damage
        var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 10);

        let mobDMG = enemy.calcMobDMG(userData, userHP, userMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK,)
        let mobACC = enemy.calcMobACC(userData, userHP, userMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK,)

        // cantrip mana 
        let mpToSub = Math.floor(Math.random() * (8 - 3))
        let newUserMP = Math.floor(userMP - mpToSub)

        if (mobACC === 0) {
            mobDMG * 0.3
        }

        combatEmbed.setDescription(`You casted a basic magic attack for **${userDMG}** damage. You take **${mobDMG}** damage.`)

        return setTimeout(function () {
            combat.combatProc(message, combatEmbed, adReaction, userData, userHP, newUserMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK, userDMG, mobDMG, turn, minDMG, maxDMG)
        }, 1000);
    },

    // calculate user accuracy
    calcUserACC: (userData, userHP, newUserMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK,) => {

        let { class: className } = userData
        let { mobName, mp: mobMP, description: mobDESC, img: mobIMG } = mobData

        // get user accuracy, scales with DEX and LUK
        let userACC = Math.floor(100 + (userDEX * 1.2) + userLUK)
        // get mob avoidability, scales with 20% of DEX and 80% of LUK
        let mobAVD = Math.floor(mobDEX * 0.2) + Math.floor(mobLUK * 0.8)
        // calc hit chance by subtracting mobAVD from userACC and getting a percantage
        var hitChance = Math.floor(((userACC - mobAVD) / userACC) * 100)
        // generate random number for hit
        var hitProc = Math.floor(Math.random() * (100 - 1) + 1)

        // if hit chance value is greater than random number, you hit
        if (hitChance > hitProc) {
            return result = 1
        } else {
            return result = 0
        }

    },

    checkUser: (combatEmbed, userData) => {

        let { class: className, spell1, spell2, spell3 } = userData

        switch (className) {

            case "Mage":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **20 MP**: ${spell1} \n 2) **30 MP**: ${spell2} \n 3) **15 MP**: ${spell3} \n 4) **100 MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return
            case "Ranger":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **5 - 10 MP**: ${spell1} \n 2) **8 MP**: ${spell2} \n 3) **5 MP**: ${spell3} \n 4) **20 MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return
            case "Warrior":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **5 - 10 MP**: ${spell1} \n 2) **5 MP**: ${spell2} \n 3) **5 MP**: ${spell3} \n 4) **15 MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return
            case "Guardian":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **20 MP**: ${spell1} \n 2) **10 MP**: ${spell2} \n 3) **10 MP**: ${spell3} \n 4) **30 MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return
            case "Thief":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **7 - 10 MP**: ${spell1} \n 2) **12 MP**: ${spell2} \n 3) **7 MP**: ${spell3} \n 4) **18 MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return
            case "Weapon Master":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **12 MP**: ${spell1} \n 2) **12 MP**: ${spell2} \n 3) **8 MP**: ${spell3} \n 4) **8 MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return
            case "Egyptian God Crusader":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **20 MP**: ${spell1} \n 2) **8 MP**: ${spell2} \n 3) **12 MP**: ${spell3} \n 4) **50 MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return
            case "Martial Artist":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **20 MP**: ${spell1} \n 2) **5 MP**: ${spell2} \n 3) **8 MP**: ${spell3} \n 4) **12 MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return
            case "Adept ":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **50 MP**: ${spell1} \n 2) **35 MP**: ${spell2} \n 3) **40 MP**: ${spell3} \n 4) **120 MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return
            case "Gunslinger":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **20 MP**: ${spell1} \n 2) **10 MP**: ${spell2} \n 3) **10 MP**: ${spell3} \n 4) **10 MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return
            case "Dark Mage":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **80 MP**: ${spell1} \n 2) **50 MP**: ${spell2} \n 3) **60 MP**: ${spell3} \n 4) **66 MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return
            case "Ritual Summoner":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **  MP**: ${spell1} \n 2) **  MP**: ${spell2} \n 3) **  MP**: ${spell3} \n 4) **  MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return
            case "Archer":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **  MP**: ${spell1} \n 2) **  MP**: ${spell2} \n 3) **  MP**: ${spell3} \n 4) **  MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return
            case "Trapper":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **  MP**: ${spell1} \n 2) **  MP**: ${spell2} \n 3) **  MP**: ${spell3} \n 4) **  MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return
            case "Ninja":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **  MP**: ${spell1} \n 2) **  MP**: ${spell2} \n 3) **  MP**: ${spell3} \n 4) **  MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return
            case "Desert Peddler":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **  MP**: ${spell1} \n 2) **  MP**: ${spell2} \n 3) **  MP**: ${spell3} \n 4) **  MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return
            case "Raider":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **  MP**: ${spell1} \n 2) **  MP**: ${spell2} \n 3) **  MP**: ${spell3} \n 4) **  MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return
            case "Mercenary":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **12 MP**: ${spell1} \n 2) **10 MP**: ${spell2} \n 3) **15 MP**: ${spell3} \n 4) **20 MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return

            case "Assassin":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **  MP**: ${spell1} \n 2) **  MP**: ${spell2} \n 3) **  MP**: ${spell3} \n 4) **  MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return
            case "Egyptian God Acolyte":
                combatEmbed.addFields(
                    { name: "Class", value: `${className}`, inline: true },
                    { name: "Skill", value: `1) **20 MP**: ${spell1} \n 2) **10 MP**: ${spell2} \n 3) **8 MP**: ${spell3} \n 4) **100 MP**: **ULTIMATE ABILITY**`, inline: true },
                    { name: "Attack", value: `Scales with STR/DEX.`, inline: true },
                )
                return

        }

    }

}


