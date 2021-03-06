const { RichEmbed } = require('discord.js');
const moment = require('moment');
const config = require('../config.js');

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(oldMessage, newMessage) {
    if (config.ignoredUsers.includes(oldMessage.author.id)) return;
    if (config.ignoredChannels.includes(oldMessage.channel.id)) return;

    if (oldMessage.author.bot) {
      return false;
    }
    
    if (!oldMessage.guild) {
      return false;
    }
    
    if (oldMessage.content == newMessage.content) {
      return false;
    }

    if (!oldMessage || !oldMessage.id || !oldMessage.content || !oldMessage.guild) return;
    const channel = oldMessage.guild.channels.find('name', 'raw-logs');
    if (!channel) return;
    channel.send(`\`[${moment(new Date()).format('h:mm:ss')}]\` 📝 ${oldMessage.author.tag} (\`${oldMessage.author.id}\`) Message Edited in **#${oldMessage.channel.name}**:\n**B**: ${oldMessage.cleanContent}\n**N**: ${newMessage.cleanContent}`);
  }
};