// handles all spells and skills that uses all stats
module.exports = {

    checkSpell: (message, combatEmbed, adReaction, userData, userHP, userMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK, turn, minDMG, maxDMG, spellName) => {

        try {

            const enemy = require('../combat-system/mob-handler')

            const member = message.member
            var { class: className, spell1, spell2, spell3 } = userData
            var { mobName, img: mobIMG, description: mobDESC, } = mobData

            var mobDMG = enemy.calcMobDMG(userData, userHP, userMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK,)
            var mobACC = enemy.calcMobACC(userData, userHP, userMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK,)

            if (mobACC === 0) {
                mobDMG * 0.3
            }

            if (userMP <= 0) {
                var userDMG = 0
                return
            }

            switch (spellName) {

                case "Dark Magic Attack":

                    var spellCost = 80

                    if (userMP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. MP needed: **80**. **${mobName}** deals **${mobDMG}** damage.`)
                    }

                    // calculate new mp
                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = [newUserMP]

                    // damage
                    var scaledMaxDMG = Math.floor(200) + Math.floor(userINT * 1.3)
                    var scaledMinDMG = Math.floor(70) + Math.floor(userINT * 0.5)

                    var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 10);

                    return combatEmbed.setDescription(`You fire a dark wave of energy at **${mobName}** for **${userDMG}** damage. You receive **${mobDMG}** damage.`)

                case "Dark Magic Inheritance":

                    break;

                case "Crush Card Virus":
                    break;

                case "Magic Bolt":

                    var spellCost = 20

                    if (userMP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. MP needed: **${spellCost}**. **${mobName}** deals **${mobDMG}** damage.`)
                    }

                    // calculate new mp
                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = [newUserMP]

                    // damage
                    var scaledMaxDMG = Math.floor(100) + Math.floor(userINT * 1.3)
                    var scaledMinDMG = Math.floor(50) + Math.floor(userINT * 0.5)

                    var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 10);

                    return combatEmbed.setDescription(`You fired a bolt of arcane energy at **${mobName}** for **${userDMG}** and take **${mobDMG}** in return.`)

                case "Magic Claw":
                    break;

                case "Magic Guard":
                    break;

                case "Power Shot":

                    var spellCost = Math.floor(Math.random() * (10 - 5) + 5)

                    if (userMP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. MP needed: **${spellCost}**. **${mobName}** deals **${mobDMG}** damage.`)
                    }

                    // calculate new mp
                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = [newUserMP]

                    var scaledMaxDMG = Math.floor(100) + Math.floor(userDEX * 1.2) + Math.floor(userSTR * 0.8)
                    var scaledMinDMG = Math.floor(50) + Math.floor(userDEX * 0.5)

                    var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 10);

                    return combatEmbed.setDescription(`Taking aim on **${mobName}'s** weakpoint, deal **${userDMG}** damage! You take **${mobDMG}** damage in return.`)

                case "Sharp Eyes":
                    break;

                case "Hunter's Instinct":
                    break;

                case "Steal":

                    var spellCost = Math.floor(Math.random() * (10 - 7) + 7)

                    if (userMP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. MP needed: **${spellCost}**. **${mobName}** deals **${mobDMG}** damage.`)
                    }

                    // calculate new mp
                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = [newUserMP]

                    var scaledMaxDMG = Math.floor(100) + Math.floor(userLUK * 2) + Math.floor(userDEX * 0.5)
                    var scaledMinDMG = Math.floor(50) + Math.floor(userDEX)

                    var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 10);

                    return combatEmbed.setDescription(`You stealthily steal some HP from **${mobName}**, dealing **${userDMG}** damage, but taking **${mobDMG}** damage.`)

                case "Savage Blow":
                    break;

                case "Lucky Seven":
                    break;

                case "Power Strike":

                    var spellCost = Math.floor(Math.random() * (10 - 5) + 5)

                    if (userMP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. MP needed: **${spellCost}**. **${mobName}** deals **${mobDMG}** damage.`)
                    }

                    // calculate new mp
                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = [newUserMP]

                    var scaledMaxDMG = Math.floor(100) + Math.floor(userSTR * 1.2) + Math.floor(userDEX * 0.8)
                    var scaledMinDMG = Math.floor(50) + Math.floor(userDEX * 0.5)

                    var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 10);

                    return combatEmbed(`You put your weight into this strike dealing **${userDMG}** damage! **${mobName}** deals **${mobDMG}** damage.`)

                case "Intimidate":

                    var spellCost = 11

                    if (userMP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. MP needed: **${spellCost}**. **${mobName}** deals **${mobDMG}** damage.`)
                    }

                    // calculate new mp
                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = [newUserMP]

                    var userDMG = 80
                    var newMobSTR = Math.floor(mobSTR * 0.75)
                    var mobSTR = [newMobSTR]

                    return combatEmbed.setDescription(`You puff your chest and intimidate **${mobName}**, cutting it's STR by 25%. Take **${mobDMG}** damage and deal **${userDMG}** damage.`)

                case "God's Blessing":

                    var spellCost = 19

                    if (userMP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. MP needed: **${spellCost}**. **${mobName}** deals **${mobDMG}** damage.`)
                    }

                    // calculate new mp
                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = [newUserMP]

                    var userDMG = Math.floor(Math.random() * (50 - 20) + 20)
                    var HPtoAdd = Math.floor(Math.random() * (120 - 50) + 50) + Math.floor(userINT * 0.8)
                    var newUserHP = Math.floor(userHP + HPtoAdd)

                    var userHP = [newUserHP]
                    return combatEmbed.setDescription(`Your god grants you **+ ${HPtoAdd} HP** and smites your enemy for **${userDMG}** damage. **${mobName}** deals **${mobDMG}** damage.`)

                case "The Power of Prayer":


                    break;

                case "Offensive Stance":

                    var spellCost = 11

                    if (userMP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. MP needed: **${spellCost}**. **${mobName}** deals **${mobDMG}** damage.`)
                    }

                    // calculate new mp
                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = [newUserMP]

                    // get new STR
                    var newUserSTR = Math.floor(userSTR * 2.5)
                    var newUserDEX = Math.floor(userDEX * 0.5)

                    var userSTR = [newUserSTR]
                    var userDEX = [newUserDEX]

                    var scaledMaxDMG = Math.floor(maxDMG) + Math.floor(userSTR * 0.7) + Math.floor(userDEX * 0.5)
                    var scaledMinDMG = Math.floor(minDMG) + Math.floor(userSTR * 0.5) + Math.floor(userDEX * 0.7)
                    // calculate potential damage
                    var newUserDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 5);

                    var userDMG = [newUserDMG]

                    combatEmbed.setDescription(`You switch stances, STR up by 250% but halved your DEX! You take **${mobDMG}** damage, but deal **${newUserDMG}**!`)


                    return

                case "Patient Bait":

            }

        } finally {
            const combat = require('../combat-system/combat-handler')

            setTimeout(function () {
                combat.combatProc(message, combatEmbed, adReaction, userData, userHP, userMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK, userDMG, mobDMG, turn, minDMG, maxDMG)
            }, 1000);


        }

    },


}
