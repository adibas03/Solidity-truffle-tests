var safeMath = artifacts.require('./safeMathContract.sol');
var SafeMath = artifacts.require('./SafeMath.sol');
var Owned = artifacts.require('./ownedContract.sol');
var Ownable = artifacts.require('./Ownable.sol');

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath,[safeMath] );
  deployer.deploy(Ownable);
  deployer.link(Ownable,[Owned] );
};
