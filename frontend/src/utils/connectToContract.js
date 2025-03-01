import {ethers} from 'ethers';
import contractABI from './contractABI.json';

export const connectToContract = async () => {

    if(window.ethereum) {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner();
            const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
            
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            console.log(`provider: ${provider}`)
            console.log(`signer: ${signer}`);
            console.log(`contract Addres: ${contractAddress}`);

            console.log(`signer: ${signer}`);
            console.log(`contract: ${contract}`);

            return contract;
        }catch(error) {
            console.error(error);
        }
    }else{
        alert("Install Metamask")
    }
}