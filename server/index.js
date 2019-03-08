const express = require('express');
let app = express();

var getReposByUsername = require('../helpers/github.js');


var getRepos = require('../database/index.js');
var save = getRepos.save;
var sortedRepos = getRepos.sort;

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

app.post('/repos', (req, res) => {

  var searchTerm = Object.keys(req.body)[0];   // why is the term a key in req.body?

  getReposByUsername(searchTerm, (err, response, body) => {
    if (err) {
      console.log('ERROR: ', err);
    }
    save(JSON.parse(body))
  });
  res.end(JSON.stringify('test'));

});

app.get('/repos', (req, res) => {

  sortedRepos((err, data) => {
    if (err) {
      console.log('Error: ', err)
    }
    var top25 = (repos) => {
      var results = [];
      if (repos.length >= 25) {
        for (var i = 0; i < 25; i++) {
          results.push(repos[i])
        }
      } else {
        for (var j = 0; j < repos.length; j++) {
          results.push(repos[j])
        }
      }

      return results;
    }
    res.status(200);
    res.send(top25(data));
  });

});

let port = 1128;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

