import React, {Component} from 'react'

import "shed-css/dist/index.css";
import styles from '../Styles';

import {withStyles} from '@material-ui/core';
import PageTitle from '../components/PageTitle';
import Data from '../Data.json';


class Home extends Component {
  render() {
    const { classes } = this.props
    return (
      <main className={classes.content}>
        <PageTitle title={Data.pages.lab.title} describe={Data.pages.lab.describe}/>
      </main>
    )
  }
}

export default withStyles(styles)(Home)
