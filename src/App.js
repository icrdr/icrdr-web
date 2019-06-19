import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import "shed-css/dist/index.css";
import MyTheme from './MyTheme';

import Hidden from '@material-ui/core/Hidden';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { Gallery, Lab} from './pages/mainPage';
import TopBar from './components/TopBar';
import MenuSide from './components/MenuSide';

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={MyTheme}>
        <TopBar title="icrdr" link="./" />
        <div className='d:f' style={{
          height: '100vh',
        }}>
          <Hidden mdDown>
            <MenuSide variant='permanent' />
          </Hidden>
          <Route exact path="/" component={Lab} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/lab" component={Lab} />
        </div>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;