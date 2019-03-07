const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


// var db = mongoose.connection;
// db.on('error', console.log('connection error'));
// db.once('open', () => {
//   console.log('Connected to database')
// });

let repoSchema = mongoose.Schema({      // in use
  repoId: {type: Number, unique: true},
  username: String,
  repoURL: String,
  repoName: String,
  stargazers: Number
});
let Repo = mongoose.model('Repo', repoSchema);

// top 25 stargazers data to display for each repo:
// username,
// repo name,
// repo url,
// stargazer count

let save = (repos) => {

  for (var i = 0; i < repos.length; i++) {
    new Repo({
      repoId: repos[i].id,
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

}

module.exports.save = save;
module.exports.repo = Repo;


// do i need to use var db = mongoose.connection?? (https://mongoosejs.com/docs/index.html)

 // mongoose.model('Repo').find((err, repos) => {
  //     console.log('TEST REPOIDS------', repos);
  // })