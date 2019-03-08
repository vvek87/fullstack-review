import React from 'react';

const RepoList = (props) => (
  <div>
    <h4>There are {props.repos} total repos.</h4>
    <br />
    <h3>Here are the top 25 repos:</h3>
    {props.topRepos.map((repo, i) => {
      return <h4 key={i}><a href={repo.repoURL}>{repo.repoName}</a></h4>
    })}
  </div>
)

export default RepoList;
