// require("dotenv").config();\
import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  Events,
  Collection,
  REST,
  Routes,
} from "discord.js";
import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";
import routes from './routes'
// import handlers from "./handlers"
import mongoose from "mongoose";
// import './services/triggerService'
// const PREFIX = "$";
// Client Initialization
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
}) as any;

//resolve all the type errors

client.login(process.env.DISCORD_BOT_TOKEN);
async function DB() {
  await mongoose.connect(process.env.MONGO_URI as any);
  console.log("Connected to DB");
}
DB();
client.setMaxListeners(100);

// Bot Commands
const commands = [];
client.commands = new Collection() as Collection<string, any>;
const commandsPath = path.join(__dirname, "commands");
console.log("Loading Commands", commandsPath);
const commandFiles = fs
  .readdirSync(commandsPath)
  // .filter((file: any) => file.endsWith(".ts"||".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
    console.log(`Loaded command ${command.data.name} from ${filePath}`);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}
//!
client.on(Events.InteractionCreate, async (interaction:any) => {
  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  } else{
    //TODO: add handlers
    // handlers(interaction);
  } 
});

// client.on("modalSubmit", handleModalSubmit);
// client.on("selectMenu", handleSelectMenu);

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN as string
);
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = (await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID as string),
      { body: commands }
    )) as any;

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
const port = process.env.PORT || 3000
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})