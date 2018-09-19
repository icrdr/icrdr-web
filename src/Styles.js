import MyTheme from './MyTheme';
const styles = {
  content: {
    flexGrow: 1,
    backgroundColor: MyTheme.palette.background.default,
    paddingTop: 90,
    paddingLeft: 96,
    paddingRight: 96,
    [
      MyTheme
        .breakpoints
        .down('md')
    ]: {
      paddingLeft: 32,
      paddingRight: 32
    },
    [
      MyTheme
        .breakpoints
        .down('xs')
    ]: {
      paddingLeft: 16,
      paddingRight: 16
    }
  },
  drawerPaper: {
    position: 'relative',
    width: 280,
    background: MyTheme.palette.secondary.main
  },
  menuListText: {
    color: MyTheme.palette.secondary.contrastText,
    fontWeight: 'bold'
  },
  menuListIcon: {
    marginRight: 12,
    color: MyTheme.palette.secondary.contrastText
  }
}

export default styles