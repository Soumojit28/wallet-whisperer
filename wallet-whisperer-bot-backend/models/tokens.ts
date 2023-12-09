import { Schema, model } from "mongoose";

const tokenSchema = new Schema(
  {
    discordId: String,
    token: String,
  },
  { collection: "Tokens", versionKey: false, timestamps: true }
);
tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

// Create the model for the user schema and export it for use in other files in the project
const tokens = model("Users", tokenSchema);
export default tokens;
