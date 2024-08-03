import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import './App.css';
import Login from './Components/Login';
import Connected from './Components/Connected';
import { contractAddress, contractAbi } from './Constant';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [candidateName, setCandidateName] = useState('');

  useEffect(() => {
    if (provider) {
      getCandidates();
    }
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountChanged);
      }
    }
  }, [provider]);

  async function vote() {
    if (!provider) return;

    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );

    try {
      const tx = await contractInstance.vote(candidateName);
      await tx.wait();
      await getCandidates();
    } catch (error) {
      console.error("Error casting vote:", error);
    }
  }

  async function getCandidates() {
    if (!provider) return;

    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );

    try {
      const candidatesList = await contractInstance.getVotes();
      console.log(candidatesList);
      const formattedCandidates = candidatesList.map((candidate) => {
        return {
          name: candidate.name,
          voteCount: candidate.numberOfVotes.toNumber()
        };
      });
      setCandidates(formattedCandidates);
    } catch (error) {
      console.error("Error getting candidates:", error);
    }
  }

  function handleAccountChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });

        if (accounts.length > 0) {
          const address = accounts[0];
          const providerInstance = new ethers.BrowserProvider(window.ethereum);
          setProvider(providerInstance);

          console.log("Metamask connected:", address);
          setIsConnected(true);
          setAccount(address);
        } else {
          console.error("No accounts found. Please check MetaMask and try again.");
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error("MetaMask is not detected in the browser");
    }
  }

  function handleCandidateNameChange(e) {
    setCandidateName(e.target.value);
  }

  return (
    <div className="App">
      {isConnected ? (
        <Connected 
          account={account}
          candidates={candidates}
          name={candidateName}
          handleCandidateNameChange={handleCandidateNameChange}
          voteFunction={vote}
          showButton={true} // Always show the vote button as we can't check if user has voted
        />
      ) : (
        <Login connectWallet={connectToMetamask} />
      )}
    </div>
  );
}

export default App;