import { ethers } from "ethers";
import {
  POLYMARKET_RELAYER_ADDRES,
  RELAY_HUB_ABI,
  RELAY_HUB_ADD,
  OUR_RECIPIENT_ADD,
  POLYMARKET_MAINNET_URL,
} from "../constants";

import axios from "axios";

/**
 * Gets and formats mainnet relayer balance
 * @param provider
 * @returns mainnet relayer balance
 */
export const getMainnetRelayerBalance = async (
  provider: ethers.providers.JsonRpcProvider
): Promise<string> => {
  const relayerBalance = await provider.getBalance(POLYMARKET_RELAYER_ADDRES);

  return ethers.utils.formatEther(relayerBalance);
};

/**
 * Gets and formats mainnet relayer recipient balance
 * @param provider
 * @returns GSNBalance
 */
export const getMainnetRecipientBalance = async (
  provider: ethers.providers.JsonRpcProvider
): Promise<string> => {
  const relayHubContract = new ethers.Contract(
    RELAY_HUB_ADD,
    RELAY_HUB_ABI,
    provider
  );

  const GSNBalance = await relayHubContract.balanceOf(OUR_RECIPIENT_ADD);

  return ethers.utils.formatEther(GSNBalance);
};

/**
 * Checks if the mainnet relayer is ready
 * @returns boolean
 */
export const isMainnetRelayerReady = async (): Promise<boolean> => {
  try {
    const res = await axios({
      method: "GET",
      url: POLYMARKET_MAINNET_URL,
    });

    return res.data?.Ready === true;
  } catch (err) {
    throw new Error("Error fetching relayer status" + err);
  }
};
