const teamstats = require('../stats/teamstats.json');
const defDvoa = require('../stats/defensedvoa.json');
const offDvoa = require('../stats/offensedvoa.json');
const schedule = require('../stats/weeklymatchups.json');

let passDiff = [];
let runDiff = [];
let defenseDiff = []

const findOff = (str) => {
  let obj;
  offDvoa.map(item => {
    if (item.team === str) {
      obj = item
    }    
  });
  return obj
}

const findDef = (str) => {
  let obj; 
  defDvoa.map(item => {
    if (item.team === str) {
      obj = item;
    } 
  });
  return obj
}

schedule.map(game => {
  let home = game[0], away = game[1];
  if (home === 'LA') {
    home = 'LAR'
  }
  if (home === 'JAC') {
    home = 'JAX'
  }  
  if (away === 'LA') {
    away = 'LAR'
  }
  if (away === 'JAC') {
    away = 'JAX'
  }
  let homeOff = findOff(home);
  let homeDef = findDef(home);
  let awayOff = findOff(away);
  let awayDef = findDef(away);
  // lets do home passing vs away pass d
  let homePassDiff = Math.round((.75*homeOff.passDvoa + .25*awayDef.passDvoa)*100)/100;
  let awayPassDiff = Math.round((.75*awayOff.passDvoa + .25*homeDef.passDvoa)*100)/100;
  let homeRunDiff = Math.round((.55*homeOff.runDvoa + .45*awayDef.runDvoa)*100)/100;
  let awayRunDiff = Math.round((.55*awayOff.runDvoa + .45*homeDef.runDvoa)*100)/100;
  let homeDefDiff = Math.round((.75*awayPassDiff+.25*awayRunDiff)*100)/100;
  let awayDefDiff = Math.round((.75*homePassDiff+.25*homeRunDiff)*100)/100;
  passDiff.push([home, homePassDiff]);
  passDiff.push([away, awayPassDiff]);
  runDiff.push([home, homeRunDiff]);
  runDiff.push([away, awayRunDiff]);  
  defenseDiff.push([home, homeDefDiff]);
  defenseDiff.push([away, awayDefDiff]);
  // lets get the home team offensive dvoa
});
passDiff.sort((a, b) => {return b[1] - a[1]});
runDiff.sort((a, b) => {return b[1] - a[1]});
defenseDiff.sort((a, b) => {return a[1] - b[1]});
// get matchups for the week
console.log('passing matchups');
console.log(passDiff);
console.log('')
console.log('running matchups')
console.log(runDiff)
console.log('')
console.log('Top defense to stream')
console.log(defenseDiff)