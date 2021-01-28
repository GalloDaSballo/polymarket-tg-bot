import { ethers } from "ethers";
import {
  RELAY_HUB_ABI,
  RELAY_HUB_ADD,
  OUR_RECIPIENT_ADD,
  POLYMARKET_MAINNET_URL,
} from "../constants";

import axios from "axios";

/**
 * Gets and formats relayer balance
 * @param provider
 * @returns  relayer balance
 */
export const getRelayerBalance = async (
  provider: ethers.providers.JsonRpcProvider,
  address: string
): Promise<string> => {
  const relayerBalance = await provider.getBalance(address);

  return ethers.utils.formatEther(relayerBalance);
};

/**
 * Gets and formats relayer recipient balance
 * @param provider
 * @returns GSNBalance
 */
export const getRecipientBalance = async (
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

type Relayer = {
  isReady: boolean;
  address: string;
};

/**
 * Fetches the relayer
 * @returns Relayer
 */
export const getRelayerData = async (url: string): Promise<Relayer> => {
  try {
    const res = await axios({
      method: "GET",
      url,
    });

    const relayer = {
      address: res.data?.RelayServerAddress,
      isReady: res.data?.Ready,
    };

    return relayer;
  } catch (err) {
    throw new Error("Error fetching relayer data" + err);
  }
};
