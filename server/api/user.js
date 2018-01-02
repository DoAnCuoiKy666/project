const appConfig = require('../../config.js');
const crypto = require('crypto');
const express = require('express');
const dateTime=require('node-datetime');
const dateFormat = require('dateformat');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const router = express.Router();

const _ = require('lodash');
const bitInt = require('big-integer');
const ursa = require('ursa');

const HASH_ALGORITHM = 'sha256';

const mailgun = require('mailgun-js')({
  apiKey: appConfig.mailgun.apiKey,
  domain: appConfig.mailgun.domain,
});
const passport = require('passport');
const User=require('../models/User');
require('../mongo').connect();


let generateKey = function () {
    return ursa.generatePrivateKey(1024, 65537);
};

let hash = function (data) {
    let hash = crypto.createHash(HASH_ALGORITHM);
    hash.update(data);
    return hash.digest();
};

//session
router.get('/checksession', (req, res) => {
  if (req.user) {
    return res.send(JSON.stringify(req.user));
  }
  return res.send(JSON.stringify({}));
});


//logout
router.get('/logout', (req, res) => {
  req.logout();
  return res.send(JSON.stringify(req.user));
});


//login
router.post('/login', async (req, res) => {
  const query = User.findOne({ email: req.body.email });
  const foundUser = await query.exec();
  if (foundUser) { req.body.username = foundUser.username; }
  passport.authenticate('local')(req, res, () => {
    if (req.user) {
      return res.send(JSON.stringify(req.user));
    }
    return res.send(JSON.stringify({ error: 'There was an error logging in' }));
  });
});


//create account
router.post('/register', async (req, res) => {
  const query = User.findOne({ email: req.body.email });
  const foundUser = await query.exec();

  if (foundUser) { return res.send(JSON.stringify({ error: 'Email or username already exists' })); }
  if (!foundUser) {
    const window = (new JSDOM('')).window;
    const DOMPurify = createDOMPurify(window);
    let privateKey = generateKey();
    let publicKey = privateKey.toPublicPem();
    const sanitizedBody = {
      username: DOMPurify.sanitize(req.body.username),
      email: DOMPurify.sanitize(req.body.email),
      password: req.body.password,
      privatekey:privateKey.toPrivatePem('hex'),
      publickey:publicKey.toString('hex'),
      address:hash(publicKey).toString('hex'),
      kcoin_available_balances:0,
      kcoin_actual_balance:0

    };

    const newUser = new User(sanitizedBody);
    return User.register(newUser, req.body.password, (err) => {
      if (err) {
        return res.send(JSON.stringify({ error: err.message }));
      }
      return passport.authenticate('local')(req, res, () => {
        if (req.user) {
          return res.send(JSON.stringify(req.user));
        }
        return res.send(JSON.stringify({ error: 'There was an error registering the user' }));
      });
    });
  }
  return res.send(JSON.stringify({ error: 'There was an error registering the user' }));
});


//save password then reset
router.post('/savepassword', async (req, res) => {
  let result;
  try {
    const query = User.findOne({ passwordReset: req.body.hash });
    const foundUser = await query.exec();
    if (foundUser) {
      foundUser.setPassword(req.body.password, (err) => {
        if (err) {
          result = res.send(JSON.stringify({ error: 'Password could not be saved. Please try again' }));
        } else {
        
          foundUser.save((error) => {
            if (error) {
              result = res.send(JSON.stringify({ error: 'Password could not be saved. Please try again' }));
            } else {
       
              result = res.send(JSON.stringify({ success: true }));
            }
          });
        }
      });
    } else {
      result = res.send(JSON.stringify({ error: 'Reset hash not found in database.' }));
    }
  } catch (err) {
    result = res.send(JSON.stringify({ error: 'There was an error connecting to the database.' }));
  }
  return result;
});



// saver hash email reset
router.post('/saveresethash', async (req, res) => {
  let result;
  try {
    const query = User.findOne({ email: req.body.email });
    const foundUser = await query.exec();
    const timeInMs = Date.now();
    const hashString = `${req.body.email}${timeInMs}`;
    const secret = appConfig.crypto.secret;
    const hash = crypto.createHmac('sha256', secret)
                       .update(hashString)
                       .digest('hex');
    foundUser.passwordReset = hash;

    foundUser.save((err) => {
      if (err) { result = res.send(JSON.stringify({ error: 'Something went wrong while attempting to reset your password. Please Try again' })); }
       const emailData = {
        from: `CloseBrace <postmaster@${appConfig.mailgun.domain}>`,
        to: foundUser.email,
        subject: 'Reset Your Password',
        text: `A password reset has been requested for the MusicList account connected to this email address. If you made this request, please click the following link: https://localhost:8080/change-password/${foundUser.passwordReset} ... if you didn't make this request, feel free to ignore it!`,
        html: `<p>A password reset has been requested for the MusicList account connected to this email address. If you made this request, please click the following link: <a href="localhost:8080/change-password/${foundUser.passwordReset}" target="_blank">localhost:8080/change-password/${foundUser.passwordReset}</a>.</p><p>If you didn't make this request, feel free to ignore it!</p>`,
      };
      mailgun.messages().send(emailData, (error, body) => {
        if (error || !body) {
          result = res.send(JSON.stringify({ error: 'Something went wrong while attempting to send the email. Please try again.' }));
        } else {
          result = res.send(JSON.stringify({ success: true }));
        }
      });
    });
  } catch (err) {
    result = res.send(JSON.stringify({ error: 'Something went wrong while attempting to reset your password. Please Try again' }));
  }
  return result;
});

module.exports = router;