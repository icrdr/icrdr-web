import React, {Component} from 'react'

import "shed-css/dist/index.css";
import styles from '../Styles';

import {withStyles} from '@material-ui/core';
import PageTitle from '../components/PageTitle';
import Data from '../Data.json';


class About extends Component {
  render() {
    const { classes } = this.props
    return (
      <main className={classes.content}>
        <PageTitle title={Data.pages.about.title} describe={Data.pages.about.describe}/>
      </main>
    )
  }
}

export default withStyles(styles)(About)
