function saveMsgData() {
  jsonfile.writeFileSync('stats.json', data)
  console.log('Saved Data')
}
function saveStatsData() {
  jsonfile.writeFileSync('mugstats.json', stats)
  console.log('Saved Stats data.')
}
function milisToMinutes(millis) {
  var minutes = Math.floor(millis/60000)
  return minutes
}
function milisToHours(millis) {
  var hours = Math.floor(millis/3600000)
  return hours
}
function payCalcMin(mins){
  var hours = mins/60;
  var Pay = hours * minWage;
  var payMult = Math.round(Pay*100);
  var payRound = payMult/100;
  return payRound;
};
function payCalcHours(hours){
  var Pay = hours * minWage;
  var payMult = Math.round(Pay*100);
  var payRound = payMult/100;
  return payRound;
};
const minWage = 13
const {
  prefix,
  token,
  BotVersion,
} = require('./config.json');
const jsonfile = require('jsonfile');
const fs = require('fs');
const Discord = require('discord.js');
const {
  Client,
  Intents
} = require('discord.js');
const {
  finished
} = require('stream');
const {
  type
} = require('os');
const {
  stringify
} = require('querystring');
const { allowedNodeEnvironmentFlags } = require('process');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const rawData = fs.readFileSync('stats.json', 'utf8')
const data = JSON.parse(rawData)
var msgNumber = parseInt(data.messages)
var stats = {};
if (fs.existsSync('mugstats.json')) {
  stats = jsonfile.readFileSync('mugstats.json');
  console.log('Synced mug sats')
}

client.once('ready', () => {
  console.log('Bot is online.');
});
client.on('messageCreate', async msg => {
 
  if (msg.guild.id !== '886787687699333190') return;
  if (msg.content.startsWith(prefix) !== true) return;
  msgNumber++
  data.messages = JSON.stringify(msgNumber);
  if (msg.guild.id in stats === false) {
    stats[msg.guild.id] = {};
  }
  const guildstats = stats[msg.guild.id];
  if (msg.author.id in guildstats === false) {
    console.log(msg.author.username + ' has no server stats. Creating new fresh stats.');
    guildstats[msg.author.id] = {
      workingStatus: false,
      lastWorkTime: 0,
      mugAmount: 0,
      mugDrank: 0,
      money: 0.00,
    };
  }
  const userStats = guildstats[msg.author.id];
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
    switch (command) {
      case 'hello':
        msg.reply('World!');
        break;
      case 'work':
        if (userStats.workingStatus === true) {
          var workingTime = Date.now()-userStats.lastWorkTime;
            if(workingTime>=3600000) {
              var workingTimeRounded = milisToHours(workingTime);
              userStats.workingStatus = false;
              var pay = payCalcHours(workingTimeRounded);
              userStats.money += pay;
              msg.reply('You worked for ' + workingTimeRounded + ' hours and made $' + pay + '!');
              return;
            } else {
              var workingTimeRounded = milisToMinutes(workingTime);
              userStats.workingStatus = false;
              var pay = payCalcMin(workingTimeRounded)
              userStats.money += pay
              msg.reply('You worked for ' + workingTimeRounded + ' minutes and made $' + pay +'!');
              return;
            }
          var workingTimeRounded = milisToMinutes(workingTime);
          
        } else {
          userStats.lastWorkTime = Date.now();
          userStats.workingStatus = true;
          msg.reply('You start your shift.');
        }
        break;
        default:
          return;
        
    }
  
  saveStatsData()
  saveMsgData()
})
client.login(token);