import Nft from "../models/nft";

// find nft by discord id
const findNftByDiscordId = async (discordId: string) => {
    const data = await Nft.findOne({ discordId: discordId });
    return data;
}

const findNftByTokenId = async (tokenId: string) => {
    const data = await Nft.findOne({ tokenId: tokenId });
    return data;    
}

const createNft = async (discordId: string, tokenId: number) => {
    const data = await Nft.create({ discordId: discordId, tokenId: tokenId });
    return data;    
}

const updateNft = async (discordId: string, tokenId: string) => {
    const data = await Nft.updateOne({ discordId: discordId }, { tokenId: tokenId });
    return data;    
}

export { findNftByDiscordId, findNftByTokenId, createNft, updateNft}