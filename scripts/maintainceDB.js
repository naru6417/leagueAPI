const axios = require('axios');
const cheerio = require('cheerio'); 

console.log("i'm online~");
console.log("༼ つ ◕_◕ ༽つ");

axios.get('https://www.leagueoflegends.com/en-us/champions/').then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const champs = $("a[href^='/en-us/champions/']");

    champs.each((index, el) => {
        var championname = el.attributes[1].value;
        var description = el.attributes[2].value;

        const data = {
            championname: championname,
            description: "https://www.leagueoflegends.com" + description,
        }

        var URIname = encodeURIComponent(championname);

        // check if champ exists
        axios.get(`http://localhost:8000/api/champion/${URIname}`).then((getResponse) => {
            // if champ exist update
            // uncomment below for debuging
            //console.log(`Champion ${championname} exists, updating`);
            axios.put(`http://localhost:8000/api/champion/${URIname}`, data).then((putResponse) => {
                console.log('Updated Champion:', putResponse.data);
            }).catch((putError) => {
                console.error('Error updating champion:', putError.response ? putError.response.data : putError.message);
            });
        
        }).catch((getError) => {
            if (getError.response && getError.response.status === 404) {
                // if champ does not exist create
                // uncomment below for debuging
                //console.log(`Champion ${championname} not found`);
                axios.post('http://localhost:8000/api/champion', data).then((postResponse) => {
                    console.log('Created Champion:', postResponse.data);
                }).catch((postError) => {
                    console.error('Error creating champion:', postError.response ? postError.response.data : postError.message);
                });
            } else {
                console.error('Error checking for champion existence:', getError.response ? getError.response.data : getError.message);
            }
        });
    });
});
