
module.exports = {
    // calculate enemy damage
    calcMobDMG: (user, mob, status, mobstatus) => {

        if (mob.Name === 'Jhin') {
            var scaledMaxDMG = Math.floor(80) + Math.floor(mob.STR * 0.85) + Math.floor(mob.DEX * 0.85)
            var scaledMinDMG = Math.floor(40) + Math.floor(mob.STR * 0.85) + Math.floor(mob.DEX * 0.85)

            var mobDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG)

        } else if (mob.Name === 'Lady of the Clocktower') {

            var scaledMaxDMG = Math.floor(160) + Math.floor(mob.STR * 0.85) + Math.floor(mob.DEX * 0.85)
            var scaledMinDMG = Math.floor(100) + Math.floor(mob.STR * 0.85) + Math.floor(mob.DEX * 0.85)

            var mobDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG)

        } else {

            if (mobstatus === "paralyze") {
                var mobDMG = 0
            } else {
                var scaledMaxDMG = Math.floor(10) + Math.floor(mob.STR * 0.85) + Math.floor(mob.DEX * 0.5)
                var scaledMinDMG = Math.floor(1) + Math.floor(mob.STR * 0.5) + Math.floor(mob.DEX * 0.75)
                // calculate potential damage
                var mobDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 15);
            }
        }
        return mobDMG
    },

    // calculate enemy accuracy
    calcMobACC: (user, mob, status, mobstatus) => {


        // get mob accuracy, scales with DEX and LUK
        let mobACC = Math.floor(100 + mob.DEX + mob.LUK)
        // get user avoidability, scales with 20% of DEX and 80% of LUK
        let userAVD = Math.floor(user.DEX * 0.5) + Math.floor(user.LUK)
        // calc hit chance by subtracting mobAVD from userACC and getting a percantage
        var hitChance = Math.floor(((mobACC - userAVD) / mobACC) * 100)
        // generate random number for hit
        var hitProc = Math.floor(Math.random() * (100 - 1) + 1)

        console.log(hitProc)

        // if hit chance value is greater than random number, you hit
        if (hitChance > hitProc) {
            return result = 1
        } else {
            return result = 0
        }


    }

}