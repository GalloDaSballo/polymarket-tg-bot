import dotenv from "dotenv";
import { ethers } from "ethers";
import { MAINNET_URL } from "./constants";
import {
  getMainnetRecipientBalance,
  getMainnetRelayerBalance,
  isMainnetRelayerReady,
} from "./helpers/mainnet";
import {
  isBelowMinimum,
  isMoreThanAnHourAgo,
  displayNotification,
} from "./helpers/util";
import { sendMessage } from "./helpers/telegram";

dotenv.config();

let lastTime = new Date();

const main = async (): Promise<void> => {
  const provider = new ethers.providers.JsonRpcProvider(MAINNET_URL);

  const mainnetRecipientBalance = await getMainnetRecipientBalance(provider);
  console.log("mainnetRecipientBalance", mainnetRecipientBalance);

  const gsnBalance = await getMainnetRelayerBalance(provider);
  console.log("formattedGSNBalance", gsnBalance);

  const isRelayerReady = await isMainnetRelayerReady();
  console.log("isRelayerReady", isRelayerReady);

  if (
    isMoreThanAnHourAgo(lastTime) &&
    isBelowMinimum(mainnetRecipientBalance, gsnBalance)
  ) {
    //An hour has passed and we're still running low
    displayNotification(mainnetRecipientBalance, gsnBalance);
    // sendMessage(mainnetRecipientBalance, gsnBalance);
    lastTime = new Date();
  }
};

main(); // REMOVE THIS
setInterval(main, 10 * 60 * 1000); //every 10 mins
