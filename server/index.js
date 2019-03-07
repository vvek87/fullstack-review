const express = require('express');
let app = express();

var getReposByUsername = require('../helpers/github.js');


var getSave = require('../database/index.js');
var save = getSave.save;

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({extended: true}));

app.get('/', (err) => {
  if (err) {
    console.log('ERROR: ', err);
    res.status(404);
    res.end();
  } else {
    console.log('Connection Established');
    res.status(200);
    res.end();
  }

})

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var searchTerm = Object.keys(req.body)[0];   // why is the term a key in req.body?
    getReposByUsername(searchTerm, (err, res, body) => {
      if (err) {
        console.log('ERROR: ', err);
      }
      save(JSON.parse(body));
    });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

