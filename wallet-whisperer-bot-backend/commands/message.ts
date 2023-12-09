import { SlashCommandBuilder } from "@discordjs/builders";
import { isEthereumAddress } from "../utils/web3utils";
import {findByWalletAddress, findByDiscordId} from "../services/subgraphService";
import { encryptMessage, decryptMessage } from "../web3/encryption";
import {client} from "../index";
module.exports = {
  data: new SlashCommandBuilder()
    .setName("message")
    .setDescription("Send Message to Discord User")
    .setDMPermission(true)
    .addStringOption((option) =>
        option
            .setName("address")
            .setDescription("Wallet Address to send message to")
            .setRequired(true)
        )
    .addStringOption((option) =>
        option
            .setName("message")
            .setDescription("Type your message here")
            .setRequired(true)
        ),
    //this is the function that handles the slash command
  async execute(interaction: any) {
    await interaction.deferReply({ ephemeral: true });
    const address = interaction.options.getString("address");
    const message = interaction.options.getString("message");
    const senderEncryptedId = await encryptMessage(interaction.user.id);
    console.log(senderEncryptedId);
    const senderData: any = await findByDiscordId(senderEncryptedId);
    if(senderData.discordId===null){
      await interaction.editReply({
        content: "You are not Registered. Please register first.",
        ephemeral: true,
      });
      return;
    }
    if(senderData.discordId.walletAddress.toLowerCase()===address.toLowerCase()){
      await interaction.editReply({
        content: "You cannot send message to yourself.",
        ephemeral: true,
      });
      return;
    }
    if (!isEthereumAddress(address)) {
      await interaction.editReply({
        content: "The Wallet Address is not valid. Please try again.",
        ephemeral: true,
      });
      return;
    }
    // await interaction.reply({
    //   content: `Address: ${address}\nMessage: ${message}`,
    //   ephemeral: true,
    // });
    const data:any = await findByWalletAddress(address);
    if(data.discordIds.length===0){
      await interaction.editReply({
        content: "The Wallet Address is not connected to any discord user.",
        ephemeral: true,
      });
      return;
    }
    console.log(data);
    const userDiscordId = data.discordIds[0].discordId;
    console.log(userDiscordId);
    const decryptedId = await decryptMessage(userDiscordId);
    try{
    client.users.fetch(decryptedId).then((user:any) => {
      user.send(`From: ${senderData.discordId.walletAddress}\nMessage: ${message}`);
    })
  }catch(e){
    console.log(e);
    await interaction.editReply({
      content: "Invalid Discord Id",
      ephemeral: true,
    });
  }
    await interaction.editReply({
      content: `Message sent!`, 
      ephemeral: true,
    });
  },
} 