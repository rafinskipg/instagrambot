'use strict'

var config = require('config');
var app = require('express')();
var api = require('instagram-node').instagram();
var jobs = require('./jobs')

var CLIENT_ID = config.get('CLIENT_ID');
var CLIENT_SECRET = config.get('CLIENT_SECRET');
var REDIRECT_URI = config.get('REDIRECT_URI');
var PORT = config.get('PORT');

// Why so serious
console.log('--------------------')
console.log('Starting bot with configuration:')
console.log('PORT', config.get('PORT'))
console.log('CLIENT_ID', config.get('CLIENT_ID'))
console.log('CLIENT_SECRET', config.get('CLIENT_SECRET'))
console.log('ACCESS_TOKEN', config.get('ACCESS_TOKEN'))
console.log('REDIRECT_URI', config.get('REDIRECT_URI'))
console.log('HASHTAGS', config.get('HASHTAGS'))
console.log('AUTOFOLLOW', config.get('AUTOFOLLOW'))
console.log('--------------------')

//Global unique access token
var ACCESS_TOKEN = config.get('ACCESS_TOKEN') || null; 

exports.authorize_user = function(req, res) {
  api.use({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  });

  res.redirect(api.get_authorization_url(REDIRECT_URI, { scope: ['likes', 'public_content', 'comments', 'relationships'], state: 'a state' }));
};
 
exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, REDIRECT_URI, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      ACCESS_TOKEN = result.access_token
      console.log('Yay! Access token is ' + ACCESS_TOKEN);
      //Start
      jobs.start(ACCESS_TOKEN);
      res.send('You made it!! We have scheduled a job');
    }
  });
};

// This is where you would initially send users to authorize 
app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI 
app.get('/handleauth', exports.handleauth);

app.get('/status', function(req, res) {
  res.send(jobs.getInfo()); 
});

//Change at your will
app.set('view engine', 'jade')

app.get('/policy', function(req, res) {
  res.render('policy')
})

app.listen(PORT, function () {
  console.log('Server started', PORT);
  
  if(ACCESS_TOKEN){
    jobs.start(ACCESS_TOKEN);
  }
})