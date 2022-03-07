# Simple dApp Creation Flow

1. MetaMask
- Detect ethereum provider object, request accounts from user
- ethereum.request({ method: ‘eth_requestAccounts’ });
- Declare a provider to be the Web3Provider!

2. Contract
- Create an Ethers.js Contract instance loaded up with the deployed contract address, ABI and a signer (the MetaMask account connected from Step #1)

3. Button
Create a function that interacts with contract and hook it to a button on front-end

