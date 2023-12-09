import {ethers, upgrades} from "hardhat";
import hre  from "hardhat";

async function main () {
    const DiscordId = await ethers.getContractFactory("WalletWhisperer");
    const discordId = await upgrades.deployProxy(DiscordId, ["www.example.com"], {initializer: "initialize"});
    // const discordId = await upgrades.upgradeProxy("0xD47fAc6E7984bD3c241939c75ECf7F2FEc462dFE", DiscordId);
    await discordId.waitForDeployment();
    console.log("discordId deployed to:", discordId.target);
    await new Promise(resolve => setTimeout(resolve, 10000));
    await hre.run("verify:verify", {address: discordId.target});

}
 main()