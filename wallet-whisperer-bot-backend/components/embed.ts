import { EmbedBuilder, Message } from 'discord.js';

export const registerEmbed = new EmbedBuilder()
  .setAuthor({
    name: "0xArchitect",
  })
  .setTitle("Welcome to Wallet Whisperer Bot")
  .setDescription("```\nI am Wallet Whisperer. Register with your wallet and it will mint you a soul bound nft in your wallet on scroll sepolia. It will act as your identity for receiving messages.\n\n```")
  .setImage("https://media.discordapp.net/attachments/936582766269718549/1183181186047156294/file-ebodd2f3RI40ZjTFstIsduDv.png?ex=65876659&is=6574f159&hm=05a65177c9393ad36c0fdb10ff5068ffb558fde92a9377b261b46882156c50a8&=&format=webp&quality=lossless&width=1264&height=1264")
  .setColor("#3729ff")
  .setTimestamp();
