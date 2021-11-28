//Metamask encrypt/decrypthttps://docs.metamask.io/guide/rpc-api.html#other-rpc-methods

function collapsibles(){



var coll = document.getElementsByClassName("collapsible");
 
    for (var i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        for (var j = 0; j < coll.length; j++) {
       
            if (coll[j]!=this){
             var other = coll[j].nextElementSibling;
             other.style.display = "none";}
        }

        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
          
        } else {
          content.style.display = "block";
          
        }
  
        


      });
    }

}

function addRows(name, _testator, id, _reward) {
  var table=document.getElementById(name);
      row = table.insertRow(-1);
      
      cell1 = row.insertCell(0),
      cell2 = row.insertCell(1);
      cell3 = row.insertCell(2);

  cell1.innerHTML = _testator;
  cell2.innerHTML = id;
  cell3.innerHTML = _reward;
}
function DeleteRows(name) {
  var table=document.getElementById(name);
        var rowCount = table.rows.length;
        for (var i = rowCount - 1; i > 0; i--) {
            table.deleteRow(i);
        }
    }
async function checkConnected  (){
  accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length == 0){
    console.log("User is not logged in to MetaMask");
    document.getElementById('div-interact').style.display = "none";
     document.getElementById('wallet-button').innerHTML="🦊 Connect Wallet";
    this.alert("Please connect to Metamask");
}
}



