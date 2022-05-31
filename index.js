function saveMsgData() {
  jsonfile.writeFileSync('stats.json', data)
  console.log('Saved Data')
}
function saveStatsData() {
  jsonfile.writeFileSync('mugstats.json', stats)
  console.log('Saved Stats data.')
}
function milisToMinutes(millis) {
  var minutes = Math.floor(millis/60000);
  return minutes;
}
function milisToHours(milis) {
  var hours = Math.floor(milis/3600000);
  var mins = milis-(hours*3600000);
  return hours;
}
function milisToHoursMins(milis) {
  var hours = Math.floor(milis/3600000);
  var mins = Math.round((milis-(hours*3600000))/60000);
  return mins
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
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
function getQuote(number){
  console.log(number)
  switch (number){
    case 1:
      return quote1
      console.log(quote1)
      break;
    case 2:
      return quote2
      console.log(quote2)
      break;
      default:
        return "Something went wrong, so take this text instead."
        break;
  }
}

const mugPrice = 2
const minWage = 13
const {
  prefix,
  token,
  BotVersion,
} = require('./config.json');
const {
  quote1,
  quote2,
} =require('./drinkQuotes.json')
const jsonfile = require('jsonfile');
const fs = require('fs');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const {
  Client,
  Intents
} = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const rawData = fs.readFileSync('stats.json', 'utf8')
const data = JSON.parse(rawData)
var msgNumber = parseInt(data.messages)
var stats = {};
var quoteSend
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
      mugOwned: 0,
      money: 0.00,
      hoursWorked: 0,
    };
  }
  const userStats = guildstats[msg.author.id];
  if (userStats.hoursWorked >= 0 !== true) userStats.hoursWorked = 0
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
    switch (command) {
      case 'work':
        if (userStats.workingStatus === true) {
          var workingTime = Date.now()-userStats.lastWorkTime;
            if(workingTime>=3600000) {
              var workingTimeRounded = milisToHours(workingTime)     
              var workingTimeMins = milisToHoursMins(workingTime)
              userStats.workingStatus = false;
              var pay = payCalcHours(workingTimeRounded) + payCalcMin(workingTimeMins);
              userStats.money += pay;
              userStats.hoursWorked += workingTimeRounded
              msg.reply('You worked for ' + workingTimeRounded + ' hours, '+ workingTimeMins +' minutes and made $' + pay + '!');
            } else {
              var workingTimeRounded = milisToMinutes(workingTime);
              userStats.workingStatus = false;
              var pay = payCalcMin(workingTimeRounded)
              userStats.money += pay
              userStats.hoursWorked += Math.round((workingTimeRounded/60)*100)/100
              userStats.hoursWorked = Math.round(userStats.hoursWorked*100)/100
              msg.reply('You worked for ' + workingTimeRounded + ' minutes and made $' + pay +'!');
            };
        } else {
          userStats.lastWorkTime = Date.now();
          userStats.workingStatus = true;
          msg.reply('You start your shift.');
        }
        break;
        case 'buy' : 
        if(parseInt(args[0]) > 0){
          let amount = parseInt(args[0])
          if (userStats.money >= amount*mugPrice) {
            userStats.mugAmount += amount
            userStats.money -= amount*mugPrice
            msg.reply(`You bought ${amount} mug's! You now have ${userStats.mugAmount} mug's!`)
          }
        } else {
          msg.reply(`${args[0]} is not a valid amount!`)
        }
        break;
        case 'drink' :
          if (userStats.mugAmount > 0){
            quoteSend = getQuote(getRandomIntInclusive(1, 2))
            userStats.mugAmount--
            msg.reply(`${quoteSend} You now have ${userStats.mugAmount} mug's`)
          } else msg.reply(`You do not have any mug!`)
        break;
        case 'profile':
          const mugEmbed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`${msg.author.username}'s Profile`)
          .setAuthor({ name: `${msg.author.username}`, iconURL: msg.author.avatarURL(), url: msg.author.avatarURL() })
          .setDescription(`Here is ${msg.author.username} profile`)
          .setThumbnail('https://cdn.discordapp.com/avatars/958300024595439666/72d1b87db3d8e5d7bb2923235727b1c9.webp')
          .addFields(
            { name: 'Mug Bucks', value: `$${userStats.money}`, inline: true },
            { name: 'Mug Drank', value: `${userStats.mugDrank}`, inline: true },
            )
          .addField('Hours Worked', `${userStats.hoursWorked}`, false)
          .setTimestamp()
          .setFooter({ text: `${msg.author.username} loves mug!`, iconURL: 'https://cdn.discordapp.com/avatars/958300024595439666/72d1b87db3d8e5d7bb2923235727b1c9.webp' });
          msg.channel.send({ embeds: [mugEmbed] });
          break;
          case 'shop':
            const shopEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Magnificent Mug Shop`)
            .setDescription(`Here is the Magnificent Mug Shop`)
            .setThumbnail('https://cdn.discordapp.com/avatars/958300024595439666/72d1b87db3d8e5d7bb2923235727b1c9.webp')
            .addField('mug', `$${mugPrice}`, false)
            .setTimestamp()
            .setFooter({ text: `${msg.author.username} loves mug!`, iconURL: 'https://cdn.discordapp.com/avatars/958300024595439666/72d1b87db3d8e5d7bb2923235727b1c9.webp' });
            msg.channel.send({ embeds: [shopEmbed] });
            break;
        default:
          case 'amugus':
            msg.reply('Sussy Baka, nya!')
          break;
          return;
    }
  saveStatsData()
  saveMsgData()
})
client.login(token);