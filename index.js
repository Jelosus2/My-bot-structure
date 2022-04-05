require('dotenv').config(); 
const Discord = require('discord.js'); 
const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS]
})
const fs = require('fs');

client.slashcommands = new Discord.Collection()
const slashcommandFiles = fs.readdirSync('./slashcmds').filter(file => file.endsWith('.js')) 

for (let file of slashcommandFiles) {
    const slash = require(`./slashcmds/${file}`) 
    console.log(`Slash command loaded - ${file}`)

    client.slashcommands.set(slash.data.name, slash)
}

client.on('ready', () => {
    console.log(`${client.user.tag} is online`) 
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() && !interaction.isButton()) return
    
    const slashcmds = client.slashcommands.get(interaction.commandName)
    if (!slashcmds) return

    try {
        await slashcmds.run(client, interaction)
    } catch (e) {
        console.error(e)
    }
})

client.login(process.env.TOKEN) 
