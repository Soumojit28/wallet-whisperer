// const { ethers } = require("ethers");
// const users = require("../models/Users");

import { ethers } from "ethers";
import { verifyToken } from "./tokenService"
import { mintToken, getBalance } from "../web3/contractInteracion";
import { findByDiscordId } from "./subgraphService";
import { encryptMessage } from "../web3/encryption";
const verify = async (address:string, message:string, signature:string, userId:string, token:string) => {
  const split = message.split(" ");
  const userId_extract = split[split.indexOf("discordId") + 2];
  const token_extract = split[split.indexOf("token") + 2];

  if (userId_extract !== userId.toString() || token_extract !== token) {
    return {
      status: false,
      message: "Id mismatch",
    };
  }

  console.log(userId, token, "userId, token");
  if (!(await verifyToken(userId, token))) {
    return { status: false, message: "Link Expired" };
  }

  const signAddress = ethers.utils.verifyMessage(message, signature);
  console.log("signAddress", signAddress);
  console.log("address", address);

  if (signAddress.toLowerCase() !== address.toLowerCase()) {
    return { status: false, message: "Invalid Signature" };
  }

  // const nft = await findNftByDiscordId(userId);
  // if (nft) {
  //   return { status: false, message: "Already Minted" };
  // }

  const balance = await getBalance(address);
  console.log("balance", balance);
  if (balance > 0) {
    return { status: false, message: "Already Minted" };
  }

  const data: any = await findByDiscordId(userId)
  if(data.discordId!==null){
    return { status: false, message: "Discord Id Already Connected with wallet "+ data.discordId.walletAddress };
  }
  
const encryptedId = await encryptMessage(userId);

  // await createNft(userId, Number(token));
  const receipt = await mintToken(address, encryptedId);

  return { status: true, message: "Success", txReceipt: receipt};
  
};

export default verify;
