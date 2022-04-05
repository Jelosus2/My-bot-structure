const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = { 
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Returns pong'),

    async run(client, interaction) {
        interaction.reply({ content: 'Pong!' })
    }
}
