const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (usernameObj) => {
  let{username} = usernameObj;
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  return axios.get(`https://api.github.com/users/${username}/repos`, {'username': username}, options).then((res) => {
    let data = [];
    for (let repo of res.data) {
      let repoObj = {
        userId: repo.owner.id,
        username: repo.owner.login,
        repoId: repo.id,
        repoName: repo.name,
        url: repo.url,
        forkCount: repo.forks
      };
      data.push(repoObj);
    }
    return data;
  }).catch((err) => {
    res.sendStatus(404);
  });
}

module.exports.getReposByUsername = getReposByUsername;