const request = require('request');
const cheerio = require('cheerio');
const knexConfig = require('./knexfile.js')
const Knex = require('knex');
//initial knex
const knex = Knex(knexConfig);
Model.knex(knex);
const fo_data = {}

// return all 3 table from FO dvoa page in an array, 
fo_data.dvoa = () => {
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
          object.defense_dvoa = parseFloat($(teamDefenseRows[i]).children('td:nth-child(3)').text());
          object.defense_dvoa_rank = parseInt($(teamDefenseRows[i]).children('td:nth-child(1)').text());  
          object.last_year_rank = parseInt($(teamDefenseRows[i]).children('td:nth-child(4)').text()); 
          object.wei_defense = parseFloat($(teamDefenseRows[i]).children('td:nth-child(5)').text());
          object.wei_defense_rank = parseInt($(teamDefenseRows[i]).children('td:nth-child(6)').text()); 
          object.pass_def_dvoa = parseFloat($(teamDefenseRows[i]).children('td:nth-child(7)').text());
          object.pass_def_dvoa_rank = parseInt($(teamDefenseRows[i]).children('td:nth-child(8)').text()); 
          object.run_def_dvoa = parseFloat($(teamDefenseRows[i]).children('td:nth-child(9)').text());
          object.run_def_dvoa_rank = parseInt($(teamDefenseRows[i]).children('td:nth-child(10)').text()); 
          object.non_adjusted_dvoa = parseFloat($(teamDefenseRows[i]).children('td:nth-child(11)').text()); 
          object.non_adjusted_pass_dvoa = parseFloat($(teamDefenseRows[i]).children('td:nth-child(12)').text()); 
          object.non_adjusted_rush_dvoa = parseFloat($(teamDefenseRows[i]).children('td:nth-child(13)').text()); 
          object.variance = parseFloat($(teamDefenseRows[i]).children('td:nth-child(14)').text());
          object.variance_rank = parseInt($(teamDefenseRows[i]).children('td:nth-child(15)').text());    
          object.sos = parseFloat($(teamDefenseRows[i]).children('td:nth-child(16)').text());
          object.sos_rank = parseInt($(teamDefenseRows[i]).children('td:nth-child(17)').text());  
          array.push(object)
        }
        for (let i = 38; i < 70; i++) {
          let team = $(teamDefenseRows[i]).children('td:nth-child(2)').text();
          let index = array.findIndex(x => {
            return x.team === team;
          })
          array[index].vs_wr1 = parseFloat($(teamDefenseRows[i]).children('td:nth-child(3)').text());
          array[index].vs_wr1_rank = parseInt($(teamDefenseRows[i]).children('td:nth-child(4)').text());
          array[index].pa_per_game_wr1 = parseFloat($(teamDefenseRows[i]).children('td:nth-child(5)').text());
          array[index].pya_per_game_wr1 = parseFloat($(teamDefenseRows[i]).children('td:nth-child(6)').text());
          array[index].vs_wr2 = parseFloat($(teamDefenseRows[i]).children('td:nth-child(7)').text());
          array[index].vs_wr2_rank = parseInt($(teamDefenseRows[i]).children('td:nth-child(8)').text());
          array[index].pa_per_game_wr2 = parseFloat($(teamDefenseRows[i]).children('td:nth-child(9)').text());
          array[index].pya_per_game_wr2 = parseFloat($(teamDefenseRows[i]).children('td:nth-child(10)').text());
          array[index].vs_wr3 = parseFloat($(teamDefenseRows[i]).children('td:nth-child(11)').text());
          array[index].vs_wr3_rank = parseInt($(teamDefenseRows[i]).children('td:nth-child(12)').text());
          array[index].pa_per_game_wr3 = parseFloat($(teamDefenseRows[i]).children('td:nth-child(13)').text());
          array[index].pya_per_game_wr3 = parseFloat($(teamDefenseRows[i]).children('td:nth-child(14)').text());
          array[index].vs_te = parseFloat($(teamDefenseRows[i]).children('td:nth-child(15)').text());
          array[index].vs_te_rank = parseInt($(teamDefenseRows[i]).children('td:nth-child(16)').text());
          array[index].pa_per_game_te = parseFloat($(teamDefenseRows[i]).children('td:nth-child(17)').text());
          array[index].pya_per_game_te = parseFloat($(teamDefenseRows[i]).children('td:nth-child(18)').text());
          array[index].vs_rb = parseFloat($(teamDefenseRows[i]).children('td:nth-child(19)').text());
          array[index].vs_rb_rank = parseInt($(teamDefenseRows[i]).children('td:nth-child(20)').text());
          array[index].pa_per_game_rb = parseFloat($(teamDefenseRows[i]).children('td:nth-child(21)').text());
          array[index].pya_per_game_rb = parseFloat($(teamDefenseRows[i]).children('td:nth-child(22)').text());

        }
        for (let i = 73; i < 105; i++) {
          let team = $(teamDefenseRows[i]).children('td:nth-child(2)').text();
          let index = array.findIndex(x => {
            return x.team === team;
          })
          array[index].vs_left = parseFloat($(teamDefenseRows[i]).children('td:nth-child(3)').text());
          array[index].vs_left_rank = parseInt($(teamDefenseRows[i]).children('td:nth-child(4)').text());
          array[index].vs_middle = parseFloat($(teamDefenseRows[i]).children('td:nth-child(5)').text());
          array[index].vs_middle_rank = parseInt($(teamDefenseRows[i]).children('td:nth-child(6)').text());
          array[index].vs_right = parseFloat($(teamDefenseRows[i]).children('td:nth-child(7)').text());
          array[index].vs_right_rank = parseInt($(teamDefenseRows[i]).children('td:nth-child(8)').text());
          array[index].vs_deep = parseFloat($(teamDefenseRows[i]).children('td:nth-child(9)').text());
          array[index].vs_deep_rank = parseInt($(teamDefenseRows[i]).children('td:nth-child(10)').text());
          array[index].vs_short = parseFloat($(teamDefenseRows[i]).children('td:nth-child(11)').text());
          array[index].vs_short_rank = parseInt($(teamDefenseRows[i]).children('td:nth-child(1)').text());
          array[index].vs_deep_left = parseFloat($(teamDefenseRows[i]).children('td:nth-child(13)').text());
          array[index].vs_deep_middle = parseFloat($(teamDefenseRows[i]).children('td:nth-child(14)').text());
          array[index].vs_deep_right = parseFloat($(teamDefenseRows[i]).children('td:nth-child(15)').text());
          array[index].vs_short_left = parseFloat($(teamDefenseRows[i]).children('td:nth-child(16)').text());
          array[index].vs_short_middle = parseFloat($(teamDefenseRows[i]).children('td:nth-child(17)').text());
          array[index].vs_short_right = parseFloat($(teamDefenseRows[i]).children('td:nth-child(18)').text());
        }
        resolve(array)
      }
    });    
  })
};

