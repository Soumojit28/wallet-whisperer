import { ethers } from "ethers";
import abi from './abi.json'
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL, {chainId:534351, name:"sepolia-scroll"});
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider);

const contractAddress = process.env.CONTRACT_ADDRESS || '';

const contract = new ethers.Contract(contractAddress, abi, wallet)

const mintToken = async(walletAddress: string, discordId:string) => {
    const tx = await contract.mint(walletAddress, discordId, {gasPrice: 800000000});
    const receipt = await tx.wait();
    return receipt;
}

const getBalance = async(walletAddress: string) => {
    const balance = await contract.balanceOf(walletAddress);
    return balance.toNumber();
}

const getDiscordId = async(tokenId: number) => {}

export {mintToken, getBalance}