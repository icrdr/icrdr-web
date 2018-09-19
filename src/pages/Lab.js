import React, {Component} from 'react'

import "shed-css/dist/index.css";
import styles from '../Styles';

import {withStyles} from '@material-ui/core';
import PageTitle from '../components/PageTitle';
import LabCards from '../components/LabCards';
import Data from '../Data.json';

class Lab extends Component {
  render() {
    const { classes } = this.props
    return (
      <main className={classes.content}>
        <PageTitle title={Data.pages.lab.title} describe={Data.pages.lab.describe}/>
        <div style={{marginTop:30}}>
          <LabCards />
        </div>
      </main>
    )
  }
}

export default withStyles(styles)(Lab)
