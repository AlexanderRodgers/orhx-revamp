const env = require('dotenv').config();
const bootstrap = require('express-bootstrap-service');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootPath = path.join(__dirname);
const nodemailer = require('nodemailer');
const Recaptcha = require('express-recaptcha');

const app = express();

console.log(rootPath);

var recaptcha = new Recaptcha('6LeWsEYUAAAAADLYQnrbgAkWjlFjo14s1JHjCylZ', '6LeWsEYUAAAAAJPa90ZtZ9g_uLPyu1sjfLMplv8Y');

//Static folder
app.use('/css', express.static(path.join(rootPath + '/css/')));
app.use('/js', express.static(path.join(rootPath + '/js/')));
app.use('/img', express.static(path.join(rootPath + '/img/')));

console.log(path.join(rootPath + '/css/'));

// view engine setup
/* I don't need this anymore.
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
*/

app.use(bodyParser.urlencoded( {extended: false}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/', recaptcha.middleware.render, function(req, res){
  res.render('login', { captcha:res.recaptcha });
    next();
});
 
app.post('/', recaptcha.middleware.verify, function(req, res){
    if (!req.recaptcha.error)
        // success code
    else
        // error code
});

app.post('/send', (req, res) => {
    
    console.log(req.body);
    //taco
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message + ' /nFrom: ' + email;
    console.log(message);
    
    let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: process.env.user,
        //Do not push to github until password is scrubbed.
        pass: process.env.pass
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
    }
    
    res.sendFile(path.join(__dirname + '/index.html'));
});
    
})

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