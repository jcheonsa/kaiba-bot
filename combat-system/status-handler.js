

module.exports = {

    checkStatus: (message, combatEmbed, uData, tData,) => {

        var { HP, MP, STR, DEX, INT, LUK, status, statusTimer } = tData

        statusTimer++;

        try {

            switch (status) {
                case "burn":
                    var statusDMG = Math.floor(Math.random() * (30 - 10) + 10)
                    combatEmbed.addFields(
                        {
                            name: '\u200b', value: `Burned for **${statusDMG}** damage. Status Timer: **${statusTimer}**`
                        }
                    )
                    return

                case "poison":

                    var statusDMG = Math.floor(Math.random() * (30 - 10) + 10)
                    combatEmbed.addFields(
                        {
                            name: '\u200b', value: `Poisoned for **${statusDMG}** damage. Status Timer: **${statusTimer}**`
                        }
                    )
                    return


                case "toxic":
                    var statusDMG = Math.floor(Math.random() * (100 - 60) + 60)
                    combatEmbed.addFields(
                        {
                            name: '\u200b', value: `Toxiced for **${statusDMG}** damage. Status Timer: **${statusTimer}**`
                        }
                    )
                    return

                case "deathflare":
                    var statusDMG = 80
                    combatEmbed.addFields(
                        {
                            name: '\u200b', value: `Deathflare deals **${statusDMG}** damage. Status Timer: **${statusTimer}**`
                        }
                    )
                    return

                case "blind":
                    return

                case "paralyze":

                    var statusDMG = 0

                    if (statusTimer > 1) {
                        var statusTimer = 0
                        var status = "normal"
                    }

                    combatEmbed.addFields(
                        {
                            name: '\u200b', value: `${status}. Status Timer: **${statusTimer}**`
                        }
                    )
                    return
                case "frozen":
                    return

                case "weakened":
                    return

                case "fragile":
                    return

                case "bleed":
                    var statusDMG = Math.floor()
                    return


            }

        } finally {
            var arr = [statusDMG, status, statusTimer]
            return arr

        }
    }
}