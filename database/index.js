const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true, useUnifiedTopology: true }); // open a connection to the fetcher database

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  userId: Number,
  username: String,
  repoId: Number,
  repoName: String,
  url: String,
  forkCount: Number
});

// compiling schema into a Model
let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let dataPromised = data.map((repo) => {
    let id = repo.repoId;
    let repoInstance = new Repo(repo);
    Repo.find({repoId: id}, (err, doc) => {
      if (err) {
        return repoInstance.save();
      } else {
        console.log('this repo is in the database already');
      }
     })
  });
  Promise.all(dataPromised).then(res => {
    // res.send('data saved to db');
    console.log('data saved to db');
  }).catch((err) => {
    console.log('unable to save the data', err);
  });
}

module.exports = {save, Repo};