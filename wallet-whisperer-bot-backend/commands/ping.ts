import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder() 
    .setName("ping")
    .setDescription("Replies with Pong! (To check server status)"),
  async execute(interaction:any) {
    await interaction.reply({content:"pong!",  ephemeral: true});
  },

} ;
