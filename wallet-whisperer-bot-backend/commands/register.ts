import { SlashCommandBuilder } from "@discordjs/builders";
import { registerEmbed } from "../components/embed";
import { registerButton } from "../components/buttonComponent";
import { generateToken } from "../services/tokenService";
module.exports = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Register for the messaging bot"),
    // .setDMPermission(true)
    //this is the function that handles the slash command
  async execute(interaction: any) {
    const userName = interaction.user.username.replace(/[^a-zA-Z0-9]/g, '');
    const token = await generateToken(interaction.user.id);
    const url = `${process.env.FE_BASE_URL}/register?token=${token}&discordId=${interaction.user.id}&userName=${userName}`;
    console.log({url});
     await interaction.reply({
      embeds: [registerEmbed],
      components: [registerButton(url)],
      ephemeral: true,
    });
  },
}