const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// var db = mongoose.connection;
// db.on('error', console.log('connection error'));
// db.once('open', () => {
//   console.log('Connected to database')
// });

let repoSchema = mongoose.Schema({
  // number: Number,
  username: String,
  // userID: Number,
  repos: [],
  repoIds: []
});


let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {

  var repoIDList = [];
  for (var i = 0; i < repos.length; i++) {
    repoIDList.push(repos[i].id)
  }
  // console.log('USERNAME--------------', repos[0].owner.login)
  new Repo({
    username: repos[0].owner.login,
    repos: repos,
    repoIds: repoIDList
  }).save((err) => {
    if (err) {
      console.log("Add repos to DB error: ", err)
    }
  })
  mongoose.model('Repo').find((err, repos) => {
      console.log('TEST REPOIDS------', repos);
  })



}

module.exports.save = save;


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
