const request = require('request');
const cheerio = require('cheerio');
const get_fo_data = {}

get_fo_data.dvoa = () => {
  return new Promise((resolve, reject) => {
    request.get('https://www.footballoutsiders.com/stats/teamdef', (err, response, body) => {
      if (err && response.statusCode !== 200) {
        reject('Error pulling dvoa')
      } else {
        let array = []
        const $ = cheerio.load(body);
        const teamDefenseRows = $('.sticky-headers').find('tr');
        for (let i = 2; i < 34; i++) {
          let object = {}
          object.team = $(teamDefenseRows[i]).children('td:nth-child(2)').text(); 
          object.defense_dvoa = $(teamDefenseRows[i]).children('td:nth-child(3)').text(); 
          object.last_year =$(teamDefenseRows[i]).children('td:nth-child(4)').text(); 
          object.wei_defense = $(teamDefenseRows[i]).children('td:nth-child(5)').text(); 
          object.pass_def = $(teamDefenseRows[i]).children('td:nth-child(7)').text();
          object.run_def = $(teamDefenseRows[i]).children('td:nth-child(9)').text();
          object.non_adjusted_total = $(teamDefenseRows[i]).children('td:nth-child(11)').text(); 
          object.non_adjusted_pass = $(teamDefenseRows[i]).children('td:nth-child(12)').text(); 
          object.non_adjusted_rush = $(teamDefenseRows[i]).children('td:nth-child(13)').text(); 
          object.variance = $(teamDefenseRows[i]).children('td:nth-child(14)').text();  
          object.sos = $(teamDefenseRows[i]).children('td:nth-child(16)').text(); 
          array.push(object)
        }
        for (let i = 38; i < 70; i++) {
          let team = $(teamDefenseRows[i]).children('td:nth-child(2)').text();
          let index = array.findIndex(x => {
            return x.team === team;
          })
          array[index].vs_wr1 = $(teamDefenseRows[i]).children('td:nth-child(3)').text();
          array[index].pa_per_game_wr1 = $(teamDefenseRows[i]).children('td:nth-child(5)').text();
          array[index].pya_per_game_wr1 = $(teamDefenseRows[i]).children('td:nth-child(6)').text();
          array[index].vs_wr2 = $(teamDefenseRows[i]).children('td:nth-child(7)').text();
          array[index].pa_per_game_wr2 = $(teamDefenseRows[i]).children('td:nth-child(9)').text();
          array[index].pya_per_game_wr2 = $(teamDefenseRows[i]).children('td:nth-child(10)').text();
          array[index].vs_wr3 = $(teamDefenseRows[i]).children('td:nth-child(11)').text();
          array[index].pa_per_game_wr3 = $(teamDefenseRows[i]).children('td:nth-child(13)').text();
          array[index].pya_per_game_wr3 = $(teamDefenseRows[i]).children('td:nth-child(14)').text();
          array[index].vs_te = $(teamDefenseRows[i]).children('td:nth-child(15)').text();
          array[index].pa_per_game_te = $(teamDefenseRows[i]).children('td:nth-child(17)').text();
          array[index].pya_per_game_te = $(teamDefenseRows[i]).children('td:nth-child(18)').text();
          array[index].vs_rb = $(teamDefenseRows[i]).children('td:nth-child(19)').text();
          array[index].pa_per_game_rb = $(teamDefenseRows[i]).children('td:nth-child(21)').text();
          array[index].pya_per_game_rb = $(teamDefenseRows[i]).children('td:nth-child(22)').text();

        }
        for (let i = 73; i < 105; i++) {
          let team = $(teamDefenseRows[i]).children('td:nth-child(2)').text();
          let index = array.findIndex(x => {
            return x.team === team;
          })
          array[index].vs_left = $(teamDefenseRows[i]).children('td:nth-child(3)').text();
          array[index].vs_middle = $(teamDefenseRows[i]).children('td:nth-child(5)').text();
          array[index].vs_right = $(teamDefenseRows[i]).children('td:nth-child(7)').text();
          array[index].vs_deep = $(teamDefenseRows[i]).children('td:nth-child(9)').text();
          array[index].vs_short = $(teamDefenseRows[i]).children('td:nth-child(11)').text();
          array[index].vs_deep_left = $(teamDefenseRows[i]).children('td:nth-child(13)').text();
          array[index].vs_deep_middle = $(teamDefenseRows[i]).children('td:nth-child(14)').text();
          array[index].vs_deep_right = $(teamDefenseRows[i]).children('td:nth-child(15)').text();
          array[index].vs_short_left = $(teamDefenseRows[i]).children('td:nth-child(16)').text();
          array[index].vs_short_middle = $(teamDefenseRows[i]).children('td:nth-child(17)').text();
          array[index].vs_short_right = $(teamDefenseRows[i]).children('td:nth-child(18)').text();
        }
        resolve(array)
      }
    });    
  })
};

// get defense dvoa data
get_fo_data.dvoa().then(x => {
  // should insert the data scrape into db here
  console.log(x)
});


module.exports = getFO;
