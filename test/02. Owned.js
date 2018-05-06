//Get needed contracts
var Owned = artifacts.require('./ownedContract.sol');

//Ownable Test
describe('2. Owned Test:: ', function(u){
        var owned,_accounts,defaultAccount;

        it ("Should deploy test Ownable", function (done) {
          Owned.new()
          .then(function(inst){
            owned = inst.contract;
            _accounts = inst.constructor.web3.eth.accounts;
            defaultAccount = _accounts[0];
            assert.notEqual(owned.address, null, "Test Owned not successfully deployed");
            done();
          })
        });

        describe('Access Test:: ', function(){

            it ("Should fail to update owner - 0x0 new Address", function (done) {
              var _owner = owned.owner.call();
              owned.transferOwnership(0x0,{from:defaultAccount},function(e,r){
                var _newowner = owned.owner.call();
                assert.equal(_newowner, _owner, "0x0 set as owner (Black hole)");
                done();
              });
            });

            it ("Should fail to update owner - Unauthorized access", function (done) {
              var _owner = owned.owner.call();
              owned.transferOwnership(_accounts[1],{from:_accounts[1]},function(e,r){
                var _newowner = owned.owner.call();
                assert.equal(_newowner, _owner, "Unauthorized address set new owner (Backdoor)");
                done();
              });
            });

            it ("Should update owner ", function (done) {
              var _owner = owned.owner.call();
              owned.transferOwnership(_accounts[1],{from:defaultAccount},function(e,r){
                var _newowner = owned.owner.call();
                assert.equal(_newowner, _accounts[1], "Address not set to new owner (Error)");
                done();
              });
            });

            it ("Should fail to renounce owner - Unathourized access", function (done) {
              var _owner = owned.owner.call();
              owned.renounceOwnership({from:defaultAccount},function(e,r){
                var _newowner = owned.owner.call();
                assert.equal(_owner, _newowner, "Unauthorized address renounced ownerShip (Error)");
                done();
              });
            });

            it ("Should renounce owner", function (done) {
              var _owner = owned.owner.call();
              owned.renounceOwnership({from:_accounts[1]},function(e,r){
                var _newowner = owned.owner.call();
                assert.equal(e, null, "Transaction failed (Error)");
                assert.equal(0, web3.toDecimal(_newowner), `New owner set to ${_newowner} (Error)`);
                done();
              });
            });

          });

    });
