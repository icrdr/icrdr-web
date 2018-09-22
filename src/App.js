import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import "shed-css/dist/index.css";
import MyTheme from './MyTheme';

import Hidden from '@material-ui/core/Hidden';
import {MuiThemeProvider} from '@material-ui/core/styles';

//import Home from './pages/Home';
//import Errorx from './pages/Errorx';
import Lab from './pages/Lab';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Minecraft from './pages/Minecraft';
import TopBar from './components/TopBar';
import MenuSide from './components/MenuSide';

class App extends Component {
  render() {
    return (
      <Router>
      <MuiThemeProvider theme={MyTheme}>
        <TopBar title="icrdr" link="./"/>
        <div className='d:f' style={{
          height: '100vh',
        }}>
          <Hidden mdDown>
            <MenuSide variant='permanent'/>
          </Hidden>
          <Route exact path="/" component={Lab} />
          <Route path="/about" component={About} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/lab" component={Lab} />
          <Route path="/minecraft" component={Minecraft} />
        </div>
      </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;