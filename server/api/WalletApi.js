const express = require('express');
const request = require('request');
const WebSocket = require('ws');
const router = express.Router();

const ws = new WebSocket('wss://api.kcoin.club/');


//get block
router.get('/blocks',(req,res) => {
  request('https://api.kcoin.club/blocks', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      return res.send(body); 
    }
  });
});

//get transactions unconfirmed
router.get('/unconfirmed-transactions',(req,res)=>{
	request('https://api.kcoin.club/unconfirmed-transactions', function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	      return res.send(body); 
	    }
	    else{
	    	return res.send(error);
	    }
  	});
});

let data={
  "type": "transaction",
  "data": {
	  "inputs":[
	    {
	      "unlockScript":"PUB 2d2d2d2d2d424547494e205055424c4943204b45592d2d2d2d2d0a4d4947664d413047435371475349623344514542415155414134474e4144434269514b426751446e34454a64655672556e69576774624856754f65562b79637a0a30754f334236483959564b6a7569704b43355a474964586259486a7331444d33566f7a2f7a302f52733073505a6c6736704d6e6d504857766e617173666c75680a6e5a6f58676d4f6f50497870715a7854707346526c35646a344d2f6736674569373739786e51434558773237657735496a6565364931646e556535426e5150470a6d345a727471346c304c56306538576b33774944415141420a2d2d2d2d2d454e44205055424c4943204b45592d2d2d2d2d0a",
	      "referencedOutputHash":"c58cfc88a918f50f9589558f6210d470f88c509cdf09a0c5fc881f20fd09397c",
	      "referencedOutputIndex":0
	    }
	   ],
	  "outputs":[
	    {
	      "value":12,
	      "lockScript":"ADD 5eb9cbb059c6b5a9124921ac4363044551dfb02cee4854fe62ca0b4830e1c6ed"
	    }
	   ],
	   "version":1
	}
}


//post send Koin
router.get('/send',(req,res)=>{
	ws.onopen = function (event) {
		ws.send(data);

  }
});


module.exports = router;