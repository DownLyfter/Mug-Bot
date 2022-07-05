function saveMsgData() {
  jsonfile.writeFileSync('stats.json', data)
  console.log('Saved Data')
}

function saveLevelsData() {
  jsonfile.writeFileSync('ServerLevels.json', GolbalServerLevels)
  console.log('Saved Server Levels.')
}

function saveStatsData() {
  jsonfile.writeFileSync('mugstats.json', stats)
  console.log('Saved Stats data.')
}

function saveServerRoleData() {
  jsonfile.writeFileSync('ServerRoles.json', ServerRoles)
  console.log('Saved Server Roles Data.')
}

function milisToMinutes(millis) {
  var minutes = Math.floor(millis / 60000);
  return minutes;
}

function milisToHours(milis) {
  var hours = Math.floor(milis / 3600000);
  var mins = milis - (hours * 3600000);
  return hours;
}

function milisToHoursMins(milis) {
  var hours = Math.floor(milis / 3600000);
  var mins = Math.round((milis - (hours * 3600000)) / 60000);
  return mins
}

function payCalcMin(mins, wage) {
  var hours = mins / 60;
  var Pay = hours * wage;
  var payMult = Math.round(Pay * 100);
  var payRound = payMult / 100;
  return payRound;
};

function payCalcHours(hours, wage) {
  var Pay = hours * wage;
  var payMult = Math.round(Pay * 100);
  var payRound = payMult / 100;
  return payRound;
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function raiseCalc() {
  let raiseAmount = getRandomIntInclusive(1, 10)
  userStats.wage = userStats.wage + raiseAmount
  userStats.wage = getRandomIntInclusive(50, 200)
  msg.reply(`You worked for ${userStats.raiseHours} hours and got an ${raiseAmount} raise! You now make ${userStats.wage} per hour!`)
}

function homeCheck(homeNum) {
  switch (homeNum) {
    case 1:
      return `no home`
      break;
    case 2:
      return `tent`
      break;
    case 3:
      return `shack`
      break;
    case 4:
      return `house`
      break;
  }
}

function getQuote(number) {
  console.log(number)
  switch (number) {
    case 1:
      return quote1
      break;
    case 2:
      return quote2
      break;
    case 3:
      return quote3
      break;
    default:
      return "Something went wrong, so take this text instead."
      break;
  }
}

function slotsRandomizer() {
  let icons = []
  let loops = 1
  let slotResults = []
  while (loops <= 3) {
    loops++
    icons[loops - 2] = getRandomIntInclusive(1, 3)
  }
  loops = 1
  while (loops <= 3) {
    loops++
    switch (icons[loops - 2]) {
      case 1:
        slotResults[loops - 2] = mugEmoji
        break;
      case 2:
        slotResults[loops - 2] = awEmoji
        break;
      case 3:
        slotResults[loops - 2] = barqsEmoji
        break;
      default:
        slotResults[loops - 2] = mugEmoji
    }
  }
  return slotResults
}

function removeStringifyQuotes(text) { //removes the brackets commas and the double quotes.
  let temp = text.replace(/\"/g, "")
  temp = temp.replace(/[\[\]']+/g, '')
  temp = temp.replace(/,/g, '')
  return (temp)
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function cardDraw(cards) {
  let loops = 0
  let bruh = []
  while (cards > loops) {
    bruh[loops] = [getRandomIntInclusive(1, 13), getRandomIntInclusive(1, 4)]
    loops++
  }
  return bruh
}

function getCardNames(cardDraw) {
  let drawAmount = cardDraw.length
  let cardDrawflat = cardDraw.flat()
  let looptimes = drawAmount
  let loops = 0
  let card = []
  while (looptimes > loops) {
    switch (cardDrawflat[loops]) { //Gets the cards value 
      case 1:
        card[loops] = 2
        break
      case 2:
        card[loops] = 3
        break
      case 3:
        card[loops] = 4
        break
      case 4:
        card[loops] = 5
        break
      case 5:
        card[loops] = 6
        break
      case 6:
        card[loops] = 7
        break
      case 7:
        card[loops] = 8
        break
      case 8:
        card[loops] = 9
        break
      case 9:
        card[loops] = 10
        break
      case 10:
        card[loops] = 'Jack'
        break
      case 11:
        card[loops] = 'Queen'
        break
      case 12:
        card[loops] = 'King'
        break
      case 13:
        card[loops] = 'Ace'
    }
    switch (cardDrawflat[loops + 1]) {
      case 1:
        card[loops + 1] = 'spades'
        break
      case 2:
        card[loops + 1] = 'clubs'
        break
      case 3:
        card[loops + 1] = 'hearts'
        break
      case 4:
        card[loops + 1] = 'diamonds'
        break
    }
    loops++
    return card
  }
}

function xpCalc(level) {
  let xp = Math.round((level * level) * (10 * getRandomIntInclusive(1, 5)))
  if (xp > 10000) xp = 10000
  return xp
}

const mugPrice = 2
const minWage = 5
const mugEmoji = '<:mug:986947250179694612>'
const awEmoji = '<:aw:986946818392875018>'
const barqsEmoji = '<:barqs:986948136687796224>'
const {
  prefix,
  token,
  BotVersion,
} = require('./config.json');
const {
  quote1,
  quote2,
  quote3,
} = require('./drinkQuotes.json')
const jsonfile = require('jsonfile');
const fs = require('fs');
const Discord = require('discord.js');
const {
  MessageEmbed
} = require('discord.js');
const {
  Client,
  Intents
} = require('discord.js');
const {
  error
} = require('console');
const {
  defaultMaxListeners
} = require('events');
const {
  lookupService
} = require('dns');
const {
  parse
} = require('path');
const {
  Server
} = require('http');
const {
  randomInt
} = require('crypto')
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const rawData = fs.readFileSync('stats.json', 'utf8')
const data = JSON.parse(rawData)
const help = {} //declaring the specific help commands
help['slots'] = 'The slot command is used by messaging "Mug play slots <Amount>" this is gamble the amount you put in on a slot machine.'
help['help'] = 'The help command will send all of the current commands mug bot can do. You can pull this up by messaging "Mug help".'
help['draw'] = 'The draw command will draw an item. "The draw card" will draw a random card. You can use this command by messaging "Mug draw <item>"'
help['work'] = 'The work command will either start you session of working or end the session. You will get paid by the minute. You can use this command by messaging "Mug work".'
help['buy'] = 'The buy command will buy an item from the shop if you have enough money. You can use this command by messaging "Mug buy <item>"'
help['drink'] = 'The drink command will drink one can of mug. You can use this command by messaging "Mug drink".'
help['profile'] = 'The profile command will display an embed of your profile. You can use this command by messaging "Mug profile"'
help['shop'] = 'The shop command will display an embed will all the items that are currently in the shop. You can use this command by messaging "Mug shop".'
const helpCommands = ['help', 'slots', 'draw', 'work', 'buy', 'drink', 'profile', 'shop']

var msgNumber = parseInt(data.messages)
var stats = {};
var quoteSend
if (fs.existsSync('mugstats.json')) {
  stats = jsonfile.readFileSync('mugstats.json');
  console.log('Synced mug stats')
}
var ServerRoles = {}
if (fs.existsSync('ServerRoles.json')) {
  ServerRoles = jsonfile.readFileSync('ServerRoles.json')
  console.log('Synced Server Role stats')
}
var ServerLevels = {}
if (fs.existsSync('ServerLevels.json')) {
  GolbalServerLevels = jsonfile.readFileSync('ServerLevels.json')
  console.log('Synced Server Levels.')
}
client.once('ready', () => {
  console.log('Bot is online.');
});

client.on('guildMemberAdd', member => {
  console.log('User ' + member.user.username + ' has join ther server!')
});
client.on('messageCreate', async msg => {
  if (msg.author.bot) return;
  if (msg.guild.id !== '886787687699333190') return;
  if (msg.content.startsWith(prefix) !== true) return

  if (msg.guild.id in GolbalServerLevels === false) {
    GolbalServerLevels[msg.guild.id] = {}
  }
  const GuildLevels = GolbalServerLevels[msg.guild.id]
  if (msg.author.id in GuildLevels === false) {
    console.log(`${msg.author.id} has no Server Levels. Creating fresh levels`)
    GuildLevels[msg.author.id] = [
      1, //level
      0, //xp
      10, //Xp to next level
      Date.now(), //last xp add time. 
      0 //messages sent.
    ]
    saveLevelsData()
  }
  const levelStats = GuildLevels[msg.author.id]
  if (msg.guild.id in ServerRoles === false) {
    ServerRoles[msg.guild.id] = {}
    saveServerRoleData()
  }
  const GuildRoles = ServerRoles[msg.guild.id]

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
      raiseHours: 5,
      wage: minWage,
      lastUsedVersion: BotVersion,
      home: 1, //1 is no home, 2 would be the next tier of home
      items: {
        scratchTickets: 0,
        Deck: [],
      },
      miscItems: {},
    };
  }

  const userStats = guildstats[msg.author.id];

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (userStats.lastUsedVersion < BotVersion) { //checks for new version then adds the new stats to their stats.
    userStats.lastUsedVersion = BotVersion
    if (userStats.raiseHours > 0 === false) userStats.raiseHours = 5
    if (userStats.wage > 0 === false) userStats.wage = minWage
    if (userStats.lastUsedVersion < BotVersion) userStats.lastUsedVersion = BotVersion //below is added after version 0.3
    if (userStats.home > 0 === false) userStats.home = 1
    if (Array.isArray(userStats.items) === false) userStats.items = {
      scratchTickets: 0,
    }
    userStats.deck = [] //version 0.5
    if (userStats.miscItems === undefined) userStats.miscItems = {} //version 0.6
  }

  if (Date.now() - levelStats[3] >= 60000) {
    levelStats[1] += getRandomIntInclusive(5, 10) + levelStats[0]
    levelStats[4]++
    saveLevelsData()
  }

  if (msg.mentions.members.first() !== undefined) {
    let mentionID = msg.mentions.users.first().id
    let mentionName = msg.mentions.users.first().username
    let mentionGuildStats = stats[msg.guild.id]
    let mentionStats = mentionGuildStats[msg.mentions.users.first().id]
    if (mentionID in guildstats === false) {
      console.log(mentionName + ' has no server stats. Creating new fresh stats.');
      guildstats[msg.author.id] = {
        workingStatus: false,
        lastWorkTime: 0,
        mugAmount: 0,
        mugDrank: 0,
        mugOwned: 0,
        money: 0.00,
        hoursWorked: 0,
        raiseHours: 5,
        wage: minWage,
        lastUsedVersion: BotVersion,
        home: 1, //1 is no home, 2 would be the next tier of home
        items: {
          scratchTickets: 0,
          deck: [],
        },
        miscItems: {},
      };
      saveStatsData()
      let mentionStats = mentionGuildStats[msg.mentions.users.first().id]
    }
  }
  switch (command) {
    case 'set':
      switch (args[0]) {
        case 'role':
          if (!args[1]) msg.reply('please specify what to set, see "mug set role help" for more info.')
          if (args[1] === 'help') msg.reply('Please send role id followed by requirements ie messsages or levels, then the amount of messages or levels.')
          if (parseInt(args[1]) >= 1) {
            if (!args[2]) return msg.reply('Please specify whether role requirement is levels or messages.')
            if (!args[3]) return msg.reply('Please specify amount of messages or amount of levels.')
            if (Object.keys(GuildRoles).length > 0) {
              let loops = 0
              while (loops < Object.keys(GuildRoles).length) {
                if (GuildRoles[JSON.stringify(loops)].includes(args[1])) return msg.reply('Role already has a value.')
                loops++
              }
            }
            switch (args[2].startsWith('m')) {
              case true:
                GuildRoles[Object.keys(GuildRoles).length++] = [args[1], 'm', args[3]]
                if (msg.guild.roles.cache.find(r => r.id === args[1]) === undefined) return msg.reply('Please specify a valid role id.')
                break
              case false:
                GuildRoles[Object.keys(GuildRoles).length++] = [args[1], 'l', args[3]]
                console.log(GuildRoles)
                if (msg.guild.roles.cache.find(r => r.id === args[1]) === undefined) return msg.reply('Please specify a valid role id.')
                break
            }

          }
          saveServerRoleData()
          break;
        default:
          msg.reply(`Please specify what to set.`)
          break
      }
      break
    case 'draw':
      switch (args[0]) {
        case 'card':
          let drawAmount = 0
          let loops = 0
          let card = []
          let msgContent = `You draw a `
          if (parseInt(args[1]) >= 0) {
            drawAmount = parseInt(args[1])
          } else {
            drawAmount = 1
          }
          while (drawAmount > loops) {
            card[loops] = getCardNames(cardDraw(drawAmount))
            var cardFlat = card.flat()
            loops++
          }
          loops = 0
          while (drawAmount * 2 > loops) {
            msgContent += `${cardFlat[loops]} of ${cardFlat[loops+1]}`
            if (drawAmount * 2 > loops + 4) {
              msgContent += `, a `
            }
            if (drawAmount * 2 === loops + 4) {
              msgContent += `, and a `
            }
            loops++
            loops++
          }
          msg.reply(msgContent)
      }
      break
    case 'use':
      switch (args[0]) {
        case 'scratch':
          if (args[1] === 'ticket') {
            if (userStats.items.scratchTickets > 0) {
              let winChance = getRandomIntInclusive(1, 10)
              switch (winChance) {
                case 1:
                  let winAmount = getRandomIntInclusive(100, 5000)
                  userStats.money += winAmount
                  userStats.items.scratchTickets--
                  msg.reply(`You won $${winAmount}! you now have ${userStats.money}`)
              }
            } else
              msg.reply(`You do not have any scratch tickets.`)
          } else msg.reply(`Did you mean Scratch ticked?`)
          break
        default:
          msg.reply(`${args[0]} is not a valid item.`)
          break;
      }
      break;
    case 'play':
      switch (args[0]) {
        case 'slots':
          if (Math.floor(parseInt(args[1])) > 0) {
            let betAmount = parseInt(args[1])
            if (userStats.money >= betAmount) {
              userStats.money -= betAmount
              let slots = []
              let loops = 0
              let looptimes = 5
              let winStatus = 'no'
              slots[0] = removeStringifyQuotes(JSON.stringify(slotsRandomizer())) //A deal with the devil 5 times in a row
              slots[1] = removeStringifyQuotes(JSON.stringify(slotsRandomizer()))
              slots[2] = removeStringifyQuotes(JSON.stringify(slotsRandomizer()))
              slots[3] = removeStringifyQuotes(JSON.stringify(slotsRandomizer()))
              slots[4] = removeStringifyQuotes(JSON.stringify(slotsRandomizer()))
              let slotRandom6 = slotsRandomizer()
              let slots6 = JSON.stringify(slotRandom6)
              slots6 = removeStringifyQuotes(slots6)
              if (slotRandom6[0] === slotRandom6[2]) {
                winStatus = 'win'
              }
              if (slotRandom6[1] === slotRandom6[2]) {
                winStatus = 'win'
              }
              if (slotRandom6[0] === slotRandom6[1]) {
                winStatus = 'win'
                if (slotRandom6[0] === slotRandom6[2]) {
                  winStatus = 'big'
                }
              }
              let msgEdit = await msg.channel.send(slots[0])
              while (looptimes > loops) {
                await sleep(getRandomIntInclusive(1000, 1200))
                await sleep(1000)
                msgEdit.edit(slots[loops + 1])
                loops++
              }
              switch (winStatus) {
                case 'no':
                  msg.reply('You lost.')
                  break;
                case 'win':
                  userStats.money += betAmount * 2
                  msg.reply(`You won ${betAmount*2}!`)
                  break;
                case 'big':
                  userStats.money += betAmount * 10
                  msg.reply(`You won ${betAmount*10}!`)
              }
            } else {
              msg.reply(`You do not have $${betAmount} to gamble away.`)
            }
          } else {
            msg.reply(`${args[1]} is not a valid amount.`)
          }
          break;
        default:
          break;
      }

      break;
    case 'help':
      if (args[0] === undefined) {
        const helpEmbed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`The Help Menu`)
          .setThumbnail('https://cdn.discordapp.com/avatars/958300024595439666/72d1b87db3d8e5d7bb2923235727b1c9.webp')
          .addField('shop', `Displays the mug shop.`, true)
          .addField('work', `Start or stop working.`, true)
          .addField('buy', `Purcase a shop item.`, true)
          .addField('drink', `Drink a mug.`, true)
          .addField('profile', `Display your statistics.`, true)
          .addField('Play', 'Slots, and other games.', false)
          .addField('Use', 'Use an item.', true)
          .setTimestamp()
          .setFooter({
            text: `${msg.author.username} loves mug!`,
            iconURL: 'https://cdn.discordapp.com/avatars/958300024595439666/72d1b87db3d8e5d7bb2923235727b1c9.webp'
          });
        msg.channel.send({
          embeds: [helpEmbed]
        });
      } else {
        if (helpCommands.includes(args[0])) {
          msg.reply(help[args[0]])
        } else {
          msg.reply(`There is no ${args[0]} command.`)
        }
      }
      break;
    case 'work':
      if (userStats.workingStatus === true) {
        var workingTime = Date.now() - userStats.lastWorkTime;
        if (workingTime >= 3600000) {
          var workingTimeRounded = milisToHours(workingTime)
          var workingTimeMins = milisToHoursMins(workingTime)
          userStats.workingStatus = false;
          var pay = payCalcHours(workingTimeRounded, userStats.wage) + payCalcMin(workingTimeMins, userStats.wage);
          userStats.money += pay;
          userStats.hoursWorked += workingTimeRounded
          msg.reply('You worked for ' + workingTimeRounded + ' hours, ' + workingTimeMins + ' minutes and made $' + pay + '!');
        } else {
          var workingTimeRounded = milisToMinutes(workingTime);
          userStats.workingStatus = false;
          var pay = payCalcMin(workingTimeRounded, userStats.wage)
          userStats.money += pay
          userStats.hoursWorked += Math.round((workingTimeRounded / 60) * 100) / 100
          userStats.hoursWorked = Math.round(userStats.hoursWorked * 100) / 100
          msg.reply('You worked for ' + workingTimeRounded + ' minutes and made $' + pay + '!');
        };
      } else {
        userStats.lastWorkTime = Date.now();
        userStats.workingStatus = true;
        msg.reply('You start your shift.');
      }
      break;
    case 'buy':
      switch (args[0]) {
        case 'shack':
          if (userStats.money >= 5000) {
            if (userStats.home > 1) { //checks if they already have a home
              if (userStats.home > 2) { //checks if they already own the home they are trying to buy
                msg.reply(`Your home is already a ${homeCheck(userStats.home)}!`)
              } else {
                userStats.money - 5000
                userStats.home = 3
                msg.reply(`Your house is now a shack!`)
              }
            } else {
              userStats.money - 5000
              userStats.home = 3
              msg.reply(`Your house is now a shack!`)
            }
          } else if (userStats.money < 5000) {
            msg.reply(`You have $${userStats.money}, you need $${5000-userStats.money} more to buy a tent.`)
          }
          break
        case 'tent':
          if (userStats.money >= 1000) {
            if (userStats.home >= 2) {
              msg.reply(`Your home is already a ${homeCheck(userStats.home)}`)
              return
            }
            userStats.money -= 1000
            userStats.home = 2
            msg.reply(`You home is now a tent.`)
          } else {
            msg.reply(`You have $${userStats.money}, you need $${1000-userStats.money} to buy a tent.`)
          }
          break
        case 'shack':
          if (userStats.money >= 5000) {
            if (userStats.home >= 3) {
              msg.reply(`Your home is already a ${homeCheck(userStats.home)}`)
              break
            }
            userStats.money -= 5000
            userStats.home = 3
            msg.reply('Your home is now a shack!')
          } else {
            msg.reply(`You have $${userStats.money}, you need $${5000-userStats.money} more to buy a shack.`)
          }
          case 'house':
            if (userStats.money >= 10000) {
              if (userStats.home >= 4) {
                msg.reply(`Your home is already a ${homeCheck(userStats.home)}.`)
                return
              }
              userStats.money -= 10000
              userStats.home = 4
              msg.reply(`Your home is now a house.`)
            } else {
              msg.reply(`You have $${userStats.money}, you need $${10000-userStats.money} more to buy a house.`)
            }
            break
          case 'mug':
            console.log(`mug`)
            if (parseInt(args[1]) > 0) {
              let amount = parseInt(args[1])
              if (userStats.money >= amount * mugPrice) {
                userStats.mugAmount += amount
                userStats.money -= amount * mugPrice
                msg.reply(`You bought ${amount} mug's! You now have ${userStats.mugAmount} mug's!`)
                break
              }
            } else {
              msg.reply(`${args[1]} is not a valid amount!`)
              break
            }
            default:
              msg.reply(`You did not specify an item to buy, or ${args[0]} is not a buyable item.`)

      }
      break;
    case 'drink':
      if (userStats.mugAmount > 0) {
        quoteSend = getQuote(getRandomIntInclusive(1, 3))
        userStats.mugAmount--
        msg.reply(`${quoteSend} You now have ${userStats.mugAmount} mug's`)
        userStats.mugDrank++
      } else msg.reply(`You do not have any mug!`)
      break;
    case 'profile':
      if (msg.mentions.members.first()) {
        const mentionID = msg.mentions.users.first().id
        const mentionName = msg.mentions.users.first().username
        const mentionGuildStats = stats[msg.guild.id]
        const mentionStats = mentionGuildStats[msg.mentions.users.first().id]
        const mugEmbed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`${msg.mentions.users.first().username}'s Profile`)
          .setAuthor({
            name: `${msg.mentions.users.first().username}`,
            iconURL: msg.mentions.members.first().avatarURL(),
            url: msg.mentions.members.first().avatarURL()
          })
          .setDescription(`Here is ${msg.mentions.users.first().username} profile`)
          .setThumbnail(msg.mentions.members.first().displayAvatarURL())
          .addFields({
            name: 'Mug Bucks',
            value: `$${mentionStats.money}`,
            inline: true
          }, {
            name: 'Mug Drank',
            value: `${mentionStats.mugDrank}`,
            inline: true
          }, {
            name: 'home',
            value: `${homeCheck(mentionStats.home)}`,
            inline: true
          })
          .addFields({
            name: 'Hours Worked',
            value: `${mentionStats.hoursWorked}`,
            inline: true
          }, {
            name: 'Wage',
            value: `${mentionStats.wage}`,
            inline: true
          }, )
          .setTimestamp()
          .setFooter({
            text: `${msg.mentions.users.first().username} loves mug!`,
            iconURL: 'https://cdn.discordapp.com/avatars/958300024595439666/72d1b87db3d8e5d7bb2923235727b1c9.webp'
          });
        msg.channel.send({
          embeds: [mugEmbed]
        });
      } else {
        const mugEmbed1 = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`${msg.author.username}'s Profile`)
          .setAuthor({
            name: `${msg.author.username}`,
            iconURL: msg.author.avatarURL(),
            url: msg.author.avatarURL()
          })
          .setDescription(`Here is ${msg.author.username} profile`)
          .setThumbnail(msg.author.displayAvatarURL())
          .addFields({
            name: 'Mug Bucks',
            value: `$${userStats.money}`,
            inline: true
          }, {
            name: 'Mug Drank',
            value: `${userStats.mugDrank}`,
            inline: true
          }, {
            name: 'home',
            value: `${homeCheck(userStats.home)}`,
            inline: true
          })
          .addFields({
            name: 'Hours Worked',
            value: `${userStats.hoursWorked}`,
            inline: true
          }, {
            name: 'Wage',
            value: `${userStats.wage}`,
            inline: true
          }, )
          .setTimestamp()
          .setFooter({
            text: `${msg.author.username} loves mug!`,
            iconURL: 'https://cdn.discordapp.com/avatars/958300024595439666/72d1b87db3d8e5d7bb2923235727b1c9.webp'
          });
        msg.channel.send({
          embeds: [mugEmbed1]
        });
      }

      break;
    case 'shop':
      const shopEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Magnificent Mug Shop`)
        .setDescription(`Here is the Magnificent Mug Shop`)
        .setThumbnail('https://cdn.discordapp.com/avatars/958300024595439666/72d1b87db3d8e5d7bb2923235727b1c9.webp')
        .addField('12oz can of Mug', `$${mugPrice}`, false)
        .addField('Tent', `$1,000`, true)
        .addFields({
          name: 'Shack',
          value: `$5,000`,
          inline: true
        }, {
          name: 'House',
          value: `$10,000`,
          inline: true
        }, )
        .setTimestamp()
        .setFooter({
          text: `${msg.author.username} loves mug!`,
          iconURL: 'https://cdn.discordapp.com/avatars/958300024595439666/72d1b87db3d8e5d7bb2923235727b1c9.webp'
        });
      msg.channel.send({
        embeds: [shopEmbed]
      });
      break;
    default:
      break;
  }
  if (levelStats[1] >= levelStats[2]) {
    levelStats[1] = levelStats[1] - levelStats[2]
    levelStats[2] = xpCalc(levelStats[0])
    levelStats[0]++
    saveLevelsData()
    console.log(levelStats)
  }
  if (userStats.hoursWorked > userStats.raiseHours) {
    let promoTimes = 0
    while (userStats.hoursWorked > userStats.raiseHours) {
      if (userStats.hoursWorked > userStats.raiseHours) { //checking if user has worked enought to get a raise.
        if (userStats.raiseHours < 1000) {
          let raiseAmount = +getRandomIntInclusive(1, 10)
          userStats.wage = userStats.wage + raiseAmount
          promoTimes++
          userStats.raiseHours = userStats.raiseHours + getRandomIntInclusive(50, 200)
        } else
        if (userStats.raiseHours < 2000 && userStats.raiseHours > 1000) {
          let raiseAmount = getRandomIntInclusive(10, 15)
          userStats.wage = +userStats.wage + raiseAmount
          promoTimes++
          userStats.raiseHours = userStats.raiseHours + getRandomIntInclusive(100, 300)
        } else
        if (userStats.raiseHours < 3000 && userStats.raiseHours > 2000) {
          let raiseAmount = +getRandomIntInclusive(20, 30)
          userStats.wage = +userStats.wage + raiseAmount
          promoTimes++
          userStats.raiseHours = userStats.raiseHours + getRandomIntInclusive(100, 500)
        }
      }
    }
    msg.reply(`You got promoted ${promoTimes} times! You now make ${userStats.wage} per hour!`)
  }
  if (Object.keys(GuildRoles).length > 0) {
    let roleAmount = Object.keys(GuildRoles).length
    let loops = 0
    while (loops < roleAmount) {
      let serverRole = GuildRoles[loops]
      switch (serverRole[1]) {
        case 'l':
          if (levelStats[0] >= serverRole[2]) {
            await msg.guild.roles.fetch()
            if (!msg.member.roles.cache.has(serverRole[0])) {
              msg.member.roles.add(serverRole[0])
            }
          }
          break
        case 'm':
          if (levelStats[4] >= serverRole[2]) {
            await msg.guild.roles.fetch()
            if (!msg.member.roles.cache.has(serverRole[0])) {
              msg.member.roles.add(serverRole[0])
              console.log(`Gave ${msg.author.username} role id ${serverRole[0]}`)
            }
          }
          break
      }
      loops++
    }
  }

  //GuildRoles= [args[1],'m',args[3]]
  userStats.money = (Math.round(userStats.money * 100)) / 100
  saveStatsData()
  saveMsgData()
})
client.login(token);