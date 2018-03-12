const env = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootPath = path.join(__dirname);
const nodemailer = require('nodemailer');

const app = express();

console.log(rootPath);

//Static folder
app.use('/css', express.static(path.join(rootPath + '/css/')));
app.use('/js', express.static(path.join(rootPath + '/js/')));
app.use('/img', express.static(path.join(rootPath + '/img/')));
app.use('/', express.static(path.join(rootPath)));

console.log(path.join(rootPath + '/css/'));
/*
// view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
*/

app.use(bodyParser.urlencoded( {extended: false}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(rootPath + '/index.html');
});

app.post('/send', (req, res) => {
/*    Doesn't work.
      if(
    req.body.captcha === undefined ||
    req.body.captcha === '' ||
    req.body.captcha === null
  ){
    return res.json({"success": false, "msg":"Please select captcha"});
  }

  // Secret Key
  const secretKey = '6LdpvDEUAAAAAHszsgB_nnal29BIKDsxwAqEbZzU';

  // Verify URL
  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

  // Make Request To VerifyURL
  request(verifyUrl, (err, response, body) => {
    body = JSON.parse(body);
    console.log(body);

    // If Not Successful
    if(body.success !== undefined && !body.success){
      return res.json({"success": false, "msg":"Failed captcha verification"});
    }

    //If Successful
    return res.json({"success": true, "msg":"Captcha passed"});
  });
*/   
    /* Works */
    console.log(req.body);
    //taco
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message + ' From: ' + email;
    console.log(message);
    
    let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'rodg6714@eduhsd.k12.ca.us',
        //Do not push to github until password is scrubbed.
        pass: '1173'
    },
    tls: {
        rejectUnauthorized: false
    }
});

let helperOptions = {
    replyTo: email,
    to: 'rodg6714@eduhsd.k12.ca.us',
    subject: name + ': User Submission',
    text: message
};

    transporter.sendMail(helperOptions, (error, info) => {
    if (error) {
        return console.log(error);
    } else {
        console.log("The message was sent.");
        console.log(info);
    res.redirect('/');
    }
});
    
});

app.all('*', function(req, res) {
    throw new Error("Bad request")
});

app.use(function(e, req, res, next) {
    if (e.message === "Bad request") {
        res.status(404).sendFile(__dirname + '/error404.html');
    }
});



var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server started on port ' + port);
});