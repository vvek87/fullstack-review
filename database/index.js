const mongoose = require('mongoose');
const DBConnection = process.env.DB_CONNECTION_ATLAS;

mongoose.connect(DBConnection, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', () => {
  console.log('connection error');
})
db.once('open', () => {
  console.log('Connected to database')
});

let repoSchema = mongoose.Schema({
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
      cb(null, repos);
    }
  })
}

module.exports.save = save;
module.exports.repo = Repo;
module.exports.sort = sort;