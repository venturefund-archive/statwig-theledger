import React from "react";
import CreateShipment from "../../components/createshipment";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useTranslation } from "react-i18next";
import Torus from "@toruslabs/torus-embed";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";


export const getTorusProvider = async () => {
  if(!torus.isInitialized){
    try {
      await torus.init({
        buildEnv: "production", // default: production
        enableLogging: true, // default: false
        network: {
          host: "mumbai", // default: mainnet
          chainId: 80001, // default: 1
          networkName: "Mumbai Test Network", // default: Main Ethereum Network
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  await torus.login();
  return torus;
};

export const connectToAlchemy = async () => {
  const torus = await getTorusProvider();
  console.log(torus);
  const provider = torus.provider;
  const web3 = createAlchemyWeb3(
    `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`, { writeProvider: provider });
    web3.eth.getBlock("latest").then((block) => {
      console.log("BLOCKS ARE",block)
    });
}

export const signTransaction = async (data) => {
  const nonce = await web3.eth.getTransactionCount(
    WALLET_ADDRESS,
    "latest"
  );      
  const tx = {
    from: WALLET_ADDRESS,
    to: contractAddress,
    nonce: nonce,
    data: shipmentContract.methods
      .updateShipment(
        data.id,
        data.data,
        data.qty,
        Date.now(),
        WALLET_ADDRESS
      )
      .encodeABI(),
  };
  const signedTransaction = await torus.signTransaction(tx);
  const signature = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  return signature;
}
 
const CreateShipmentContainer = (props) => {
  const { t } = useTranslation();
  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='content'>
          <CreateShipment {...props} t={t} connectToAlchemy={connectToAlchemy} signTransaction={signTransaction}/>
        </div>
      </div>
    </div>
  );
};

export default CreateShipmentContainer;
