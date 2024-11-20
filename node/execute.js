import { SecretNetworkClient, Wallet } from "secretjs";
import dotenv from "dotenv";
dotenv.config();

const wallet = new Wallet(process.env.MNEMONIC);

const secretjs = new SecretNetworkClient({
  chainId: "secret-4",
  url: "https://rest.lavenderfive.com:443/secretnetwork",
  wallet: wallet,
  walletAddress: wallet.address,
});

let contractCodeHash =
  "4eae278f3cda9a19b0b2432f22d7d5a671fe9672bfea20f27e49297a7db3999c";
let contractAddress = "secret16s5dv3r7ed07pc50qyypwxttmrn0a27ldzfs55";

//send_message_evm variables
let destinationChain = "Polygon";
let destinationAddress = "0xF4e0949B643A89554a5A350C6A762B7bECd33813";
let myMessage = "it is nov 20 at 2:36pmET";

let send_message_evm = async () => {
  const tx = await secretjs.tx.compute.executeContract(
    {
      sender: wallet.address,
      contract_address: contractAddress,
      msg: {
        send_message_evm: {
          destination_chain: destinationChain,
          destination_address: destinationAddress,
          message: myMessage,
        },
      },
      code_hash: contractCodeHash,
      sent_funds: [
        {
          amount: "150000",
          denom:
            "ibc/A7CBAF118AC24A896DC46A098FE9FA2A588A36A2F0239913229D3A11D92E7B2E",
        },
      ],
    },
    { gasLimit: 100_000 }
  );

  console.log(tx);
};
send_message_evm();
