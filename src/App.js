import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import compose from 'recompose/compose';
import "shed-css/dist/index.css";

const MyTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#242424',
      contrastText: '#E6E6E6'
    },
    secondary: {
      main: '#36A3A7',
      contrastText: '#E6E6E6'
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Roboto',
      'Helvetica',
      'Tahoma',
      'Arial',
      '"PingFang SC"',
      '"Hiragino Sans GB"',
      '"Heiti SC"',
      '"MicrosoftYaHei"',
      '"WenQuanYi Micro Hei"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    display3: {
      color: '#303030'
    }
  }
});

const styles = {
  drawerPaper: {
    position: 'relative',
    width: 280,
    background: MyTheme.palette.secondary.main
  },
  menuListText: {
    color: MyTheme.palette.secondary.contrastText,
    fontWeight: 'bold'
  }
}

class TopBar extends Component {

  state = {
    menuOpen: false
  };

  toggleMenuList = () => {
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen
    }));
  }

  render() {
    return (
      <div>
        <div
            onClick={this.toggleMenuList}
          >
        <Drawer
          open={this.state.menuOpen}
          classes={{
          paper: this.props.classes.drawerPaper
        }}>
          
          <div style={{
            paddingTop: 70
          }}/>
          <MenuList items={menuListItems} classes={this.props.classes}/>
          
        </Drawer>
        </div>
        <AppBar
          position="fixed"
          style={{
          zIndex: MyTheme.zIndex.drawer + 1
        }}>
          <Toolbar style={{
            paddingLeft: 10
          }}>
            <Hidden mdUp>
              <IconButton
                style={{
                marginLeft: 0,
                marginRight: 0
              }}
                color="inherit"
                aria-label="Menu"
                onClick={this.toggleMenuList}>
                <Icon>menu</Icon>
              </IconButton>
            </Hidden>
            <Typography
              variant="title"
              style={{
              fontSize: 24,
              marginLeft: 10
            }}
              color="inherit">{this.props.title}</Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
const menuListItems = [
  {
    title: '关于本站',
    icon: 'chat'
  }, {
    title: '作品画廊',
    icon: 'image'
  }, {
    title: '实验室',
    icon: 'videogame_asset'
  }, {
    title: 'MINECRAFT',
    icon: 'broken_image'
  }
];

function MenuSide(props) {
  return (
    <Drawer
      variant="permanent"
      classes={{
      paper: props.classes.drawerPaper
    }}>
      <div style={{
        paddingTop: 70
      }}/>
      <MenuList items={menuListItems} classes={props.classes}/>
    </Drawer>
  )
}

function MenuList(props) {
  const listItems = props
    .items
    .map((item) => <ListItem button key={item
      .title
      .toString()}>
      <ListItemIcon
        style={{
        marginRight: 12,
        color: MyTheme.palette.secondary.contrastText
      }}>
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
    </ListItem>)
  return (
    <List component="nav">{listItems}</List>
  )
}

function Content(props) {
  return (
    <main
      style={{
      flexGrow: 1,
      backgroundColor: MyTheme.palette.background.default,
      padding: MyTheme.spacing.unit * 3
    }}>
      <div style={{
        paddingTop: 70
      }}/>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography variant="display3" align="center">welcome</Typography>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </main>
  )
}

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={MyTheme}>
        <TopBar title="icrdr" classes={this.props.classes}/>
        <div className="d:f" style={{
          height: '100vh'
        }}>
          <Hidden smDown>
            <MenuSide classes={this.props.classes}/>
          </Hidden>
          <Content classes={this.props.classes}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default compose(withStyles(styles), withWidth(),)(App);