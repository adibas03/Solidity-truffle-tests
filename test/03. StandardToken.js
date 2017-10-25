var StandardToken = artifacts.require('./standardTokenContract.sol');// Import contract of StandarTOken type

describe('3. StandardToken :: ', function () {
    const _1ether = 1e+18;
    var contract,web3,Me,accounts;

    it('should deploy the contract', function (done) {
        StandardToken.new()
        .then(function(inst){
            contract = inst.contract;
            web3 = inst.constructor.web3;
            accounts = inst.constructor.web3.eth.accounts;
            Me = accounts[0];

            assert.notEqual(contract.address, null, 'Contract not successfully deployed');
            done();
        });
    });

    describe('Allocate Tokens ::',function(){

        it('Should fail to allocate Negative value tokens (Underflow)', function(done){
            var oldallowance = Number(contract.allowance.call(Me,accounts[1]) );

            contract.approve(accounts[1],-1,{from:Me},
              function(err,res){
               var newallowance = Number(contract.allowance.call(Me,accounts[1]) );
               assert.equal(err , null , 'Allocated Negative value tokens');
               assert.equal(newallowance , -1 , 'Allocated '+newallowance+' instead of -1');
               done();
            })
        })

        it('Should Restore allocated value to 0', function(done){
          var oldallowance = Number(contract.allowance.call(Me,accounts[1]) );

          contract.approve(accounts[1],0,{from:Me},
            function(err,res){
             var newallowance = Number(contract.allowance.call(Me,accounts[1]) );
             assert.equal(newallowance > oldallowance , false , 'Failed to allocate 0');
             assert.equal(newallowance , 0 , 'Allocated '+newallowance+' instead of 0');
             done();
          })
        });

        it('Should allocate Non-existent tokens', function(done){
            var oldallowance = Number(contract.allowance.call(accounts[1],accounts[2]) );

            contract.approve(accounts[2],10,{from:accounts[1]},
              function(err,res){
               var newallowance = Number(contract.allowance.call(accounts[1],accounts[2]) );
               assert.equal(newallowance > oldallowance , true , 'Failed to allocated tokens');
               assert.equal(newallowance , 10 , 'Allocated '+newallowance+' instead of 10');
               done();
            })
        })

        it('Should Fail to allocate new value without updating allocation to 0', function(done){
            var oldallowance = Number(contract.allowance.call(accounts[1],accounts[2]) );

            contract.approve(accounts[2],10+oldallowance,{from:accounts[1]},
              function(err,res){
               var newallowance = Number(contract.allowance.call(accounts[1],accounts[2]) );
               assert.notEqual(err , null, 'Allocated '+ newallowance+ ' from previous allocation of '+oldallowance);
               done();
            })
        })

        it('Should fail to spend allocated Non-existent tokens', function(done){
          var allowance = Number(contract.allowance.call(accounts[1],accounts[2]) );

          contract.transferFrom(accounts[1],accounts[3],allowance,{from:accounts[2]},
            function(err,res){
             assert.notEqual(err , null, 'Transfer Non-existent coins via Proxy');
             done();
          })
        })

        it('Should fail to spend Non-allocated tokens', function(done){
          var allowance = Number(contract.allowance.call(Me,accounts[2]) );
          var balance = Number(contract.balanceOf.call(Me) );

          contract.transferFrom(Me,accounts[1],10,{from:accounts[2]},
            function(err,res){
             assert.notEqual(err , null, 'Transfer Non-allocated coins');
             done();
          })
        })

        it('Should fail to raise allocation by Negative value (possibly underflow)', function(done){
          var allowance = Number(contract.allowance.call(accounts[2], accounts[3]) );

          contract.increaseApproval(accounts[3],-1,{from:accounts[2]},
            function(err,res){
              var newallowance = Number(contract.allowance.call(accounts[2], accounts[3]) );
             assert.notEqual(err , null, 'Increased allocation by negative value: from '+allowance+' to '+newallowance);
             done();
          })
        })

        it('Should fail to reduce allocation by Negative value', function(done){
          var allowance = Number(contract.allowance.call(accounts[2], accounts[3]) );

          contract.decreaseApproval(accounts[3] ,-1,{from:accounts[2]},
            function(err,res){
              var newallowance = Number(contract.allowance.call(accounts[2], accounts[3]) );
             assert.notEqual(err , null, 'Reduced allocation by negative value: from '+allowance+' to '+newallowance);
             done();
          })
        })

        it('Should successfully raise allocation', function(done){
          var allowance = Number(contract.allowance.call(accounts[2], accounts[3]) );

          contract.increaseApproval(accounts[3],10,{from:accounts[2]},
            function(err,res){
              var newallowance = Number(contract.allowance.call(accounts[2], accounts[3]) );
              assert.equal(err , null, 'Failed to raise allowance');
              assert.equal(newallowance , allowance+10, 'Raised allocation by wrong value from '+allowance+' to '+newallowance);
              done();
          })
        })

        it('Should successfully reduce allocation', function(done){
          var allowance = Number(contract.allowance.call(accounts[2], accounts[3]) );

          contract.decreaseApproval(accounts[3],5,{from:accounts[2]},
            function(err,res){
             var newallowance = Number(contract.allowance.call(accounts[2], accounts[3]) );
             assert.equal(err , null, 'Failed to rareduce allowance');
             assert.equal(newallowance , allowance-5, 'Reduced allocation by wrong value from '+allowance+' to '+newallowance);
             done();
          })
        })

    })

    describe('Transfer Tokens ::',function(){

        it('Should fail to spend Negative token value from one rogue address to another (Underflow)',function(done){

            var oldbalance = Number(contract.balanceOf.call(accounts[3]) ),
            oldroguebalance = Number(contract.balanceOf.call(accounts[2]) );

            contract.transfer(accounts[3],-1,{from:accounts[2]},
              function(err,res){
               var newbalance = Number(contract.balanceOf.call(accounts[3]) );
               var roguebalance = Number(contract.balanceOf.call(accounts[2]) );
               assert.equal(oldroguebalance , roguebalance, 'Sending account was reduced by -1');
               assert.equal(oldbalance , newbalance, 'Receiving account was increased by -1');
               done();
            })
        })

        it('Should fail to spend Negative token value from one rogue address to a real address (Underflow)',function(done){

            var oldbalance = Number(contract.balanceOf.call(Me) ),
            oldroguebalance = Number(contract.balanceOf.call(accounts[2]) );

            contract.transfer(Me,-1,{from:accounts[2]},
              function(err,res){
               var newbalance = Number(contract.balanceOf.call(Me) );
               var roguebalance = Number(contract.balanceOf.call(accounts[2]) );
               assert.equal(oldroguebalance , roguebalance, 'Sending account was reduced by -1');
               assert.equal(oldbalance , newbalance, 'Receiving account was increased by -1');
               done();
            })
        })

        it('Should fail to spend more token value than balance',function(done){

            var oldbalance = Number(contract.balanceOf.call(accounts[3]) ),
            oldroguebalance = Number(contract.balanceOf.call(accounts[2]) );

            contract.transfer(accounts[2],1,{from:Me},
              function(err,res){
               var newbalance = Number(contract.balanceOf.call(accounts[3]) );
               var roguebalance = Number(contract.balanceOf.call(accounts[2]) );
               assert.equal(oldbalance , newbalance, 'Receiving account was credited 1 token from the cthulhu');
               done();
            })
        })

        it('Should successfully spend tokens',function(done){

            var oldbalance = Number(contract.balanceOf.call(accounts[2]) );

            contract.transfer(accounts[2],10,{from:Me},
              function(err,res){
               var newbalance = Number(contract.balanceOf.call(accounts[2]) );
               assert.equal(newbalance > oldbalance ,true , 'Address not credited with token');
               assert.equal(newbalance , oldbalance+10 , 'Spent '+newbalance+ ' instead of 10');
               done();
            })
        })
    })


  });
