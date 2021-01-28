import axios from "axios";

export const sendMessage = (relayerBalance: string, gsnBalance: string) => {
  //Send message here
  const bot_url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
  const chat_id = process.env.TG_ID;
  const text = `** LESS THAN 2 ETH, PLEASE REFILL **
    Relayer Balance ${relayerBalance}
    GSN Recipient Balance ${gsnBalance}
   `;

  axios({
    method: "POST",
    url: bot_url,
    data: {
      chat_id,
      text,
    },
  });

  if (process.env.TG_ID_2) {
    axios({
      method: "POST",
      url: bot_url,
      data: {
        chat_id: process.env.TG_ID_2,
        text,
      },
    });
  }
  if (process.env.TG_ID_3) {
    axios({
      method: "POST",
      url: bot_url,
      data: {
        chat_id: process.env.TG_ID_3,
        text,
      },
    });
  }
};
