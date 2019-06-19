import React from 'react'
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
    .map((item, index) => {
      //let Icon = Icons[item.icon];
      return (<ListItem button component={Link} to={item.link} key={index}>
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

    </ListItem>)})
  return (
    <List component="nav">{listItems}</List>
  )
}

function MenuSide({classes, variant, menuOpen, event}) {
    return (
      <Drawer
        variant={variant}
        open={menuOpen}
        onClose={event}
        classes={{
        paper: classes.drawerPaper
      }}>
        <div onClick={event}>
          <div style={{
            paddingTop: 70
          }}/>

          <MenuList classes={classes}/>
        </div>
      </Drawer>
    )
}

export default withStyles(styles)(MenuSide)
