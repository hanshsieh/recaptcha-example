const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
 
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const port = 3000;

app.get('/v2-checkbox-auto', function (req, res) {
  res.render('v2-checkbox-auto');
});
app.get('/v2-invisible-auto', function (req, res) {
  res.render('v2-invisible-auto');
});
app.get('/v3-programically', function (req, res) {
    res.render('v3-programically');
});
app.get('/v3-auto', function (req, res) {
  res.render('v3-auto');
});

// In reality, store the secret key in a secure place. Don't commit into source code.
// See https://developers.google.com/recaptcha/intro
const secrets = {
  'v3': 'XXXXXX',
  'v2-checkbox': 'XXXXX',
  'v2-invisible': 'XXXXX',
};
 
app.post('/captcha', function(req, res) {
  const type = req.query['type'];
  const secretKey = secrets[type];
  if (secretKey === undefined) {
    return res.json({"responseError" : `invalid type "${type}"`});
  }
  const captchaToken = req.body['g-recaptcha-response'];
  if (typeof captchaToken !== 'string') {
    return res.json({"responseError" : "missing captcha token"});
  }
  // See https://developers.google.com/recaptcha/docs/verify
  const verificationURL = 'https://www.google.com/recaptcha/api/siteverify?secret=' + secretKey + 
    '&response=' + captchaToken + 
    '&remoteip=' + req.socket.remoteAddress;
 
  request(verificationURL, function(err, response, body) {
    if (err) {
      return res.json({
        'responseError': `failed to send requet to Google re-CAPTCHA: ${err}`,
      });
    }
    if (response.statusCode !== 200) {
      return res.json({
        'responseError': `Google re-CAPTCHA return ${response.statusCode}`,
      });
    }
    const parsedBody = JSON.parse(body); 
    if(parsedBody.success !== true) {
      return res.json({"responseError" : `Failed captcha verification: ${body}`});
    }
    res.json({"responseSuccess" : `Sucess, resp: ${body}`});
  });
});
 
app.listen(port, function(){
    console.log('Server is running at port: ',port);
});
