import { Client } from "@xmtp/xmtp-js";
import { Wallet } from "ethers";

export const getClient = async () => {
  if (!process.env.KEY) {
    const wallet = Wallet.createRandom();
    const client = await Client.create(wallet, { env: "dev" });
    process.env.KEY = wallet.privateKey;
    return client;
  } else {
    const walletKeys = process.env.KEY;
    if (walletKeys) {
      const wallet = new Wallet(walletKeys);
      const client = await Client.create(wallet, { env: "dev" });
      return client;
    }
  }
};

export const client = await getClient();
