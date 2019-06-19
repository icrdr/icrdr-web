import React, { useState } from 'react'
import { Link } from "react-router-dom";

import "shed-css/dist/index.css";
import MyTheme from '../MyTheme';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import MenuSide from './MenuSide';

function TopBar({ link, title }) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuList = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div>
      <MenuSide menuOpen={isMenuOpen} event={toggleMenuList} />
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
              onClick={toggleMenuList}>
              <Menu />
            </IconButton>
          </Hidden>
          <Typography className="t-d:n" component={Link} to={link}
            variant="title"
            style={{
              fontSize: 24,
              marginLeft: 10
            }}
            color="inherit">{title}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default TopBar
