import { utils } from 'ethers';

export function isEthereumAddress(address: string): boolean {
  try {
    const addressBytes = utils.arrayify(address);
    return addressBytes.length === 20; // Ethereum addresses are 20 bytes long
  } catch (error) {
    return false; // If there's an error, it's not a valid address
  }
}
