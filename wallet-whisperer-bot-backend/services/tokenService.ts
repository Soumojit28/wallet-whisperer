
import tokens from "../models/tokens";
import otpGenerator from "otp-generator";

const generateToken = async (discordId: string) => {
  const otp = otpGenerator.generate(8, { specialChars: false });
  await tokens.findOneAndUpdate(
    { discordId },
    { token: otp },
    { upsert: true, new: true },
  );
  return otp;
};

const verifyToken = async (discordId:string, token: string) => {
  const tokenData = await tokens.findOneAndDelete({
    discordId: discordId,
    token: token,
  });
  console.log(tokenData, "tokenData");
  if (tokenData) {
    console.log("token found");
    return true;
  } else {
    console.log("token not found");
    return false;
  }
};

export { generateToken, verifyToken };  