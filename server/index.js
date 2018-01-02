const express = require('express');
const path = require('path');
const compression = require('compression');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);

const WebSocket = require('ws');

const ws = new WebSocket('wss://api.kcoin.club/');



const userApi = require('./api/user');
const walletApi=require('./api/WalletApi');
const User = require('./models/User');
const app = express();
const port = process.env.PORT || 8080;


app.use(express.static(__dirname + '/dist'));
dotenv.load({ path: '.env.example' });
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true,
    clear_interval: 3600
  })
}));
app.use(passport.initialize());
app.use(passport.session());



/*ws.onopen = function () {
  let data={
  "type": "transaction",
  "data": {
    "inputs":[
      {
        "unlockScript":"PUB 2d2d2d2d2d424547494e205055424c4943204b45592d2d2d2d2d0a4d4947664d413047435371475349623344514542415155414134474e4144434269514b426751446e34454a64655672556e69576774624856754f65562b79637a0a30754f334236483959564b6a7569704b43355a474964586259486a7331444d33566f7a2f7a302f52733073505a6c6736704d6e6d504857766e617173666c75680a6e5a6f58676d4f6f50497870715a7854707346526c35646a344d2f6736674569373739786e51434558773237657735496a6565364931646e556535426e5150470a6d345a727471346c304c56306538576b33774944415141420a2d2d2d2d2d454e44205055424c4943204b45592d2d2d2d2d0a",
        "referencedOutputHash":"5eb9cbb059c6b5a9124921ac4363044551dfb02cee4854fe62ca0b4830e1c6ed",
        "referencedOutputIndex":0
      }
     ],
    "outputs":[
      {
        "value":12,
        "lockScript":"ADD c58cfc88a918f50f9589558f6210d470f88c509cdf09a0c5fc881f20fd09397c"
      }
     ],
     "version":1
    }
  }
  ws.send(JSON.stringify(data));
};*/

ws.onopen = function () {
    console.log('connected');
};

ws.onmessage = function (data) {
    console.log('incoming data', data)
};

ws.onerror = function (error) {
  console.log('Error Logged: ' + error); //log errors
};

app.use('/api/user', userApi);
app.use('/api/wallet',walletApi);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});



app.listen(port, () => {
  console.log('Listening on port ' + port);
});