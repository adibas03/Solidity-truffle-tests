//Get needed contracts
var safeMath = artifacts.require("./safeMath.sol");

//SafeMAth Test
    describe('1. SafeMath Test:: ', function(){

      var sMath,
      minUint = 1.157920892373162e+77;

      it ("Should deploy test safeMath", function (done) {
        safeMath.new()
        .then(function(inst){
          sMath = inst.contract;
          assert.notEqual(sMath.address, null, "Test SafeMath not successfully deployed");
          done();
        })
      });

      describe('Subtraction::',function(){

          it ("Should fail Subtraction - From Zero", function (done) {
              sMath.sub.call(0,1,function(e,r){
                assert.notEqual(e, null, "1 subtracted from 0 (spill over)");
                done();
              });
          });

          it ("Should fail Subtraction - Minus", function (done) {
              sMath.sub.call(0,-1,function(e,r){
                assert.notEqual(e, null, "-1 subtracted from 0 ");
                done();
              });
          });

          it ("Should successfully Subtract", function (done) {
              return sMath.sub.call(10,0,function(e,r){
                assert.equal(e, null, "0 Not subtracted from 10");
                assert.equal(Number(r) , 10 , "10 minus 0 returned: "+Number(r));
                done();
              });
          });

          it ("Should successfully Subtract - Minus", function (done) {
              sMath.sub.call(-1, 0,function(e,r){
                assert.equal(e, null, "0 Not subtracted from to -1");
                done();
              });
          });

      });

      describe('Addition::',function(){
          it ("Should fail Addition - Minus", function (done) {
              sMath.add.call(0,-1,function(e,r){
                assert.notEqual(e, null, "-1 Added to 0 (overflow)");
                assert.equal(Number(r) > 0, false, "0 plus -1 returned "+Number(r) );
                done();
              });
          });

          it("Should successfully Add - Zero to Minus", function (done) {
              return sMath.add.call(-1,0,function(e,r){
                assert.equal(e, null, "0 Not added to -1");
                assert.equal(Number(r) , minUint , "-1 plus 0 returned: "+Number(r));
                done();
              });
          });

          it("Should fail Addition - +int to Minus (Adding to > -1 )", function (done) {
              return sMath.add.call(1,-1,function(e,r){
                assert.notEqual(e, null, "-1 added to 1 (+ result of + & - addition)");
                done();
              });
          });

          it("Should successfully Add", function (done) {
              return sMath.add.call(1,1,function(e,r){
                assert.equal(e, null, "1 Not added to 1");
                assert.equal(Number(r) , 2 , "1 plus 1 returned: "+Number(r));
                done();
              });
          });

      });

      describe('Division::',function(){
          it ("Should fail Division - Zero division", function (done) {
              sMath.div.call(1,0,function(e,r){
                assert.notEqual(e, null, "1 Divided by 0 (Infinity mess)");
                done();
              });
          });

          it("Should successfully Divide - Divide Zero", function (done) {
              sMath.div.call(0,1,function(e,r){
                assert.equal(e, null, "0 Not divided by 1");
                assert.equal(Number(r), 0, "0 divided by 1 returned "+ Number(r));
                done();
              });
          });

          it("Should successfully Divide - Negative division", function (done) {
              return sMath.div.call(10,-1,function(e,r){
                assert.equal(e, null, "10 Not divided by -1");
                assert.equal(Number(r) , 0 , "10 divided by -1 returned: "+Number(r));
                done();
              });
          });

          it("Should successfully Divide - Divide negative", function (done) {
              return sMath.div.call(-5,1,function(e,r){
                assert.equal(e, null, "-5 Not divided by 1");
                assert.equal(Number(r) , minUint , "-5 divided by 1 returned: "+Number(r));
                done();
              });
          });

      });

      describe('Multiplication::',function(){
          it ("Should successfully Multiply - Zero multiplication", function (done) {
              sMath.mul.call(1,0,function(e,r){
                assert.equal(e, null, "1 not multiplied by 0");
                assert.equal(Number(r) , 0 , "1 multiplied by 0 returned: "+Number(r));
                done();
              });
          });

          it("Should successfully Multiply - Multiply Zero", function (done) {
              sMath.mul.call(0,1,function(e,r){
                assert.equal(e, null, "0 not multiplied by 0");
                assert.equal(Number(r), 0, "0 multiplied by 1 returned "+ Number(r));
                done();
              });
          });

          it("Should successfully Multiply - Negative multiplication to 1", function (done) {
              return sMath.mul.call(1,-10,function(e,r){
                assert.equal(e, null, "1 not multiplied by -10");
                assert.equal(Number(r) , minUint , "1 multiplied by -10 returned: "+Number(r));
                done();
              });
          });

          it("Should Fail to Multiply - Negative multiplication to >1", function (done) {
              return sMath.mul.call(2,-2,function(e,r){
                assert.notEqual(e, null, "2 multiplied by  -1");
                done();
              });
          });

      });

    });
