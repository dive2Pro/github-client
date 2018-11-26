import React, { Component, useEffect } from "react";
import "./App.css";
import {authenticate} from './request'

// TODO get from server
const CLIENT_ID = "e4fc9e72fbe8f05e277c";
const CLIENT_SECRET = '79d62014bded613e11df23ec0669b08c8904242b'
const REDIRECT_URI = "http://localhost:3000/github/callback";

function GithubLogin(props) {
  function openPopup(url) {
    const w = 650;
    const h = 450;
    const left = window.screen.width / 2 - w / 2;
    const top = window.screen.height / 2 - h / 2;


    return window.open(
      "",
      "",
      // "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no," +
      " width=" + w + ", height=" + h + ", top=" + top + ", left=" + left
    );
  }
  function polling(popup) {
    const polling = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(polling);
        // props.onFailure(new Error("Popup has been closed by user"));
      }

      const closeDialog = () => {
        clearInterval(polling);
        popup.close();
      };

      try {
        if (
          // !popup.location.hostname.includes("github") &&
          // !popup.location.hostname == ""
          popup.location.href.includes("code=")
        ) {
          if (popup.location.search) {
            const query = new URLSearchParams(popup.location.search);
            const code = query.get("code");
            props.onSuccess(code)
            closeDialog();
          } else {
            closeDialog();
            return this.props.onFailure(
              new Error(
                "OAuth redirect has occurred but no query or hash parameters were found. " +
                  "They were either not set during the redirect, or were removed—typically by a " +
                  "routing library—before Twitter react component could read it."
              )
            );
          }
        }
      } catch (error) {
        // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // A hack to get around same-origin security policy errors in IE.
          console.error(error)
      }
    }, 500);
  }
  function onClick(e) {
    e.preventDefault()
      console.log('e')
    const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&repo`;
    const popup = openPopup();
    popup.location = url;
    polling(popup);
  }

  useEffect(() => {
    function onMessage(event) {
      console.log(event);
    }
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
    };
  });

  return (
    <div>
      <button onClick={onClick}>GitHub</button>
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
