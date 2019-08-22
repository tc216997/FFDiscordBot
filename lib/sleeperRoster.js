const request = require('request');
const sleeperPlayers = require('./sleeper.json');
const teamLookup = require('../stats/teamLookup.json');
const sleeperUtilities = {};

sleeperUtilities.getRoster = () => {
  let array = [];
  let validPosition = ['wr', 'rb', 'te', 'qb', 'k'];

  return new Promise((resolve, reject) => {
    request.get('https://api.sleeper.app/v1/players/nfl', (err, response, body) => {
      if (err && response.statusCode !== 200) {
        reject('Error pulling sleeper roster data')
      } else {
        Object.keys(sleeperPlayers).map(key => {
          let playerObj = sleeperPlayers[key];
          let obj = {}
          // only get players / not dst
          if (!isNaN(key) && playerObj.team && playerObj.position && validPosition.includes(playerObj.position.toLowerCase())) {
            // teamName, teamSymbol, full name, first, last, position, sleeperid, rotowireid, espnid, yahooid
            obj.teamname = teamLookup[playerObj.team].name.toLowerCase();
            obj.teamSymbol =  playerObj.team.toLowerCase();
            obj.fullName = playerObj.full_name.toLowerCase();
            obj.firstName = playerObj.first_name.toLowerCase();
            obj.lastName = playerObj.last_name.toLowerCase();
            obj.position = playerObj.position.toLowerCase();
            obj.sleeper_id = key;
            obj.rotowire_id = playerObj.rotowire_id;
            obj.espn_id = playerObj.espn_id;
            obj.yahoo_id = playerObj.yahoo_id;
            array.push(obj);
          }
        });
        resolve(array)
      }
    })
  });
}


module.exports = sleeperUtilities;
