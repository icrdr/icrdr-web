import React, {Component} from 'react'

import "shed-css/dist/index.css";
import MyTheme from '../MyTheme';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import MenuSide from './MenuSide';

class TopBar extends Component {
  state = {
    menuOpen: false
  };

  toggleMenuList = () => {
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen
    }));
  }

  render() {
    return (
      <div>
        <MenuSide menuOpen={this.state.menuOpen} event={this.toggleMenuList}/>
        <AppBar
          position="fixed"
          style={{
          zIndex: MyTheme.zIndex.drawer + 1
        }}>
          <Toolbar style={{
            paddingLeft: 10
          }}>
            <Hidden lgUp>
              <IconButton
                style={{
                marginLeft: 0,
                marginRight: 0
              }}
                color="inherit"
                aria-label="Menu"
                onClick={this.toggleMenuList}>
                <Icon>menu</Icon>
              </IconButton>
            </Hidden>
            <Typography
              variant="title"
              style={{
              fontSize: 24,
              marginLeft: 10
            }}
              color="inherit">{this.props.title}</Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default TopBar
