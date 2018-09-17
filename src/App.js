import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Logo(props){
  return <img src={props.logo} className="App-logo" alt="logo" />
}

function Title(props){
  return <h1 className="App-title">{props.title}</h1>
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Logo logo={logo}/>
          <Logo logo={logo}/>
          <Logo logo={logo}/>
          <Title title="WelcomeReact"/>
          <Title title="sfes"/>
          <Title title="vsefw"/>
          <Title title="qwdqf"/>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