var accounts=[];
const contractAddress='0x3F781cBEa35f91bFb5e4DeDB4b3835aDf4E55f4D';
const contractABI=[
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "Pause",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "Unpause",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_testator",
          "type": "address"
        }
      ],
      "name": "logAlive",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "logFailedPayment",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "logPayment",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_testator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "willCancelled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_testator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "willCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_testator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_beneficiary",
          "type": "address"
        }
      ],
      "name": "willExecuted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_testator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "willUpdated",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "fallback",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "lastAlive",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "numTestators",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "testators",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "wills",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reward",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "maturity",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "testator",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "beneficiary",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "stateMutability": "payable",
      "type": "receive",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_reward",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maturity",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "_beneficiary",
          "type": "address"
        }
      ],
      "name": "createWill",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "IAmAlive",
      "outputs": [
        {
          "internalType": "bool",
          "name": "_alive",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_decrease",
          "type": "uint256"
        }
      ],
      "name": "changeReward",
      "outputs": [
        {
          "internalType": "bool",
          "name": "_updated",
          "type": "bool"
        }
      ],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_decrease",
          "type": "uint256"
        }
      ],
      "name": "changeValue",
      "outputs": [
        {
          "internalType": "bool",
          "name": "_updated",
          "type": "bool"
        }
      ],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "_beneficiary",
          "type": "address"
        }
      ],
      "name": "changeBeneficiary",
      "outputs": [
        {
          "internalType": "bool",
          "name": "_updated",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maturity",
          "type": "uint256"
        }
      ],
      "name": "changeMaturity",
      "outputs": [
        {
          "internalType": "bool",
          "name": "_updated",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "cancelWill",
      "outputs": [
        {
          "internalType": "bool",
          "name": "_cancelled",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_testator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "executeWill",
      "outputs": [
        {
          "internalType": "bool",
          "name": "_executed",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_testator",
          "type": "address"
        }
      ],
      "name": "getWills",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "reward",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maturity",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "testator",
              "type": "address"
            },
            {
              "internalType": "address payable",
              "name": "beneficiary",
              "type": "address"
            }
          ],
          "internalType": "struct EtherTrust.Will[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];

   var web3=new Web3(window.ethereum);
    const EtherTrust= new web3.eth.Contract(contractABI, contractAddress);
    EtherTrust.setProvider(window.ethereum)

async function checkNetwork() {
  let chainId = await ethereum.request({ method: 'eth_chainId' });
  
  if (chainId!=='0x3'){
  this.alert("This dapp only works on the Ropsten testnet for now. Please approve the switch to Ropsten.");
  console.log(chainId);
  await window.ethereum.request({
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0x3' }], // chainId must be in hexadecimal numbers
  });

}
}


//Need to handle when user disconnects all metamask accounts
async function connectWallet(){
  
    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length == 0){
    console.log("User is not logged in to MetaMask");
    document.getElementById('div-interact').style.display = "none";
    this.alert("Please connect to Metamask");
}
    else{    
   
  document.getElementById('wallet-button').style.display="none";
    document.getElementById('wallet-button').innerHTML="🦊 Connected";
    document.getElementById('div-interact').style.display = "block";
    document.getElementById('div-interact2').style.display = "block";
     document.getElementById('user').innerHTML=accounts[0].substring(0, 5)+"..."+accounts[0].substr(accounts[0].length-4,4);
    await checkNetwork(); 
    //Create a will
    const create=document.getElementById('create-button');
    create.onclick = async ()=> {
    checkConnected();  
    await checkNetwork(); 
    _reward=document.getElementById("reward").value; 
    _maturity=document.getElementById("maturity").value; 
    _beneficiary=document.getElementById("beneficiary").value;   
    _amount=document.getElementById("amount").value; 
    let _value=+_amount + +_reward;
    await EtherTrust.methods.createWill(_reward,_maturity,_beneficiary).send({from: ethereum.selectedAddress, to:contractAddress, value:_value});
	   }
    const alive=document.getElementById('alive-button');
    alive.onclick = async ()=> {
    checkConnected();  
    await checkNetwork(); 
    await EtherTrust.methods.IAmAlive().send({from: ethereum.selectedAddress, to:contractAddress});
    }
     const cancel=document.getElementById('cancel-button');
    cancel.onclick = async ()=> {
    checkConnected(); 
    await checkNetwork();  
    _id=document.getElementById("id").value; 
    await EtherTrust.methods.cancelWill(_id).send({from: ethereum.selectedAddress, to:contractAddress});
    }
  const value=document.getElementById('value-button');
    value.onclick = async ()=> {
    checkConnected();  
    await checkNetwork(); 
    _id=document.getElementById("idv").value; 
    _decrease=-document.getElementById("decreasev").value; 
    if (_decrease==0){ this.alert("This amount cannot be zero.");}
    else if (_decrease>0){await EtherTrust.methods.changeValue(_id, _decrease).send({from: ethereum.selectedAddress, to:contractAddress});}
    else{await EtherTrust.methods.changeValue(_id, 0).send({from: ethereum.selectedAddress, to:contractAddress, value:-_decrease});}
    }

  const reward=document.getElementById('reward-button');
    reward.onclick = async ()=> {
    checkConnected(); 
    await checkNetwork(); 
    _id=document.getElementById("idr").value; 
    _decrease=-document.getElementById("decreaser").value; 
    if (_decrease==0){ this.alert("This amount cannot be zero.");}
    else if (_decrease>0){await EtherTrust.methods.changeReward(_id, _decrease).send({from: ethereum.selectedAddress, to:contractAddress});}
    else{await EtherTrust.methods.changeReward(_id, 0).send({from: ethereum.selectedAddress, to:contractAddress, value:-_decrease});}
    }

  const beneficiary=document.getElementById('beneficiary-button');
    beneficiary.onclick = async ()=> {
    checkConnected(); 
    await checkNetwork(); 
    _id=document.getElementById("idb").value; 
    _newBeneficiary=document.getElementById("newbeneficiary").value; 
    await EtherTrust.methods.changeBeneficiary(_id, _newBeneficiary).send({from: ethereum.selectedAddress, to:contractAddress});
    }

  const maturity=document.getElementById('maturity-button');
    maturity.onclick = async ()=> {
    checkConnected();  
    await checkNetwork(); 
    _id=document.getElementById("idm").value; 
    _newMaturity=document.getElementById("newmaturity").value; 
    await EtherTrust.methods.changeMaturity(_id, _newMaturity).send({from: ethereum.selectedAddress, to:contractAddress});
    }
  
  const execute=document.getElementById('execute-button');
    execute.onclick = async ()=> {
    checkConnected();  
    await checkNetwork(); 
    _testator=document.getElementById("exectestator").value; 
    _id=document.getElementById("ide").value; 
    await EtherTrust.methods.executeWill(_testator, _id).send({from: ethereum.selectedAddress, to:contractAddress});
    }


    const yourWills=document.getElementById('wills-button');
    yourWills.onclick = async ()=> {
    checkConnected(); 
    await checkNetwork();   
    
    DeleteRows('yourwillsTable');
       
   
       var testator=accounts[0];
       
       var creaDate=await EtherTrust.methods.lastAlive(testator).call();
      
      if (creaDate!=0){
       
       var wills=await EtherTrust.methods.getWills(testator).call();
       
       
        for (var j=0;j<wills.length;j++){
         
          
          //checks if will is mature
         
          //to do: check that this j corresponds to the index of the testator's will in all cases (deletion, etc.)
          addRows('yourwillsTable', wills[j][3], wills[j][0], wills[j][1]);
          

         }
     
      document.getElementById('wills-button').innerHTML="Refresh";
      document.getElementById('yourWills').style.display='block';
      
      }


    }

  const list=document.getElementById('list-button');
    list.onclick = async ()=> {
    checkConnected();  
    await checkNetwork();  
    
    EtherTrust.methods.numTestators().call(async function(err, num){
     if(!err){
   DeleteRows('willsTable');
       
     for (i=0;i<num;i++){//loops through all testators
       var testator=await EtherTrust.methods.testators(i).call();
       
       var creaDate=await EtherTrust.methods.lastAlive(testator).call();
      
       
       var wills=await EtherTrust.methods.getWills(testator).call();
       
       var now = (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp;
        for (var j=0;j<wills.length;j++){
         
          if (parseInt(now)>parseInt(creaDate)+parseInt(wills[j][2])){
          //checks if will is mature
         
          //to do: check that this j corresponds to the index of the testator's will in all cases (deletion, etc.)
          addRows('willsTable', wills[j][3], j, wills[j][1]);
          }

         }
     }
      document.getElementById('list-button').innerHTML="Refresh";
     }
      document.getElementById('willsDiv').style.display='block';


 });
    }

}
}

window.addEventListener('load', (event) => {
if (typeof window.ethereum !== 'undefined'){
        console.log('Wallet detected');
        const ethereumButton = document.getElementById('wallet-button');
        
        ethereumButton.addEventListener('click', () => {
        
        //Will Start the metamask extension
        connectWallet();

        
});
    
        
        }
        
    else{
        console.log('No Wallet')
        this.alert('You need to install an Ethereum Wallet!')
    }
collapsibles();
})


window.ethereum.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
   document.getElementById('user').innerHTML=accounts[0].substring(0, 5)+"..."+accounts[0].substr(accounts[0].length-4,4);
   
})

EtherTrust.getPastEvents('allEvents',  { fromBlock: 1}).then(results => console.log(results));
    

