const request = require('request');
const cheerio = require('cheerio');
const url = 'https://www.footballoutsiders.com/stats/teamdef';
const url2 = 'https://www.footballoutsiders.com/stats/teamoff';
const nflGamesUrl = 'http://www.nfl.com/liveupdate/scores/scores.json';
const fs = require('fs');
let array = [];

const checkString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const getDVOA = () => {
  request.get(url, (err, response, body) => {
    if (err && response.statusCode !== 200) {
      console.log(err)
    } else {
      let array = []
      const $ = cheerio.load(body);
      const rows = $('.sticky-headers').find('tr');
      for (let i = 2; i < 34; i++) {
        let object = {}
        object.team = $(rows[i]).children('td:nth-child(2)').text();
        object.rank = parseFloat($(rows[i]).children('td:nth-child(6)').text());
        object.passRank = parseFloat($(rows[i]).children('td:nth-child(8)').text());
        object.passDvoa = parseFloat($(rows[i]).children('td:nth-child(7)').text());
        object.runRank = parseFloat($(rows[i]).children('td:nth-child(10)').text());
        object.runDvoa = parseFloat($(rows[i]).children('td:nth-child(9)').text());
        if (object.team !== 'NFL') {
          array.push(object)
        }
      } 
      fs.writeFile('../stats/defensedvoa.json', JSON.stringify(array, null, 2), () => {
        console.log('Writing defense dvoa done.')
      });
    }
  });

  request.get(url2, (err, response, body) => {
    if (err && response.statusCode !== 200) {
      console.log(err)
    } else {
      let array = []
      const $ = cheerio.load(body);
      const rows = $('.sticky-headers').find('tr');
      for (let i = 2; i < 34; i++) {
        let object = {}
        object.team = $(rows[i]).children('td:nth-child(2)').text();
        object.rank = parseFloat($(rows[i]).children('td:nth-child(6)').text());
        object.passRank = parseFloat($(rows[i]).children('td:nth-child(8)').text());
        object.passDvoa = parseFloat($(rows[i]).children('td:nth-child(7)').text());
        object.runRank = parseFloat($(rows[i]).children('td:nth-child(10)').text());
        object.runDvoa = parseFloat($(rows[i]).children('td:nth-child(9)').text());
        if (object.team !== 'NFL') {
          array.push(object)
        }
      }

      fs.writeFile('../stats/offensedvoa.json', JSON.stringify(array, null, 2), () => {
        console.log('Writing offense dvoa done.')
      });        
    }
  });
  request(nflGamesUrl, (err, response, json) => {
    if (err) console.log(`Error at getScores function \n${err}`)
    if (response.statusCode === 200 && checkString(json)) {
      let games = JSON.parse(json);
      let array = []
      gameNumbers = Object.keys(games);
      gameNumbers.map(id => {
        let object = {}
        object.home = games[id].home.abbr;
        object.away = games[id].away.abbr;
        array.push([object.home, object.away])
      });
      fs.writeFile('../stats/weeklymatchups.json', JSON.stringify(array, null, 2), () => {
        console.log('Writing matchups done.')
      });
    }
  });
  
};

getDVOA();


