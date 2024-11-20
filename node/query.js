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

// Query the contract for the stored message sent from Polygon
let get_stored_message = async () => {
  let query = await secretjs.query.compute.queryContract({
    contract_address: contractAddress,
    query: {
      get_stored_message: {},
    },
    code_hash: contractCodeHash,
  });

  console.log(query);
};

get_stored_message();
