const axios = require("axios")
const { ethers } = require("ethers")
require('dotenv').config()

const RELAY_HUB_ADD = '0xD216153c06E857cD7f72665E0aF1d7D82172F494'
const RELAY_HUB_ABI = [
    /**
     * @dev Returns an account's deposits. These can be either a contract's funds, or a relay owner's revenue.
    */
   'function balanceOf(address target) external view returns (uint256)'
]
const OUR_RECIPIENT_ADD = '0xaB45c5A4B0c941a2F231C04C3f49182e1A254052' //Address of our GSN recipient

let lastTime = new Date()


const main = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/f918fe7effbf468e84c043b6c54c89d8')

    const relayerBalance = await provider.getBalance("0x64ff2d76fe3095fb9f0a18c088b345ffd2bf8e85");
    
    const formatted = ethers.utils.formatEther(relayerBalance)
    console.log("formatted", formatted)

    const relayHubContract = new ethers.Contract(RELAY_HUB_ADD, RELAY_HUB_ABI, provider)
    const GSNBalance = await relayHubContract.balanceOf(OUR_RECIPIENT_ADD)

    const formattedGSNBalance = ethers.utils.formatEther(GSNBalance)
    console.log("formattedGSNBalance", formattedGSNBalance)

    if(lastTime < (new Date() - 60 * 60 * 1000) && (parseInt(formatted) < 2 || parseInt(formattedGSNBalance) < 2)){
        //An hour has passed and we're still running low
        console.log("** LESS THAN 2 ETH, PLEASE REFILL **")
        console.log("formatted", formatted)
        console.log("formattedGSNBalance", formattedGSNBalance)
        lastTime = new Date()
        sendMessage(formatted, formattedGSNBalance)

    }
}





const sendMessage = (relayerBalance, gsnBalance) => {
            //Send message here
            const bot_url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`
            const chat_id = process.env.TG_ID
            const text = `** LESS THAN 2 ETH, PLEASE REFILL **
Relayer Balance ${relayerBalance}
GSN Recipient Balance ${gsnBalance}
            `
    
            axios({
                method: 'POST',
                url: bot_url,
                data: {
                    chat_id,
                    text
                }
            })
}