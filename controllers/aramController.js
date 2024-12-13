const champion = require('../models/champion.js');

exports.getAramTeam = async (req, res) => {

    const teamSize = parseInt(req.body.teamSize, 10) || 5;
    const rerolls = parseInt(req.body.rerolls, 10) || 0;
    console.log(rerolls);
    const totalPlayers = teamSize * 2;
    const totalChampions = totalPlayers * (1 + rerolls); 

    Array.prototype.random = function () {
        return this[Math.floor((Math.random() * this.length))]
    }

    try {
        const champions = await champion.findAll();
        const copyChampions = champions.slice();

        console.log(totalPlayers);

        if (totalPlayers > 10) {
            return res.status(404).json({error: 'too many players (max size is 5)'});
        }
        if (rerolls*totalPlayers + totalPlayers > champions.length){
            return res.status(404).json({ error: 'too many rerolls' });
        } 

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
            let rerolls_list = [];

            for (let j = 0; j < rerolls; j++) {
                rerolls_list.push(copyChampions.pop());
            }

            let player_obj = new Object();
            player_obj.player = i + 1;
            player_obj.first_champ = intialChamp;
            player_obj.rerolls = rerolls_list;

            if (i%2 == 0){
                teams.team1.push(player_obj);
            }else{
                teams.team2.push(player_obj);
            }

        }

        res.json(teams);

    } catch (err) {

    }
}