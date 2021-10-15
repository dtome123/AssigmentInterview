var express = require('express');
var router = express.Router();


const WebSocket = require('ws');
const dotenv = require('dotenv').config();


const { randomBytes } = require('crypto')
const sha256 =require('sha256')
const  secp = require("noble-secp256k1") ;

/* GET users listing. */
router.get('/generateKey', function(req, res, next) {
  let privateKey
  privateKey = randomBytes(32)
  let publicKey = secp.getPublicKey(privateKey);
  res.json(
    {
      private_key:privateKey.toString('hex'),
      public_key:Buffer.from(publicKey, 'hex').toString('hex'),
    }
  );
});
router.get('/getPublicKey', function(req, res, next) {
  try {
    res.json({
      status: "success",
      publicKey: secp.getPublicKey(req.query.privateKey),
    })  
  } catch (error) {
    res.json({
      status: "failed",
      message: "Private key is invalid",
    })
  }
  
})
router.get('/signature', function(req, res, next) {
  
  (async () => {
    let privateKey = req.query.privKey
    let msg = sha256(req.query.message)
    const signature =await secp.sign(msg, privateKey);
    res.send(signature)
  })()
})

router.get('/verify', function(req, res, next) {
  let msg = sha256(req.query.message)
  let signature = req.query.signature
  const publicKey = req.query.pubKey
  
  try {
    const isSigned = secp.verify(signature, msg, publicKey);  
    res.send(isSigned)
  } catch (error) {
    res.send("signature or public key is not valid")
  }
})
router.get('/getTransactionERC20', function(req, res, next) {
  
  var json ;

  const ws = new WebSocket(`wss://${process.env.ENDPOINTS}.infura.io/ws/v3/${process.env.INFURA_API_KEY}`);

  let transHash= req.query.transactionHash
  ws.on('open', function open() {
    ws.send(`{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params": ["${transHash}"],"id":1}`);
  });
  ws.on('message', function incoming(data) {
    var obj = JSON.parse(data);
    //console.log(obj)
    if(obj.error!=null)
    {
      json ={
        status:"failed",
        message:`Transaction is invalid`
      }
    }
    else if(obj.result==null){
      json ={
          status:"failed",
          message:`Not found transaction: "${transHash}"`
        } 
    }
    else{
      
      let logs = obj.result.logs;
     
      var hash=obj.result.transactionHash;
      var blockHeight= parseInt(obj.result.blockNumber);
      var contractAddress= obj.result.to;

      if(logs.length!=0){
        var transfers=[];
        
        logs.forEach(element => {
          if(element.topics[0]=="0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"){
            var jsonObject = new Object();
            jsonObject.from=element.topics[1].replace("0x000000000000000000000000","0x");
            jsonObject.to=element.topics[2].replace("0x000000000000000000000000","0x");
            jsonObject.amount=parseInt(element.data);
            transfers.push(jsonObject);
          }
        });
        json= {
          transfer:transfers,
          hash:hash,
          blockHeight:blockHeight,
          contractAddress:contractAddress
        }
      }
      else{
        json ={
          status:"failed",
          message:`${transHash} don't have log of ERC20 transaction`
        } 
      }
    }
    
    res.send(json);
    ws.close()
  });
})

module.exports = router;
