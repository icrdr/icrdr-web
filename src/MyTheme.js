import {createMuiTheme} from '@material-ui/core/styles';

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
      display4: {
        color: '#303030',
        fontSize: 96,
        fontWeight: "bold"
      },
      subheading: {
        fontSize: 16,
        lineHeight:2
      }
    }
  });
  
  Object.assign( MyTheme.typography.display4,{
    [
      MyTheme
        .breakpoints
        .down('xs')
    ]: {
      fontSize: 72,
    }
  })
  export default MyTheme