import { ethers } from 'ethers';
import './App.css';
import React from 'react';
import greeterJSON from './utils/Greeter.json';
import vendingMachineJSON from './utils/VendingMachine.json';
const greeterAddress = "0x21f99BB0b1d91aADb4753B7A07842Ef448cB82b7";
const vendingMachineAddress = "0xb0bf7Ba98d1ceA8a4Ff8556Ab8381B2E92d4C823";

function App() {
  // pure JavaScript
  // 1. Set Up MetaMask API (provider + requestAccounts)
  const [address, setAddress] = React.useState("");
  const [balance, setBalance] = React.useState(0);
  const [currentGreeting, setCurrentGreeting] = React.useState("");
  const [revolutionRequests, setRevolutionRequests] = React.useState(0);
  React.useEffect(() => {
    // this logic will run, every time the page reloads
    getGreetingFromGreeter();
    setCurrentRevolutionRequests();
  });
  const { ethereum } = window;
  let provider;

  if(ethereum) {
    console.log("This user has MetaMask!")
    ethereum.request({ method: 'eth_requestAccounts'});
    provider = new ethers.providers.Web3Provider(ethereum);
    displayUserDetails();
    
  } else {
    console.log("Hey, install MetaMask!");
  }
  // 2. Create a Contract Instance (using ethers.js)

  // 3. Place this contract instance in a function, and link this function to a button

  async function getGreetingFromGreeter() {
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(greeterAddress, greeterJSON.abi, signer);
    const currentGreeting = await contractInstance.greet();
    setCurrentGreeting(currentGreeting);
  }

  async function setGreeting() {
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(greeterAddress, greeterJSON.abi, signer);
    await contractInstance.setGreeting("Hey Class 1! Go ChainShot!");
  }

  async function callForRevolution() {
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(vendingMachineAddress, vendingMachineJSON, signer);
    await contractInstance.revolution();
    let currentRequests = await contractInstance.revolutionRequests();
    setRevolutionRequests(currentRequests.toString());
  }

  async function setCurrentRevolutionRequests() {
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(vendingMachineAddress, vendingMachineJSON, signer);
    let currentRequests = await contractInstance.revolutionRequests();
    setRevolutionRequests(currentRequests.toString());
  }

  async function displayUserDetails() {
    const signer = await provider.getSigner();
    const addr1 = await signer.getAddress();
    const userBalance = await provider.getBalance(addr1);
    setAddress(addr1);
    setBalance(ethers.utils.formatEther(userBalance));
  }


  
  return (
    <div className="App">
      <div className="title">
        The Class1 React dApp!
      </div>
      <div className="user-info">
        <p>
          <b>Your address:</b> {address}
        </p>
        <p>
          <b>Your balance:</b> {balance}
        </p>
        <p>
          <b>The current Greeter greeting: </b> {currentGreeting}
        </p>
        <p>
          <b>The current number of revolution requests: </b> {revolutionRequests}
        </p>
      </div>
      <button className="my-button" onClick={getGreetingFromGreeter}>
        Get Current Greeting
      </button>
      <p>
      </p>
      <button className="my-button" onClick={setGreeting}>
        Set Greeting
      </button>
      <p>
      </p>
      <button className="my-button" onClick={callForRevolution}>
        Revolution!
      </button>
      <p>
      </p>
      <button className="my-button" onClick={setCurrentRevolutionRequests}>
        What's The State of Revolution?
      </button>
      
    </div>
  );
}

export default App;