// get snapcount data from FO, needs the week and year
// return an array filled from snapcount data from rb, wr, and te of all teams during that week and year
fo_data.snapcounts = (week, year) => {
  return new Promise((resolve, reject) => {
    //https://www.footballoutsiders.com/stats/snapcounts?team=CAR&week=1&position=ALL&year=2018
    let url = `https://www.footballoutsiders.com/stats/snapcounts?team=ALL&week=${week}&position=ALL&year=${year}`;
    request.get(url, (err, response, body) => {
      if (err && response.statusCode !== 200) {
        reject(err);
      }
      let array = []; 
      let validPosition = ['rb','wr','te'];
      const $ = cheerio.load(body);
      const rows = $('#edit-table').find('tr');
      for (let i = 0; i < rows.length; i++) {
        let player = $(rows[i]).children('td:nth-child(1)').text();
        let team = $(rows[i]).children('td:nth-child(2)').text();
        let position = $(rows[i]).children('td:nth-child(3)').text().toLowerCase();
        let off_snaps_pct = parseFloat($(rows[i]).children('td:nth-child(7)').text());
        if (validPosition.includes(position)) {
          let obj = {}
          obj.player = player;
          obj.team = team;
          obj.position = position;
          obj.off_snaps = off_snaps;
          obj.off_snaps_pct = off_snaps_pct;
          array.push(obj)
        }
      }
      resolve(array);
         
    })
  });
}

/*
fo_data.dvoa().then(array => {
  // do something with array
});
*/

module.exports = fo_data;
