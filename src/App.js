import logo from './logo.svg';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import './App.css';
import Login from './Components/Login';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(null);

  async function connectToMetaMask() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });

        if (accounts.length > 0) {
          const address = accounts[0];
          // Create a new provider instance
          const provider = new ethers.BrowserProvider(window.ethereum);
          setProvider(provider);
          
          console.log("Metamask connected : ", address);
          setIsConnected(true);
          setAccount(address);
        }  else {
          console.error("No accounts found. Please check MetaMask and try again.");
        }
        /* const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        await provider.send({ method: "eth_requestAccounts"});
        
        const signer = await provider.getSigner();
        const address = await signer.getAddress()

        console.log("Metamask connected : ", address);
        setIsConnected(true); */
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Metamask is not detected in the browser");
    }
  }

  return (
    <div className="App">
      <Login  connectWallet = {connectToMetaMask}/>
    </div>
  );
}

export default App;
