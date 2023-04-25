import React from 'react';
import RepoEntry from './RepoEntry.jsx';

const RepoList = ({ repos }) => {

  return (<div>
      <h4> Repo List Component </h4>
      There are {repos.length} repos.
      {repos.map((repo) => {
        return <RepoEntry repo={repo} key={repo._id} />
      })};
    </div>);
};

export default RepoList;

