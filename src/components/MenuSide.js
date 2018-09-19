import React, {Component} from 'react'
import {Link} from "react-router-dom";

import "shed-css/dist/index.css";
import styles from '../Styles';

import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/core';

import Data from '../Data.json';

function MenuList(props) {
  const {classes} = props
  const listItems = Data
    .menu
    .map((item, index) => <ListItem button component={Link} to={item.link} key={index}>

      <ListItemIcon className={classes.menuListIcon}>
        <Icon>{item.icon}</Icon>
      </ListItemIcon>
      <ListItemText
        style={{
        padding: 0
      }}
        primary={item.title}
        classes={{
        primary: props.classes.menuListText
      }}/>

    </ListItem>)
  return (
    <List component="nav">{listItems}</List>
  )
}

class MenuSide extends Component {
  render() {
    const {classes} = this.props
    return (
      <Drawer
        variant={this.props.variant}
        open={this.props.menuOpen}
        onClose={this.props.event}
        classes={{
        paper: classes.drawerPaper
      }}>
        <div onClick={this.props.event}>
          <div style={{
            paddingTop: 70
          }}/>

          <MenuList classes={classes}/>
        </div>
      </Drawer>
    )
  }
}

export default withStyles(styles)(MenuSide)
