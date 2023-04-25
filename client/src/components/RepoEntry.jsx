import React from 'react';

const RepoEntry = ({repo, }) => {
  return (<>
    <a href={`${repo.url}`}>{repo.repoName}</a>
  </>);
};

export default RepoEntry;