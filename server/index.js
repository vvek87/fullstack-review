const express = require('express');
let app = express();

var getRepos = require('../helpers/github.js');
var getReposByUsername = getRepos.getReposByUsername;

var getSave = require('../database/index.js');
var save = getSave.save;

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({extended: true}));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var repoList;
  var searchTerm = Object.keys(req.body)[0];   // why is the term a key in req.body?
    getReposByUsername(searchTerm, (err, res, body) => {
      repoList = JSON.parse(body);
      // console.log('TEST-----------', repoList);
      // console.log(repoList)
      // return JSON.parse(body);
      save(repoList)
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

