
module.exports = {
    // calculate enemy damage
    calcMobDMG: (userData, userHP, newUserMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK,) => {

        let { class: className, } = userData
        let { mobName, mp: mobMP, description: mobDESC, img: mobIMG } = mobData

        var scaledMaxDMG = Math.floor(10) + Math.floor(mobSTR * 0.85) + Math.floor(mobDEX * 0.5)
        var scaledMinDMG = Math.floor(1) + Math.floor(mobSTR * 0.5) + Math.floor(mobDEX * 0.75)
        // calculate potential damage
        var mobDMG = Math.floor(Math.random() * (scaledMaxDMG - scaledMinDMG) + scaledMinDMG) - Math.floor(Math.random() * 15);

        return mobDMG

    },

    // calculate enemy accuracy
    calcMobACC: (userData, userHP, newUserMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK,) => {

        let { class: className, } = userData
        let { mobName, mp: mobMP, description: mobDESC, img: mobIMG } = mobData


        // get mob accuracy, scales with DEX and LUK
        let mobACC = Math.floor(100 + mobDEX + mobLUK)
        // get user avoidability, scales with 20% of DEX and 80% of LUK
        let userAVD = Math.floor(userDEX * 0.5) + Math.floor(userLUK)
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