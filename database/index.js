const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


// var db = mongoose.connection;
// db.on('error', console.log('connection error'));
// db.once('open', () => {
//   console.log('Connected to database')
// });

let repoSchema = mongoose.Schema({      // in use
  // username: String,
  id: {type: Number, unique: true},
  username: String,
  repoURL: String,
  repoName: String,
  stargazers: Number
});
let Repo = mongoose.model('Repo', repoSchema);

// use an object for your schema, something like this...


// top 25 stargazers data to display for each repo:
// username,
// repo name,
// repo url,
// stargazer count

let save = (repos) => {

  // var repoIDList = [];
  // for (var i = 0; i < repos.length; i++) {
  //   repoIDList.push(repos[i].id)
  // }
  // console.log('USERNAME--------------', repos[0].owner.login)
  for (var i = 0; i < repos.length; i++) {
    new Repo({
      id: repos[i].id,
      username: repos[i].owner.login,
      repoName: repos[i].name,
      repoURL: repos[i].html_url,
      stargazers: repos[i].stargazers_count
    }).save((err) => {
      if (err) {
        console.log('ERROR: ', err.message)
      }
    })
  }

  // mongoose.model('Repo').find((err, repos) => {
  //     console.log('TEST REPOIDS------', repos);
  // })



}

module.exports.save = save;
module.exports.repo = Repo;


// do i need to use var db = mongoose.connection?? (https://mongoosejs.com/docs/index.html)


  // var users;
  // var existingRepos;
  // mongoose.model('Repo').find((err, usernames) => {
  //   users = usernames;
  // })
  // mongoose.model('Repo').find((err, repoIDs) => {
  //   existingRepos = repoIDs;
  // })
  // console.log('REPOS-------------', repos[0]) works...i guess
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // if (!users.includes(repos[0].owner.login)) {
  //   for (var i = 0; i < repos.length; i++) {
  //     if (!existingRepos.includes(repos[i].id)) {

  //     }
  //   }
  // }
