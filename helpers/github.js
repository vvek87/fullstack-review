const request = require('request');
// const config = require('../config.js');
const userToken = process.env.TOKEN

let getReposByUsername = (username, cb) => {

  var repoUrl = "https://api.github.com/users/"+username+"/repos";

  let options = {
    method: "GET",
    url: repoUrl,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${userToken}` // const userToken = process.env.TOKEN
    }
  };

  request(options, cb);
}
module.exports = getReposByUsername;
