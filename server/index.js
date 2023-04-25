const express = require('express');
const {getReposByUsername} = require('../helpers/github.js');
const {save, Repo} = require('../database/index.js');
let app = express();

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static(`client/dist`));
app.use(express.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  getReposByUsername(req.body).then((data) => {
    return save(data);
  }).catch((err) => {
    res.sendStatus(404);
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  Repo.find((err, docs) => {
    if (err) {
      res.sendStatus(404);
    } else {
      let top25 = docs.sort((a, b) => {
        return b.forkCount - a.forkCount;
      }).slice(0, 25);
      res.send(top25);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

