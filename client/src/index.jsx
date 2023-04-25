import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    $.get('/repos', (repos) => {
      setRepos(repos);
    });
  });

  const search = (term, callback) => {
    // ajax method post request
    $.post('/repos', term, (data)=> {
      console.log(`${term} was searched`);
    });
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));