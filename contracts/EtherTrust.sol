// SPDX-License-Identifier: CC-BY-SA-4.0
pragma solidity ^0.8.0;
/**
* @title EtherTrust
* @author Nassim Dehouche
* @notice This contract can create, modify and execute wills in ethereum
* @dev All function calls are currently implemented without side effects
*/
import "./Pausable.sol";
import "./ReentrancyGuard.sol";
import "./Ownable.sol";


contract EtherTrust is Ownable, Pausable, ReentrancyGuard  {
/**
* @dev SafeMath is generally not needed starting with Solidity 0.8, since the compiler now has built in overflow checking.
*/

event willCreated(address _testator, uint _index); // @dev Will creation event
event willUpdated(address _testator, uint _index); // @dev Will update event
event willCancelled(address _testator, uint _index); // @dev Will cancellation event
event logAlive(address _testator); // @dev Sign of life event
event willExecuted(address _testator, uint _index, address _beneficiary); // @dev Will execution event
event logPayment(address _sender, address _receiver, uint _value); // @dev Payment log
event logFailedPayment(address _sender, address _receiver, uint _value); // @dev Payment failure log


modifier isNotZero(uint _value){ // @dev Wills cannot have value zero
     require(_value>0); 
    _;   
}


modifier isTestator(address _caller) {  // @dev Checks that message sender owns the will
    require(msg.sender==wills[msg.sender][0].testator); 
    _;
  }
modifier isBeneficiary(address _caller) { // @dev Checks that message sender is beneficiary, might be useful later
    require(msg.sender==wills[msg.sender][0].beneficiary); 
    _;
  }
  
modifier isMature(address _testator, uint _id){ // @dev Checks that a will reached maturity
     require(block.timestamp>lastAlive[_testator]+wills[_testator][_id].maturity); 
    _;   
    
}

modifier isValidUpdate(uint _newValue, uint _newReward) { // @dev Checks that a change to a will is valid
    require(msg.sender==wills[msg.sender][0].testator); 
    _;
  }

 struct Will{ // @dev The will struct
  uint value;
  uint reward;
  uint maturity;
  address payable testator;
  address payable beneficiary;
  }

mapping(address => Will[]) public wills; // @dev Links testators with an array of their wills
mapping(address => uint) public lastAlive; // @dev Last time a testator gave sign of life
address[] public testators; // @dev Keeps track of all testators to list mature will on front-end
uint public numTestators; // @dev Keeps track of all testators to list mature will on front-end

receive() external payable { 
}

fallback() external payable {
require(msg.data.length == 0); 
emit logPayment(msg.sender, address(this), msg.value);
//@dev Check data length in fallback functions
//From https://github.com/ConsenSys/smart-contract-best-practices/blob/master/docs/recommendations.md:
//Since the fallback functions is not only called for plain ether transfers (without data) but also when no other function matches, 
//you should check that the data is empty if the fallback function is intended to be used only for the purpose of logging received Ether. 
//Otherwise, callers will not notice if your contract is used incorrectly and functions that do not exist are called
}

  
function createWill(uint _reward, uint _maturity,  address payable _beneficiary) // @dev Will creation function
payable 
public  
isNotZero(msg.value)
whenNotPaused
returns (uint _id) { // @dev Return the id of the created will among all the wills of a testator
require(_reward <= msg.value, "Insufficient funds sent.");    
emit logPayment(msg.sender, address(this), msg.value);


if (lastAlive[msg.sender]==0){ // @dev Checks whether this is a new testator
testators.push(msg.sender);   
numTestators+=1;
}


lastAlive[msg.sender]= block.timestamp; //@dev Updates the testator's date of last sign of life
emit logAlive(msg.sender);

_id= wills[msg.sender].length;
wills[msg.sender].push(Will({
value: msg.value-_reward, 
reward:_reward,
maturity: _maturity, 
testator: payable(msg.sender), 
beneficiary: _beneficiary
}));
}

function IAmAlive() //@dev Updates the testator's date of last sign of life
public 
returns (bool _alive)
{
require(lastAlive[msg.sender]!=0);
emit logAlive(msg.sender);
_alive=true;
lastAlive[msg.sender]= block.timestamp;

}

function changeReward(uint _id, uint _decrease) 
//@dev Changes the reward associated with a will, decrease will have a non-zero value if the testator 
//wants to decrease the reward. Otherwise, it is increased.
payable
public 
isTestator(msg.sender)
returns (bool _updated)
{
    
lastAlive[msg.sender]= block.timestamp;  //@dev Updates the testator's date of last sign of life
emit logAlive(msg.sender);
emit willUpdated(msg.sender, _id);
_updated=true;   

if (msg.value>0){
wills[msg.sender][_id].reward+=msg.value;   
emit logPayment(msg.sender, address(this), msg.value);
}
else if (_decrease>0 && _decrease< wills[msg.sender][_id].reward){
wills[msg.sender][_id].reward-=_decrease;
(bool sent, ) = msg.sender.call{value: _decrease}("");
        require(sent, "Failed to send Ether");
    emit logPayment(address(this), msg.sender, _decrease);
    
}
}

function changeValue(uint _id, uint _decrease) 
//@dev Changes the value associated with a will, decrease will have a non-zero value if the testator 
//wants to decrease the reward. Otherwise, it is increased.
payable
public 
isTestator(msg.sender)
returns (bool _updated)
{
emit logAlive(msg.sender);
emit willUpdated(msg.sender, _id);
_updated=true;   

if (msg.value>0){
wills[msg.sender][_id].value+=msg.value;   
emit logPayment(msg.sender, address(this), msg.value);
}
else if (_decrease>0 && _decrease< wills[msg.sender][_id].value){
wills[msg.sender][_id].value-=_decrease;
(bool sent, ) = msg.sender.call{value: _decrease}("");
        require(sent, "Failed to send Ether");
    emit logPayment(address(this), msg.sender, _decrease);
    
}
}





function changeBeneficiary(uint _id, address payable _beneficiary) 
//@dev Changes the beneficiary associated with a will.
public 
isTestator(msg.sender)
returns (bool _updated)
{
require(wills[msg.sender][_id].beneficiary!=_beneficiary);
lastAlive[msg.sender]= block.timestamp;
emit logAlive(msg.sender);
wills[msg.sender][_id].beneficiary=_beneficiary;
emit willUpdated(msg.sender, _id);
_updated=true;    
}

function changeMaturity(uint _id, uint _maturity) 
//@dev Changes the maturity associated with a will.
public 
isTestator(msg.sender)
returns (bool _updated)
{
lastAlive[msg.sender]= block.timestamp;
emit logAlive(msg.sender);
wills[msg.sender][_id].maturity=_maturity;
emit willUpdated(msg.sender, _id);
_updated=true;    
}






function cancelWill(uint _id) 
//@dev Cancels a will
public 
isTestator(msg.sender)
returns (bool _cancelled)
{
(bool sent, ) = msg.sender.call{value: wills[msg.sender][_id].value}("");
        require(sent, "Failed to send Ether");
    emit logPayment(address(this), msg.sender, wills[msg.sender][_id].value); //@dev Refunds testator
    
emit willCancelled(msg.sender, _id);
_cancelled=true;
//@dev Rearrange indexing of the testator's wills array
wills[msg.sender][_id] = wills[msg.sender][wills[msg.sender].length - 1];
delete wills[msg.sender][wills[msg.sender].length - 1];
wills[msg.sender].pop();



}


function executeWill(address _testator, uint _id) 
//@dev Executes a will if mature
public 
isMature(_testator,_id)
nonReentrant()
whenNotPaused
returns (bool _executed)
{
(bool sent1, ) = wills[_testator][_id].beneficiary.call{value: wills[_testator][_id].value}("");
        require(sent1, "Failed to send Ether");
    emit logPayment(address(this), wills[_testator][_id].beneficiary, wills[_testator][_id].value);
    
(bool sent2, ) = msg.sender.call{value: wills[_testator][_id].reward}("");
        require(sent2, "Failed to send Ether");
    emit logPayment(address(this), msg.sender, wills[_testator][_id].reward);

_executed=sent1&&sent2;
wills[_testator][_id] = wills[_testator][wills[_testator].length - 1];
delete wills[_testator][wills[_testator].length - 1];
wills[_testator].pop();    
}


function getWills(address _testator)  public  view  returns(Will[] memory ) {
//@dev Get all wills created by an address to display front-end
      return wills[_testator];
}

}