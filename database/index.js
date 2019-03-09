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



let save = (repos, endResponse) => {

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
  endResponse();
}


let sort = (cb) => {
  mongoose.model('Repo').find({}).sort('-stargazers').exec((err, repos) => {
    if (err) {
      console.log('ERROR: ', err);
      cb(err, null)
    } else {
      // console.log('SORTED REPOS?', repos)
      cb(null, repos);
    }
  })
}

// let sort = (cb) => {
//   mongoose.model('Repo').find({}).exec((err, repos) => {
//     if (err) {
//       console.log('ERROR: ', err)
//       cb(err, null)
//     }
//     // console.log('REPOS NO SORT', repos)
//     cb(null, repos)
//   })
// }



module.exports.save = save;
module.exports.repo = Repo;
module.exports.sort = sort;


// do i need to use var db = mongoose.connection?? (https://mongoosejs.com/docs/index.html)

//  mongoose.model('Repo').find((err, repos) => {
//       console.log('TEST REPOIDS------', repos);
//   })