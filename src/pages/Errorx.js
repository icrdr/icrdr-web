import React, {Component} from 'react'

import "shed-css/dist/index.css";
import styles from '../Styles';

import {withStyles} from '@material-ui/core';


class Home extends Component {
  render() {
    const { classes } = this.props
    return (
      <main className={classes.content}>
        Error
      </main>
    )
  }
}

export default withStyles(styles)(Home)