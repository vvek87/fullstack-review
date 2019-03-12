require('dotenv').config()
const express = require('express');
let app = express();
let bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

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

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/repos', urlencodedParser, (req, res) => {
  var endResponse = () => {
    res.end()
  };

  var searchTerm = req.body.username;

  getReposByUsername(searchTerm, (err, response, body) => {
    if (err) {
      console.log('ERROR: ', err);
    }
    save(JSON.parse(body), endResponse)
  });


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
      // console.log('RESULTS IN GET SERVER', results)
      return {"topRepos": results, "totalRepos": repos.length};
    }
    // console.log(data)
    res.status(200);
    res.send(top25(data));

  });

});


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

