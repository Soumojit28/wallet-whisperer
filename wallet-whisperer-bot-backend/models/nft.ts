import { Schema, model } from "mongoose";


const nftSchema = new Schema(
  {
    tokenId: {
        type: Number,
        required: true,
        unique: true,
    },
    discordId: {
        type: String,
        required: true,
        unique: true,
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: false,
    },
    }

);
// Create the model for the user schema and export it for use in other files in the project
const Nft= model("Nft", nftSchema);
export default Nft;
