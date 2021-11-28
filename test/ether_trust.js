const EtherTrust = artifacts.require("EtherTrust");
require('truffle-test-utils').init();
let etInstance;
var Wills;
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

contract("EtherTrust", function ( accounts ) {
  it("should state that contracts are deployed", async function () {
    await EtherTrust.deployed();
    return assert.isTrue(true);
  });

  
  beforeEach(async () => {
    etInstance = await EtherTrust.deployed();
  });
  
  it("accounts[0] should be able to create a new will with value 20wei, reward 1wei, and maturity 1 second, with accounts[1] as beneficiary and accounts[0] as testator", async () => {
   
    await etInstance.createWill(1,1,accounts[1],{from: accounts[0], to:etInstance.address, value:21});
    Wills = await etInstance.getWills(accounts[0]);
    return assert.isTrue(Wills[0].value==20 && Wills[0].reward==1 && Wills[0].testator==accounts[0]&& Wills[0].beneficiary==accounts[1]);
    
    });

  it("accounts[0] should be able to change the value of the will to 10wei", async () => {
   
      await etInstance.changeValue(0,10,{from: accounts[0], to:etInstance.address});
      Wills = await etInstance.getWills(accounts[0]);
      return assert.isTrue(Wills[0].value==10);
      
      });

  it("accounts[2] should NOT be be able to change the value of accounts[1]'s will", async () => {
    try {
        await etInstance.changeValue(0,1,{from: accounts[1], to:etInstance.address});}
        catch(err) {
          // Everything is alright
        }
        Wills = await etInstance.getWills(accounts[0]);
        return assert.isTrue(Wills[0].value==10);
        
        });

  


  it("After waiting 2 seconds (to be safe) accounts[2] should be able to execute the previous will", async () => {
    
    let account1Before=await web3.eth.getBalance(accounts[1]); 
    await timeout(2000);
    let WillLengthBefore=Wills.length;
    await etInstance.executeWill(accounts[0], 0, {from: accounts[2], to:etInstance.address});
    Wills = await etInstance.getWills(accounts[0]);
   
    return assert.isTrue(Wills.length==WillLengthBefore-1);
    });


    it("accounts[0] should be able to create a new will, then cancel it", async () => {
    
      await etInstance.createWill(1,1,accounts[1],{from: accounts[0], to:etInstance.address, value:21});
      Wills = await etInstance.getWills(accounts[0]);
      let numBefore=Wills.length;
      await etInstance.cancelWill(0,{from: accounts[0], to:etInstance.address});
      Wills = await etInstance.getWills(accounts[0]);
      let numAfter=Wills.length;
      return assert.isTrue(numBefore==1 && numAfter==0);


      });








  });







