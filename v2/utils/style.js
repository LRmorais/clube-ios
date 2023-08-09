import {StyleSheet, PixelRatio} from 'react-native';

const fontDivider = Math.min(1, PixelRatio.getFontScale());
export const theme = {
  palette: {
    facebook: {
      main: '#3b5998',
      dark: '#1e2d4d',
    },
    google: {
      main: '#ea4335',
      dark: '#85261e',
    },
    apple: {
      main: '#000000',
      dark: '#000000',
    },
    primary: {
      main: '#30287b',
      light: '#372e8c',
      contrast: '#ffffff',
    },
    secondary: {
      main: '#ffc133',
    },
    companies: {
      primary: {
        contrast: '#ffffff',
        main: '#000000',
      },
    },
  },
  typography: {
    fontFamily: {
      regular: 'Montserrat Medium',
      bold: 'Montserrat Bold',
      regularItalic: 'Montserrat Medium Italic',
      extraLight: 'Montserrat ExtraLight',
      different: 'Barlow Bold',
    },
    fontSize: {
      large: 20,
      __zeplinSpToPx: sp => sp / fontDivider,
    },
    lineHeight: {
      thin: 18,
      mostCommon: 24.5,
    },
  },
  shadows: {
    5: {
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    10: {
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    },
  },
  textShadows: {
    10: {
      textShadowColor: 'rgba(0, 0, 0, .34)',
      textShadowOffset: {
        width: 0,
        height: 5,
      },
      textShadowRadius: 10,
    },
  },
  spacing: unit => unit * 8,
};

export default param =>
  StyleSheet.create(typeof param === 'function' ? param(theme) : param);
