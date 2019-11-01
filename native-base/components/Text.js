// @flow

import variable from './../variables/platform';

export default (variables /* : * */ = variable) => {
  const textTheme = {
    fontSize: variables.DefaultFontSize,
    fontFamily: variables.fontFamily,
    color: variables.textColor,
    '.note': {
      color: '#999999',
      fontSize: variables.noteFontSize
    },
    //add:
    '.primary': {
      color: '#108EE9'
    },
    '.white': {
      color: '#fff',
    },
    '.gary': {
      color: '#333'
    },
    '.green': {
      color: '#0BA194'
    },
    // 12号字体
    '.small': {
      fontSize: 12,
    },
    '.least': {
      fontSize: 10,
    },
    '.largest': {
      fontSize: 24,
    },
    '.bold': {
      fontWeight: 'bold', 
    },
  };

  return textTheme;
};
