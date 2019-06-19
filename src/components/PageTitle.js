import React from 'react'
import Typography from '@material-ui/core/Typography';

function PageTitle(props) {
  return (
    <div>
      <Typography variant="display4">{props.title}</Typography>
      <Typography variant="body1" style={{ marginTop: 20, maxWidth: 600 }}>{props.describe}</Typography>
    </div>
  )
}

export default PageTitle