import Footer from "./components/Footer"
import Header from "./components/Header"
import Mainsection from "./components/Mainsection"
import Navigation from "./components/Navigation"
import '../src/components/componentStyle.css';
import { useEffect, useState } from "react";
import {connectToContract} from './utils/connectToContract.js';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState('');

  const initContract = async () => {
    const connectedContract = await connectToContract();
    setContract(connectedContract);

    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    setAddress(accounts[0]);
  }
  useEffect(() => {
    initContract();
  },[]);

  return (
    !contract ? <button onClick={initContract}>Connect</button> :

    <div className="container">
    <Header />
    <Navigation setCurrentSection={setCurrentSection} contract={contract} address={address} />
    <div className="main-footer">
      <Mainsection currentSection={currentSection} contract={contract} address={address}/>
      <Footer />
    </div>
   </div>
  )
}

export default App
