const request = require('request');
const config = require('../config.js');

let getReposByUsername = (/* TODO */ username, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  var repoUrl = "https://api.github.com/users/"+username+"/repos";

  let options = {
    method: "GET",
    url: repoUrl,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  // var callback = (err, res, body) => {
  //   if (err) {
  //     console.log('ERROR: ', err)
  //   }
  //   var data = JSON.parse(body)
  //   return data;
  //   // console.log('PARSED BODY IN getReposByUsername', data)
  // }
  return request(options, cb);
  // return repoData
}

module.exports.getReposByUsername = getReposByUsername;