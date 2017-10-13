var safeMath = artifacts.require('safeMath.sol');
var Owned = artifacts.require('Owned.sol');

module.exports = function(deployer) {
  delpoyer.deploy(safeMath);
  delpoyer.deploy(Owned);
};
