# EtherTrust: A Crypto Trust Fund 

**Author**
Nassim Dehouche

**Ethereum account for NFT certification:**
`0xb2cddF705eA6f12D7B5Da081F679305A3209Af99`




**Project Descriptionw**
A trust fund is a legal entity that holds property or assets on behalf of another person, group or organization. It is an estate planning tool that keeps your assets in a trust managed by a neutral third party, or trustee.

1. Testator creates a will specifiying an amount to be held, a maturity, a beneficiary, and an optional reward for a third party to execute it in the future. A reward of zero means that they are counting on the generosity of a future third party or the dapp owner.
2. The amount is transfered to the contract and is held there until the user modifies or cancels their will or the will reaches maturity and is executed either by the beneficiary or a third party.
3. A lastAlive timestamp associated with each testator is updated every time the testator interacts with the contract. The contract returns an error if an address that never created a will tries to report that they are still alive.
4. A testator can have multiple wills associated with his/her address.
5. A testator can modify or cancel his/her wills any time.
6. A will can only be executed if the amount of time elapsed since the testator was `lastAlive` exceeds the maturity of the will. 


**Deployed Front-End** 
* The front-end is deployed at [https://ethertrust.nassimdehouche2.repl.co/](ethertrust.nassimdehouche2.repl.co).
* It is written in html + css + js.
  * Wallet connect button.
  * Sends request to switch to Ropsten if user is connected to the wrong network. 
  * Detects changes in address and displays current address on the front-end.
  * Once connected, interaction div becomes visible.
  * It allows users to read and write data in the smart contract using the appropriate functions.
  
**Screencast**
https://www.youtube.com/watch?v=H-O5DABbCG8


## Directory Structure
Key files and folders structures are as below:
```
EtherTrust (root)
+-- .env
+-- README.md
+-- design_pattern_decisions.md
+-- avoiding_common_attacks.md 
+-- truffle-config.js
+-- package.json
+-- package-lock.json
|
+-- build
|   +-- contracts
|       +--Context.json
|       +--EtherTrust.json
|       +--Migrations.json
|       +--Ownable.json
|       +--Pausable.json
|       +--ReentrancyGuard.sol
|
+-- contracts
|   |   +-- Context.sol
|   |   +-- Ethertrust.sol  
|   |   +-- Pausable.sol
|   |   +-- ReentrancyGuard.sol
|   |   +-- Ownable.sol 
|
+-- migrations
|   +-- 1_initial_migration.js
|   +-- 2_deploy_contracts.js 
| 
+-- src
|   +-- index.html
|   +-- style.css
|   +-- script.js
|   +-- favicon.ico
|   
|   +-- App.js
|   +-- App.css
|   +-- index.css
|   +-- index.js
+-- test
|   +-- ether_trust.js   
|
```

**Contract**

The contract is deployed and verified on the Ropsten testnet at `0x8336Ea7421e9CE9423De31346F94B0CC8ff2261E` [URL](https://ropsten.etherscan.io/address/0x8336ea7421e9ce9423de31346f94b0cc8ff2261e#code)

**Dependencies**

To run the DApp in a local environment, the following dependencies are required:
* Truffle v5.4.17
  * Truffle: ``npm i -g truffle``
  * HDWallet provider:  ``npm i -g @truffle/hdwallet-provider``
  * Ganache-cli: ``npm i -g ganache-cli``
* Web3
  * web3js: ``npm i -g web3``
  * Metamask: ``npm i -g @metamask/detect-provider``
* Utils
  * .env file: ``npm i -g dotenv``

 **Deployment and testing** 
 1. Clone the project.  
 `git clone https://github.com/ndehouche/blockchain-developer-bootcamp-final-project.git`   
 2. Local testing (port 8545):  `ganache-cli`, and in a new console: `truffle test`
 3. Local deployment (port 8545): `ganache-cli`, and in a new console: `truffle migrate`
 4. Ropsten deployment: Replace the content of the `.env` file with your own infura API key and mnemonic, then `truffle migrate --network rinkeby --reset` 


  
**Smart Contract Unit Tests**
 The following test are performed:
1. Contracts are deployed.
2. Accounts[0] should be able to create a new will with value 20wei, reward 1wei, and maturity 1 second, with accounts[1] as beneficiary and accounts[0] as testator.
3. Accounts[0] should be able to change the value of the will to 10wei.
4. Accounts[2] should NOT be be able to change the value of accounts[1]'s will.
5. After waiting for its maturity, accounts[2] should be able to execute the previous will.
6. Accounts[0] should be able to create a new will, then cancel it.


