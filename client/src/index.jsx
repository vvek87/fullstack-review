import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: 0,
      topRepos: []
    }

  }

  componentDidMount() {
    this.get();
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: "/repos",
      method: "POST",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      data: term,
      error: (err) => {console.log('ERROR: ', err)},
      success: () => {
        this.get()
      }
    })
  }

  get () {
    $.ajax({
      url: "/repos",
      method: "GET",
      error: (err) => {console.log('ERROR: ', err)},
      success: (data) => {
        this.setState({
          repos: data.totalRepos,
          topRepos: data.topRepos
        })}
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos} topRepos={this.state.topRepos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));