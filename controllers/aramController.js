const champion = require('../../models/champion.js');

exports.getAramTeam = async (req, res) => {

    const teamSize = 5;
    const rerolls = parseInt(req.query.rerolls, 10) || 0;
    const totalPlayers = teamSize * 2;
    const totalChampions = totalPlayers * (1 + rerolls); 

    Array.prototype.random = function () {
        return this[Math.floor((Math.random() * this.length))]
    }

    try {
        const champions = await champion.findAll();
        const copyChampions = champions.slice();

        const teams = { 
            team1: [],
            team2: [],
        }

        // fisher-yates shuffle algorithm (replacable)
        for (let i = copyChampions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copyChampions[i], copyChampions[j]] = [copyChampions[j], copyChampions[i]];
        }


        for (let i = 0; i < totalPlayers; i++) {
            const intialChamp = copyChampions.pop();
            const rerolls = [];
        }

    } catch (err) {

    }
}