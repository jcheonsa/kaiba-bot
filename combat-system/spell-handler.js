const spellSchema = require('../schemas/spellSchema')
const classSchema = require('../schemas/classSchema')

const enemy = require('../combat-system/mob-handler')
const player = require('../combat-system/player-handler')
const checkStatus = require('../combat-system/status-handler')

module.exports = {

    checkSpell: (message, combatEmbed, adReaction, user, mob, turn, spellName,) => {

        var { userStatus: status, userStatusTimer: statusTimer, spell1, spell2, spell3, minDMG, maxDMG } = user
        var { mobStatus: status, mobstatusTimer: statusTimer } = mob

        try {

            const enemy = require('../combat-system/mob-handler')

            const member = message.member

            var userClass = user.class
            var userHP = user.HP
            var userMP = user.MP
            var userSTR = user.STR
            var userDEX = user.DEX
            var userINT = user.INT
            var userLUK = user.LUK

            var mobHP = mob.HP
            var mobMP = mob.MP
            var mobSTR = mob.STR
            var mobDEX = mob.DEX
            var mobINT = mob.INT
            var mobLUK = mob.LUK

            var mobDMG = enemy.calcMobDMG(user, mob)
            var mobACC = enemy.calcMobACC(user, mob)

            if (mobACC === 0) {
                mobDMG * 0.3
            }

            switch (spellName) {

                case "Dark Magic Attack":

                    var spellCost = 80

                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. (Spell failed) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    // calculate new mp
                    var newUserMP = Math.floor(user.MP - spellCost)
                    var userMP = newUserMP

                    // damage
                    var scaledMaxDMG = Math.floor(200) + Math.floor(user.INT * 1.3)
                    var scaledMinDMG = Math.floor(70) + Math.floor(user.INT * 0.5)

                    var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 10);

                    return combatEmbed.setDescription(`You fire a dark wave of energy at **${mob.Name}** for **${userDMG}** damage. You receive **${mobDMG}** damage.`)

                case "Dark Magic Inheritance":
                    var spellCost = 60
                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your body can't take anymore of the dark power. (Spell failed) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    var userDMG = 0

                    var HPtoAdd = Math.floor(Math.random() * (80 - 50) + 50) + Math.floor(user.INT * 0.5)
                    var newUserHP = Math.floor(userHP + userHP)
                    var userHP = newUserHP

                    var MPtoAdd = Math.floor(Math.random() * (20 - 5) + 5) + Math.floor(user.INT * 0.5)
                    var newUserMP = Math.floor(user.MP - spellCost)
                    var finalUserMP = Math.floor(newUserMP + MPtoAdd)
                    var userMP = finalUserMP

                    return combatEmbed.setDescription(`A dark energy restores your mind and spirit. **+ ${MPtoAdd} MP & + ${HPtoAdd} HP**. **${mob.Name}** deals **${mobDMG}** damage.`)

                case "Crush Card Virus":
                    var spellCost = 50
                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`The black tendrils whiplash and fires back at yourself! (MP needed: **${spellCost}**) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    var mobstatus = "paralyze"
                    var mobstatusTimer = 0

                    // calculate new mp
                    var newUserMP = Math.floor(user.MP - spellCost)
                    var userMP = newUserMP

                    // damage
                    var scaledMaxDMG = Math.floor(50) + Math.floor(user.INT)
                    var scaledMinDMG = Math.floor(15) + Math.floor(user.INT * 0.75)
                    var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG);

                    var newmobSTR = Math.floor(mob.STR * 0.9)
                    var mobSTR = newmobSTR
                    var newmobINT = Math.floor(mob.INT * 0.9)
                    var mobINT = newmobINT
                    var mobDMG = 0


                    return combatEmbed.setDescription(`Black tendrils emanate from your focus and constricts **${mob.Name}**, paralyzing them and dealing **${userDMG}** damage. Lower **${mob.Name}**'s STR by **10%** and INT by **25%**!`)

                case "Magic Bolt":

                    var spellCost = 20

                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. MP needed: **${spellCost}**. **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    // calculate new mp
                    var newUserMP = Math.floor(user.MP - spellCost)
                    var userMP = newUserMP

                    // damage
                    var scaledMaxDMG = Math.floor(100) + Math.floor(user.INT * 1.3)
                    var scaledMinDMG = Math.floor(50) + Math.floor(user.INT * 0.5)

                    var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 5);

                    return combatEmbed.setDescription(`You fired a bolt of arcane energy at **${mob.Name}** for **${userDMG}** and take **${mobDMG}** in return.`)

                case "Magic Claw":
                    var spellCost = 30
                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`You try to focus your mind, but are distracted.. (Spell failed) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    // calculate new mp
                    var newUserMP = Math.floor(user.MP - spellCost)
                    var userMP = newUserMP

                    var scaledMaxDMG1 = Math.floor(80) + Math.floor(user.INT)
                    var scaledMinDMG1 = Math.floor(50) + Math.floor(user.INT * 0.5)
                    var scaledMaxDMG2 = Math.floor(80) + Math.floor(user.INT)
                    var scaledMinDMG2 = Math.floor(50) + Math.floor(user.INT * 0.5)

                    var userDMG1 = Math.floor(Math.random() * (scaledMaxDMG1 - scaledMinDMG1) + scaledMinDMG1) - Math.floor(Math.random() * 2);
                    var userDMG2 = Math.floor(Math.random() * (scaledMaxDMG2 - scaledMinDMG2) + scaledMinDMG2) - Math.floor(Math.random() * 2);

                    var userDMG = Math.floor(userDMG1 + userDMG2)

                    return combatEmbed.setDescription(`You slash **${mob.Name}** twice with arcane claws! First slash **${userDMG1}** damage, second slash **${userDMG2}** damage! You take **${mobDMG}** damage.`)

                case "Magic Guard":
                    var spellCost = 5
                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`You don't have enough mana to take the hit! (Spell failed) **${mob.Name}** deals ${mobDMG} damage.`)
                    }

                    var userDMG = 40

                    var MPmobDMG = Math.floor(mobDMG * 0.75)
                    var newUserMP = Math.floor(user.MP - MPmobDMG)
                    var userMP = newUserMP

                    var mobDMG = Math.floor(mobDMG * 0.25)

                    return combatEmbed.setDescription(`You set up magic guard, your MP takes **75%** of ${mob.Name}'s damage! **- ${MPmobDMG} MP** and **- ${mobDMG} HP.**`)

                case "Power Shot":

                    var spellCost = Math.floor(Math.random() * (10 - 5) + 5)

                    if (user.MP < 5) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Spell failed. (MP needed: **${spellCost}**) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    // calculate new mp
                    var newUserMP = Math.floor(user.MP - spellCost)
                    var userMP = newUserMP

                    var scaledMaxDMG1 = Math.floor(80) + Math.floor(user.DEX) + Math.floor(user.STR * 0.5)
                    var scaledMinDMG1 = Math.floor(30) + Math.floor(user.DEX * 0.5)
                    var scaledMaxDMG2 = Math.floor(80) + Math.floor(user.DEX) + Math.floor(user.STR * 0.5)
                    var scaledMinDMG2 = Math.floor(30) + Math.floor(user.DEX * 0.5)

                    var userDMG1 = Math.floor(Math.random() * (scaledMaxDMG1 - scaledMinDMG1) + scaledMinDMG1) - Math.floor(Math.random() * 5);
                    var userDMG2 = Math.floor(Math.random() * (scaledMaxDMG2 - scaledMinDMG2) + scaledMinDMG2) - Math.floor(Math.random() * 5);

                    var userDMG = Math.floor(userDMG1 + userDMG2)

                    var userACC = player.calcUserACC(user, mob)
                    if (userACC === 0) {
                        userDMG * 0.3
                    }

                    return combatEmbed.setDescription(`Taking aim on **${mob.Name}'s** weakpoint, you take two shots, **${userDMG1} + ${userDMG2}** damage! You take **${mobDMG}** damage in return.`)

                case "Sharp Eyes":
                    var spellCost = 8

                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`You try to focus your mind, but are distracted.. (MP needed: **${spellCost}**) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    var newUserMP = Math.floor(user.MP - spellCost)
                    var userMP = newUserMP

                    var statsToAdd = 90
                    var newuserDEX = Math.floor(user.DEX + statsToAdd)
                    var userDEX = newuserDEX

                    var userDMG = 0

                    return combatEmbed.setDescription(`You focus your mind and set your sights on the target. **+ ${statsToAdd} DEX**! **${mob.Name}** does **${mobDMG}** damage.`)

                case "Hunter's Instinct":
                    var spellCost = 8
                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Skill failed. (MP needed: **${spellCost}**) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    var newUserMP = Math.floor(user.MP - spellCost)
                    var userMP = newUserMP

                    var newmobDEX = Math.floor(mob.DEX * 0.75)
                    var newmobLUK = Math.floor(mob.LUK * 0.75)
                    var mobDEX = newmobDEX
                    var mobLUK = newmobLUK

                    var scaledMaxDMG = Math.floor(maxDMG) + Math.floor(user.STR * 0.7) + Math.floor(user.DEX * 0.8)
                    var scaledMinDMG = Math.floor(minDMG) + Math.floor(user.STR * 0.5) + Math.floor(user.DEX * 0.7)
                    var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 15);

                    var userACC = player.calcUserACC(user, mob)
                    if (userACC === 0) {
                        userDMG * 0.3
                    }

                    return combatEmbed.setDescription(`You've seen **${mob.Name}** before.. It's DEX/LUK lowered by **25%**. Because it's easier to hit and dodge, you deal **${userDMG}** damage and take **${mobDMG}** damage!`)

                case "Steal":

                    var spellCost = Math.floor(Math.random() * (10 - 7) + 7)

                    if (user.MP < 7) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. MP needed: **${spellCost}**. **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    // calculate new mp
                    var newUserMP = Math.floor(user.MP - spellCost)
                    var userMP = newUserMP

                    var gpToAdd = Math.floor(Math.random() * (100 - 40) + 40)

                    var scaledMaxDMG = Math.floor(100) + Math.floor(user.LUK) + Math.floor(user.DEX * 0.5)
                    var scaledMinDMG = Math.floor(50) + Math.floor(user.DEX)

                    var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 10);

                    var userACC = player.calcUserACC(user, mob)
                    if (userACC === 0) {
                        userDMG * 0.3
                    }

                    return combatEmbed.setDescription(`You stealthily steal **${gpToAdd} GP** from **${mob.Name}**, dealing **${userDMG}** damage, but taking **${mobDMG}** damage.`)

                case "Savage Blow":

                    var spellCost = Math.floor(Math.random() * (15 - 8) + 8)

                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`You attempt to savagely attack **${mob.Name}** but your weapon fumbles in your hands. (MP needed: **${spellCost}**) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    var newUserMP = Math.floor(user.MP - spellCost)
                    var userMP = newUserMP

                    var scaledMaxDMG1 = Math.floor(20) + Math.floor(user.LUK * 0.3)
                    var scaledMinDMG1 = Math.floor(5) + Math.floor(user.LUK * 0.3)
                    var scaledMaxDMG2 = Math.floor(20) + Math.floor(user.LUK * 0.3)
                    var scaledMinDMG2 = Math.floor(5) + Math.floor(user.LUK * 0.3)
                    var scaledMaxDMG3 = Math.floor(20) + Math.floor(user.LUK * 0.3)
                    var scaledMinDMG3 = Math.floor(5) + Math.floor(user.LUK * 0.3)
                    var scaledMaxDMG4 = Math.floor(20) + Math.floor(user.LUK * 0.3)
                    var scaledMinDMG4 = Math.floor(5) + Math.floor(user.LUK * 0.3)
                    var scaledMaxDMG5 = Math.floor(20) + Math.floor(user.LUK * 0.3)
                    var scaledMinDMG5 = Math.floor(5) + Math.floor(user.LUK * 0.3)
                    var scaledMaxDMG6 = Math.floor(20) + Math.floor(user.LUK * 0.3)
                    var scaledMinDMG6 = Math.floor(5) + Math.floor(user.LUK * 0.3)

                    var userDMG1 = Math.floor(Math.random() * (scaledMaxDMG1 - scaledMinDMG1) + scaledMinDMG1) - Math.floor(Math.random() * 10);
                    var userDMG2 = Math.floor(Math.random() * (scaledMaxDMG2 - scaledMinDMG2) + scaledMinDMG2) - Math.floor(Math.random() * 8);
                    var userDMG3 = Math.floor(Math.random() * (scaledMaxDMG3 - scaledMinDMG3) + scaledMinDMG3) - Math.floor(Math.random() * 8);
                    var userDMG4 = Math.floor(Math.random() * (scaledMaxDMG4 - scaledMinDMG4) + scaledMinDMG4) - Math.floor(Math.random() * 6);
                    var userDMG5 = Math.floor(Math.random() * (scaledMaxDMG5 - scaledMinDMG5) + scaledMinDMG5) - Math.floor(Math.random() * 4);
                    var userDMG6 = Math.floor(Math.random() * (scaledMaxDMG6 - scaledMinDMG6) + scaledMinDMG6) - Math.floor(Math.random() * 2);

                    var userDMG = Math.floor(userDMG1 + userDMG2 + userDMG3 + userDMG4 + userDMG5 + userDMG6)

                    return combatEmbed.setDescription(`Using savage blow, you strike **${mob.Name}** 6 times! **${userDMG1} + ${userDMG2} + ${userDMG3} + ${userDMG4} + ${userDMG5} + ${userDMG6} = ${userDMG}** total damage! You take ${mobDMG} damage.`)

                case "Lucky Seven":
                    var spellCost = 6
                    if (user.MP < 7) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`You aren't feeling very lucky this round. (MP needed: **7**) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    var newUserMP = Math.floor(user.MP - spellCost)
                    var userMP = newUserMP

                    var statsToAdd = 50
                    var newuserLUK = user.LUK + 50
                    var userLUK = newuserLUK

                    var scaledMaxDMG = Math.floor(maxDMG) + Math.floor(user.STR * 0.7) + Math.floor(user.DEX * 0.5)
                    var scaledMinDMG = Math.floor(minDMG) + Math.floor(user.STR * 0.5) + Math.floor(user.DEX * 0.7)
                    // calculate potential damage
                    var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 10);

                    return combatEmbed.setDescription(`You're feeling pretty lucky today. Deal **${userDMG}** and raise LUK by **${statsToAdd}**. But you still take **${mobDMG}** damage from **${mob.Name}**`)

                case "Power Strike":

                    var spellCost = Math.floor(Math.random() * (10 - 5) + 5)

                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. MP needed: **${spellCost}**. **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    // calculate new mp
                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = newUserMP

                    var scaledMaxDMG = Math.floor(100) + Math.floor(user.STR * 1.2) + Math.floor(user.DEX * 0.8)
                    var scaledMinDMG = Math.floor(50) + Math.floor(user.DEX * 0.5)

                    var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 10);

                    var userACC = player.calcUserACC(user, mob)
                    if (userACC === 0) {
                        userDMG * 0.3
                    }

                    return combatEmbed(`You put your weight into this strike, dealing **${userDMG}** damage! **${mob.Name}** deals **${mobDMG}** damage.`)

                case "Intimidate":

                    var spellCost = 11

                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. MP needed: **${spellCost}**. **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    // calculate new mp
                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = newUserMP

                    var userDMG = 80
                    var newmobSTR = Math.floor(mob.STR * 0.75)
                    var mobSTR = newmobSTR

                    return combatEmbed.setDescription(`You puff your chest and intimidate **${mob.Name}**, cutting it's STR by **25%**. Take **${mobDMG}** damage and deal **${userDMG}** damage.`)

                case "Lone Wolf":
                    var spellCost = 100
                    if (user.MP < spellCost || turn > 1) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Skill failed MP needed: **${spellCost}**. (You can only use Lone Wolf on Turn 1) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }
                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = newUserMP

                    var statsToAdd = 60
                    var newuserSTR = Math.floor(user.STR + statsToAdd)
                    var newuserDEX = Math.floor(user.DEX + statsToAdd)
                    var newuserLUK = Math.floor(user.LUK + statsToAdd)

                    var userSTR = newuserSTR
                    var userDEX = newuserDEX
                    var userLUK = newuserLUK

                    var scaledMaxDMG = Math.floor(maxDMG) + Math.floor(userSTR * 0.7) + Math.floor(userDEX)
                    var scaledMinDMG = Math.floor(minDMG) + Math.floor(userSTR * 0.5) + Math.floor(userDEX * 0.7)
                    var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG);

                    var userACC = player.calcUserACC(user, mob)
                    if (userACC === 0) {
                        userDMG * 0.3
                    }

                    return combatEmbed.setDescription(`Trusting in no magics and no ally but yourself. Raise all stats by **${statsToAdd}** and bring a devastating strike of **${userDMG}** damage onto **${mob.Name}**, who deals **${mobDMG}** damage back.`)

                case "God's Blessing":

                    var spellCost = 19

                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. MP needed: **${spellCost}**. **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    // calculate new mp
                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = newUserMP

                    var userDMG = Math.floor(Math.random() * (50 - 20) + 20) + Math.floor(user.INT * 0.8)
                    var HPtoAdd = Math.floor(Math.random() * (120 - 50) + 50) + Math.floor(user.INT * 0.8)
                    var newUserHP = Math.floor(userHP + HPtoAdd)

                    var userHP = newUserHP

                    return combatEmbed.setDescription(`Your god grants you **+ ${HPtoAdd} HP** and smites your enemy for **${userDMG}** damage. **${mob.Name}** deals **${mobDMG}** damage.`)

                case "The Power of Prayer":
                    var spellCost = 9
                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Spell failed. (MP needed: **${spellCost}**) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = newUserMP

                    var newMobDMG = Math.floor(mobDMG * 0.5)
                    var mobDMG = newMobDMG

                    var statsToAdd = mobDMG
                    var newuserINT = Math.floor(user.INT + mobDMG)
                    var userINT = newuserINT

                    var scaledMaxDMG = Math.floor(maxDMG) + Math.floor(user.STR * 0.7) + Math.floor(user.DEX * 0.5)
                    var scaledMinDMG = Math.floor(minDMG) + Math.floor(user.STR * 0.5) + Math.floor(user.DEX * 0.7)
                    // calculate potential damage
                    var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 6);

                    return combatEmbed.setDescription(`With the power of prayer, you reduce **${mob.Name}**'s damage by **50%** and convert it to **+ ${statsToAdd} INT**! You strike back for **${userDMG}** damage.`)

                case "Monster Reborn":
                    var spellCost = 35
                    if (userHP > 50 || userMP < 35) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`You beseech your Egyptian God, but you hear no answers.. Spell failed. **(Can only cast Monster Reborn at less than 25% HP nad 35 MP.)** 
                        **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = newUserMP

                    var statsToAdd = 50
                    var newuserSTR = Math.floor(user.STR + statsToAdd)
                    var newuserDEX = Math.floor(user.DEX + statsToAdd)
                    var newuserINT = Math.floor(user.INT + statsToAdd)
                    var newuserLUK = Math.floor(user.LUK + statsToAdd)
                    var userSTR = newuserSTR
                    var userDEX = newuserDEX
                    var userINT = newuserINT
                    var userLUK = newuserLUK

                    var HPtoAdd = 500
                    var newUserHP = Math.floor(userHP + HPtoAdd)
                    var userHP = newUserHP

                    var userDMG = 25

                    return combatEmbed.setDescription(`As **${mob.Name}** strikes you for **${mobDMG}**, you are saved from the brink of death and are enveloped by the light of Ra. **+ ${statsToAdd} ALL STATS** and **+ ${HPtoAdd} HP**. **${mob.Name}** is singed by the light for **${userDMG}** damage.`)

                case "Offensive Stance":

                    var spellCost = 12

                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`You attempt to switch stances but trip up.. MP needed: **${spellCost}**. **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    // calculate new mp
                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = newUserMP

                    // get new STR
                    var newuserSTR = Math.floor(user.STR * 1.5)
                    var newuserDEX = Math.floor(user.DEX * 0.5)

                    var userSTR = newuserSTR
                    var userDEX = newuserDEX

                    var scaledMaxDMG = Math.floor(maxDMG) + Math.floor(userSTR * 0.7) + Math.floor(userDEX * 0.5)
                    var scaledMinDMG = Math.floor(minDMG) + Math.floor(userSTR * 0.5) + Math.floor(userDEX * 0.7)
                    // calculate potential damage
                    var newUserDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 5);

                    var userDMG = newUserDMG

                    var userACC = player.calcUserACC(user, mob)
                    if (userACC === 0) {
                        userDMG * 0.3
                    }

                    return combatEmbed.setDescription(`You switch stances, STR up by **50%** but halving your DEX! You take **${mobDMG}** damage, but deal **${newUserDMG}**!`)

                case "Patient Bait":
                    var spellCost = 12
                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`You try to focus your mind, but are distracted.. (MP needed: **${spellCost}**) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    // calculate new mp
                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = newUserMP

                    // get new STR
                    var newuserSTR = Math.floor(user.STR * 0.5)
                    var newuserDEX = Math.floor(user.DEX * 1.5)

                    var userSTR = newuserSTR
                    var userDEX = newuserDEX

                    var scaledMaxDMG = Math.floor(maxDMG) + Math.floor(userSTR * 0.7) + Math.floor(userDEX * 0.5)
                    var scaledMinDMG = Math.floor(minDMG) + Math.floor(userSTR * 0.5) + Math.floor(userDEX * 0.7)
                    // calculate potential damage
                    var newUserDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 10);

                    var userDMG = newUserDMG

                    var userACC = player.calcUserACC(user, mob)
                    if (userACC === 0) {
                        userDMG * 0.3
                    }

                    return combatEmbed.setDescription(`You switch stances, DEX up by **50%** but halving your STR! You take **${mobDMG}** damage, but deal **${newUserDMG}**!`)

                case "Paced Attack":
                    var spellCost = 8
                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`You fumble as you try to use your many weapons to strike.. (Skill failed) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = newUserMP

                    var scaledMaxDMG1 = Math.floor(maxDMG) + Math.floor(user.STR * 0.35) + Math.floor(user.DEX * 0.35)
                    var scaledMinDMG1 = Math.floor(minDMG) + Math.floor(user.STR * 0.35) + Math.floor(user.DEX * 0.35)
                    var scaledMaxDMG2 = Math.floor(maxDMG) + Math.floor(user.STR * 0.35) + Math.floor(user.DEX * 0.35)
                    var scaledMinDMG2 = Math.floor(minDMG) + Math.floor(user.STR * 0.35) + Math.floor(user.DEX * 0.35)
                    var scaledMaxDMG3 = Math.floor(maxDMG) + Math.floor(user.STR * 0.35) + Math.floor(user.DEX * 0.35)
                    var scaledMinDMG3 = Math.floor(minDMG) + Math.floor(user.STR * 0.35) + Math.floor(user.DEX * 0.35)
                    var scaledMaxDMG4 = Math.floor(maxDMG) + Math.floor(user.STR * 0.35) + Math.floor(user.DEX * 0.35)
                    var scaledMinDMG4 = Math.floor(minDMG) + Math.floor(user.STR * 0.35) + Math.floor(user.DEX * 0.35)

                    var userDMG1 = Math.floor(Math.random() * (scaledMaxDMG1 - scaledMinDMG1) + scaledMinDMG1) - Math.floor(Math.random() * 10);
                    var userDMG2 = Math.floor(Math.random() * (scaledMaxDMG2 - scaledMinDMG2) + scaledMinDMG2) - Math.floor(Math.random() * 10);
                    var userDMG3 = Math.floor(Math.random() * (scaledMaxDMG3 - scaledMinDMG3) + scaledMinDMG3) - Math.floor(Math.random() * 10);
                    var userDMG4 = Math.floor(Math.random() * (scaledMaxDMG4 - scaledMinDMG4) + scaledMinDMG4) - Math.floor(Math.random() * 10);

                    var userDMG = Math.floor(userDMG1 + userDMG2 + userDMG3 + userDMG4)

                    return combatEmbed.setDescription(`You strike, slash and stab **${mob.Name}** 4 times with your different weapons! **${userDMG1} + ${userDMG2} +${userDMG3} +${userDMG4} = ${userDMG}** total. You take **${mobDMG}** damage.`)

                case "Swords of Revealing Light":

                    var spellCost = 20

                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`You try to summon the blades of light but nothing happens.. (MP needed: **${spellCost}**) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = newUserMP

                    var newmobSTR = Math.floor(mob.STR * 0.75)
                    var newmobDEX = Math.floor(mob.DEX - 50)
                    var mobSTR = newmobSTR
                    var mobDEX = newmobDEX

                    var newMobDMG = Math.floor(mobDMG * 0.5)
                    var mobDMG = newMobDMG

                    var userDMG = 0

                    return combatEmbed.setDescription(`Summoning the Swords of Revealing Light, you take half damage and blinded **${mob.Name}**! **- ${mobDMG}** HP. **${mob.Name}**'s STR is cut by **25%** and DEX lowered by **50**.`)

                case "Block Attack":

                    var spellCost = 10

                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`You attempt to raise your shield, but you falter.. (MP needed: **${spellCost}**) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = newUserMP

                    var mobDMG = 0

                    var scaledMaxDMG = Math.floor(maxDMG) + Math.floor(user.STR * 0.7) + Math.floor(user.DEX * 0.5)
                    var scaledMinDMG = Math.floor(minDMG) + Math.floor(user.STR * 0.5) + Math.floor(user.DEX * 0.7)
                    // calculate potential damage
                    var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 15);

                    var userACC = player.calcUserACC(user, mob)
                    if (userACC === 0) {
                        userDMG * 0.3
                    }

                    return combatEmbed.setDescription(`You perfectly block **${mob.Name}**'s attack with your shield and retaliate with **${userDMG}** damage!`)

                case "Sword & Shield":

                    var spellCost = 10

                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`You attempt to raise your shield, but you falter.. (MP needed: **${spellCost}**) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = newUserMP

                    var newMobDMG = Math.floor(mobDMG * 0.8)
                    var mobDMG = newMobDMG

                    var scaledMaxDMG = Math.floor(maxDMG) + Math.floor(user.STR * 0.7) + Math.floor(user.DEX * 0.5) + Math.floor(userHP * 0.5)
                    var scaledMinDMG = Math.floor(minDMG) + Math.floor(user.STR * 0.5) + Math.floor(user.DEX * 0.7) + Math.floor(userHP * 0.5)

                    var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 15);

                    var userACC = player.calcUserACC(user, mob)
                    if (userACC === 0) {
                        userDMG * 0.3
                    }

                    return combatEmbed.setDescription(`Switching your defense for offense, you deal **${userDMG}** with a shield bash. **${mob.Name}**'s attack was slightly interrupted. **- ${mobDMG}** HP.`)

                case "Raigeki":

                    var spellCost = 50

                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. (Spell failed) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    var mobstatus = "burn"
                    var mobstatusTimer = 0

                    // calculate new mp
                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = newUserMP

                    // damage
                    var scaledMaxDMG = Math.floor(300) + Math.floor(user.INT * 1.5)
                    var scaledMinDMG = Math.floor(100) + Math.floor(user.INT)

                    var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 10);

                    var HPtoSub = Math.floor(Math.random() * (140 - 50) + 50) - (user.INT * 0.2) - (user.LUK)
                    var newUserHP = Math.floor(userHP - HPtoSub)

                    var userHP = newUserHP

                    return combatEmbed.setDescription(`Your focus overflows with arcane power and shocks **${mob.Name}** for **${userDMG}** damage. You receive **${mobDMG}** damage.
                    The electric current overwhelms your body and you take **${HPtoSub}** recoil damage.`)

                case "Mystical Space Typhoon":

                    var spellCost = 35

                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. (Spell failed) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    var mpToSub = 20
                    var newMobMP = Math.floor(newMobMP - mpToSub)
                    var userMP = Math.floor(userMP + mpToSub)

                    var newmobINT = Math.floor(newmobINT * 0.5)
                    var mobINT = newmobINT

                    var statsToAdd = Math.floor(newmobINT * 0.5)
                    var newuserINT = Math.floor(user.INT + statsToAdd + mpToSub)

                    var scaledMaxDMG = Math.floor(100) + Math.floor(user.INT * 1.2)
                    var scaledMinDMG = Math.floor(30) + Math.floor(user.LUK * 0.8)
                    var userDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 10);

                    return combatEmbed.setDescription(`A mystical space typhoon saps **${mob.Name}**'s INT (**50%**) and MP (**${- mpToSub}**), stealing it for yourself. You deal **${userDMG}** damage and take **${mobDMG}** damage.`)

                case "Ice Barrier":
                    var spellCost = 20

                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. (Spell failed) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = newUserMP

                    var newmobSTR = Math.floor(mob.STR * 0.75)
                    var newmobDEX = Math.floor(mob.DEX - 50)
                    var mobSTR = newmobSTR
                    var mobDEX = newmobDEX

                    var newMobDMG = Math.floor(mobDMG * 0.5)
                    var mobDMG = newMobDMG

                    var userDMG = 0

                    return combatEmbed.setDescription(`The temperature around you drops and the moisture turns into an ice barrier, completely nullifying ${mob.Name}'s attack!
                    Increase your physical damage resistance by **75%**.`)

                case "Dark Coffin":
                    var spellCost = 5
                    var mobstatusTimer = 0
                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. (Spell failed) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = newUserMP

                    var userDMG = 80
                    var mobDMG = 0

                    var mobstatus = "paralyze"

                    return combatEmbed.setDescription(`You seal **${mob.Name}** in a spooky coffin for **${userDMG}** damage, paralyzing them. **${mob.Name}** does **${mobDMG}** damage.`)

                case "Deathrattle":
                    var spellCost = 5

                    if (user.MP < spellCost) {
                        var userDMG = 0
                        return combatEmbed.setDescription(`Your spell fizzles out. (Spell failed) **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    var newUserMP = Math.floor(userMP - spellCost)
                    var userMP = newUserMP

                    var userDMG = 50

                    if (mobstatus === "burn") {
                        var mobstatus = "deathflare"
                        var mobstatusTimer = 0
                        return combatEmbed.setDescription(`Marked **${mob.Name}** for death as their wounds begin to fester (deathflared). Deal **${userDMG}** damage. **${mob.Name}** deals **${mobDMG}** damage.`)

                    }
                    else if (mobstatus === "poison") {
                        var mobstatus = "toxic"
                        var mobstatusTimer = 0
                        return combatEmbed.setDescription(`The poison begins to wreak havoc on **${mob.Name} (toxic)**.. **${mob.Name}** deals **${mobDMG}** damage.`)
                    }

                    else {
                        var mobstatus = "poison"
                        var mobstatusTimer = 0
                        return combatEmbed.setDescription(`**${mob.Name}** is feeling sick **(poisoned)**.. **${mob.Name}** deals **${mobDMG}** damage!`)
                    }


            }

        } finally {
            const combat = require('../combat-system/combat-handler')

            var changedMob = {
                Name: mob.Name,
                HP: mob.HP,
                MP: mob.MP,
                STR: mobSTR,
                DEX: mobDEX,
                INT: mobINT,
                LUK: mobLUK,
                status: mobstatus,
                status: mobstatusTimer
            }
            var changedUser = {
                class: user.class,
                HP: userHP,
                MP: newUserMP,
                STR: userSTR,
                DEX: userDEX,
                INT: userINT,
                LUK: userLUK,
                status: status,
                statusTimer: statusTimer,
                spell1,
                spell2,
                spell3,
                minDMG,
                maxDMG,

            }

            setTimeout(function () {
                combat.combatProc(message, combatEmbed, adReaction, changedUser, changedMob, userDMG, mobDMG, turn)
            }, 1000);

        }

    },


}
