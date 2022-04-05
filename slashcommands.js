require('dotenv').config()
const fs = require('fs')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

const commands = []
const slashcommandFiles = fs.readdirSync('./slashcmds').filter(file => file.endsWith('.js'))

for (let file of slashcommandFiles) {
    const slash = require(`./slashcmds/${file}`)

    commands.push(slash.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN)

createSlash()

async function createSlash() {
    try {
        await rest.put(Routes.applicationCommands('YOUR-BOT-ID-HERE'), { body: commands })
        console.log('Slash command added')
    } catch (e) {
        console.error(e)
    }
} 
