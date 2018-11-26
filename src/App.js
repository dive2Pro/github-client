import React, { Component, useEffect } from "react";
import "./App.css";
import {authenticate} from './request'

function GithubLogin(props) {
  return (
    <div>
        <a href="http://localhost:9999/api/login/github">Github</a>
    </div>
  );
}

class App extends Component {

  onSuccess = code => {
    authenticate(code)
  }

  render() {
    return (
      <div className="App">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <GithubLogin onSuccess={this.onSuccess} />
      </div>
    );
  }
}

export default App;
