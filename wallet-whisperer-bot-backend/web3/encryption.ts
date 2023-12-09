import crypto from "crypto";

const privateKey = process.env.PRIVATE_KEY as string;
const symmetricKey = crypto.createHash("sha256").update(privateKey).digest();

export const encryptMessage = async (message: string) => {
  const cipher = crypto.createCipheriv("aes-256-ecb", symmetricKey, null);
  let encrypted = cipher.update(message, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decryptMessage = async (encryptedString: string) => {
  const decipher = crypto.createDecipheriv("aes-256-ecb", symmetricKey, null);
  let decrypted = decipher.update(encryptedString, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
