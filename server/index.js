require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

const getReposByUsername = require('../helpers/github.js');
const getRepos = require('../database/index.js');
const save = getRepos.save;
const sortedRepos = getRepos.sort;

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
  let endResponse = () => {
    res.end()
  };

  let searchTerm = req.body.username;

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
    let top25 = (repos) => {
      let results = [];
      if (repos.length >= 25) {
        results = repos.slice(0, 25)
      } else {
        results = repos.slice(0)
      }
      return {'topRepos': results, 'totalRepos': repos.length};
    }

    res.status(200);
    res.send(top25(data));
  });

});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

