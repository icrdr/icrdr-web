import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';

class PageTitle extends Component {
  render() {
    return (
      <div>
        <Typography variant="display4">{this.props.title}</Typography>
        <Typography variant="body1" style={{marginTop:20, maxWidth:600}}><div dangerouslySetInnerHTML={ {__html: this.props.describe} } /></Typography>
      </div>
    )
  }
}

export default PageTitle