import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

export const registerButton = (registerUrl: string) => {
    const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            // .setCustomId("btn")
            .setLabel('REGISTER NOW')
            .setStyle(ButtonStyle.Link)
            .setURL(registerUrl)
    )
    return button
}