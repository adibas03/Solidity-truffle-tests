pragma solidity ^0.4.11;

/**
 * @title SafeMath Test contract
 * @dev Contract to test functionality of safeMath library
 */
import "./SafeMath.sol";//Import safeMAth library or contract containing safemath library

contract safeMath {
  //SafeMath SafeMathLib = SafeMath;

  function mul(uint256 a, uint256 b) constant returns (uint256) {
    return SafeMath.mul(a,b);
  }

  function div(uint256 a, uint256 b) constant returns (uint256) {
    return SafeMath.div(a,b);
  }

  function sub(uint256 a, uint256 b) constant returns (uint256) {
    return SafeMath.sub(a,b);
  }

  function add(uint256 a, uint256 b) constant returns (uint256) {
    return SafeMath.add(a,b);
  }
}
