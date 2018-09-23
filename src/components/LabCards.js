import React, {Component} from 'react'

import "shed-css/dist/index.css";

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Data from '../Data.json';

class Carditem extends Component {
  state = {
    expanded: false
  };

  handleExpandClick = () => {
    this.setState(state => ({
      expanded: !state.expanded
    }));
  };
  render() {
    const {info} = this.props
    return (
      <Card>
      <div className="pos:r">
        <CardActionArea component='a' href={info.link}>
          <CardMedia
            component="img"
            height="300"
            image={info.imgsrc}
            title={info.title}
            style={{
            objectFit: 'cover'
          }}/>
          <div className="d:f a-i:f-e" style={{
            width: '100%'
          }}>
            <CardContent className="flx-g:1">
              <Typography gutterBottom variant="headline">
                {info.title}
              </Typography>
              <Typography variant="body1">
                {info.subtitle}
              </Typography>
            </CardContent>
            <div style={{
              width: 48,
              padding: 20
            }}></div>
          </div>
        </CardActionArea>
        <div
          className="pos:a"
          style={{
          right: 20,
          bottom: 20
        }}>
          <IconButton disabled={(info.content==='')?true:false} onClick={this.handleExpandClick}>
            <ExpandMore />
          </IconButton>
        </div>
</div>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <Divider />
          <CardContent>
            <Typography variant="body1">
              {info.content}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

class LabCards extends Component {
  state = {
    expanded: false
  };

  handleExpandClick = () => {
    this.setState(state => ({
      expanded: !state.expanded
    }));
  };
  render() {
    const carditems = Data
      .labitems
      .map((item, index) => <Grid item xs={12} sm={6} xl={4} key={index}>
        <Carditem info={item}/>
      </Grid>)
    return (
      <Grid container spacing={40}>
        {carditems}
      </Grid>
    )
  }
}
export default LabCards
