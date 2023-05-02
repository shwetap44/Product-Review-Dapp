import './App.css';
import ProductReviews from "./artifacts/contracts/ProductReviews.sol/ProductReviews.json";
import {useState, useEffect} from "react";
import {ethers} from "ethers";
import AddReview from './Components/AddReview';

function App() {

  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async()=>{
      if(provider){

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x20389b2b2ac1517Bda44387210aFbFCf66644275";

        const contract = new ethers.Contract(contractAddress, ProductReviews.abi, signer);
        // console.log(contract);
        setContract(contract);
        setProvider(provider);
      }else{
        console.error("Metamask is not installed");
      }
    }

    provider && loadProvider();
  },[])

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">Decentralized Product Review App</h1>

      <p className="block text-gray-700 font-bold mb-2">
          Connected Account : {account ? account : "Not connected"}
      </p>

      <AddReview contract={contract} account={account}></AddReview>
    </div>
  );
}

export default App;
