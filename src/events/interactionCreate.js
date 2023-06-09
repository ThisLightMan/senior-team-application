/**
 * @author ThisLightMan <light@corebot.dev>
 * @file interactionCreate Event
 * @module events/interactionCreate
 */

const debug = require('debug')('event')
const config = require('../config')
const CommandHandler = require('../handlers/CommandHandler')
const RoleSelectorHandler = require('../handlers/RoleSelectorHandler')
const PollVoteHandler = require('../handlers/PollVoteHandler')

/**
 * @event interactionCreate
 * @param {Interaction} interaction The interaction that was created
 */
module.exports = interaction => {
    debug('interactionCreate')

    if (interaction.isCommand()) {
        const command = CommandHandler.find(interaction.commandName)
        if (command) command.exec(interaction)
    }

    if (interaction.isButton() && interaction.customId === config.Messages.Join.Components[0][0].CustomID) {
        RoleSelectorHandler(interaction)
    }

    if (interaction.isButton() && interaction.customId.startsWith('vote-')) {
        PollVoteHandler(interaction)
    }
}
