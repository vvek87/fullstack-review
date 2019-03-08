import React from 'react';

const RepoList = (props) => (
  <div>
    <h2> Repo List Component</h2>
    <h3>There are {props.repos.length} repos.</h3>
    {props.repos.map((repo, i) => {
      return <div key={i}>
      {'Stargazers: ' + repo.stargazers}
      </div>
    })}
  </div>
)

export default RepoList;



// repoId: Number,
//   username: String,
//   repoURL: String,
//   repoName: String,
//   stargazers: Number