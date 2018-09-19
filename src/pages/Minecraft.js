import React, {Component} from 'react'

import "shed-css/dist/index.css";
import styles from '../Styles';

import {withStyles} from '@material-ui/core';
import PageTitle from '../components/PageTitle';
import Data from '../Data.json';


class Minecraft extends Component {
  render() {
    const { classes } = this.props
    return (
      <main className={classes.content}>
        <PageTitle title={Data.pages.minecraft.title} describe={Data.pages.minecraft.describe}/>
      </main>
    )
  }
}

export default withStyles(styles)(Minecraft)
