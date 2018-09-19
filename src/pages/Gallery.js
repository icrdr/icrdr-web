import React, {Component} from 'react'

import "shed-css/dist/index.css";
import styles from '../Styles';

import {withStyles} from '@material-ui/core';
import PageTitle from '../components/PageTitle';
import Data from '../Data.json';


class Gallery extends Component {
  render() {
    const { classes } = this.props
    return (
      <main className={classes.content}>
        <PageTitle title={Data.pages.gallery.title} describe={Data.pages.gallery.describe}/>
      </main>
    )
  }
}

export default withStyles(styles)(Gallery)
