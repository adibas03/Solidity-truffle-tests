# Solidity Truffle tests

## Description
This repo provides truffle based tests which carry out different attacks on the commonly used contracts and libraries in the Space

## Dependencies
[Testrpc](https://github.com/ethereumjs/testrpc)
[Truffle](https://github.com/trufflesuite/truffle)

## Run tests
* Ensure you have  Truffle installed
* Run testrpc or any other ethereum node
* Run `truffle test` from the repo directory

## Discoveries
###### Open Zeppelin Safe Math
-  Addition:: -1 Added to 0 (overflow) : Should fail Addition - Minus:  

## Contributors
[Github contributors](https://github.com/adibas03/Solidity-truffle-tests/graphs/contributors)

To contribute, kindly create an issue to indicate what you would be working on, then create a PR once code is ready.


## Links/ Sources

* [Open Zeppelin Safe Math](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/math/SafeMath.sol)
* [Open Zeppelin Ownable](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/ownership/Ownable.sol)
