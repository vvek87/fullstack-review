const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  number: Number,
  username: String,
  userID: Number,
  repos: String

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;


// do i need to use var db = mongoose.connection?? (https://mongoosejs.com/docs/index.html)