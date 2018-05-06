pragma solidity ^0.4.11;

import './StandardToken.sol';


contract standardTokenContract is StandardToken{

  //Required to Instantiate nummber of tokens and give creator all the tokens
  function standardTokenContract(){
    totalSupply_ = 100000000;
    balances[msg.sender] = totalSupply();
  }


}
