// @flow

import variable from './../variables/platform';
import { PLATFORM } from './../variables/commonColor';

export default (variables /* : * */ = variable) => {
  const platform = variables.platform;

  const toastTheme = {
    '.danger': {
      // fix: backgroundColor: variables.brandDanger,
      backgroundColor: '#999999FF',
    },
    '.warning': {
      backgroundColor: variables.brandWarning
    },
    '.success': {
      backgroundColor: variables.brandSuccess
    },
    backgroundColor: 'rgba(0,0,0,0.8)',
    // borderRadius: platform === PLATFORM.IOS ? 5 : 0,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // fix: padding: 10,
    padding: 4,
    // add:
    marginBottom: 80,
    marginHorizontal: 20,
    //fix: minHeight: 50,
    'NativeBase.Text': {
      color: '#fff',
      // add:
      fontSize: 16,
      textAlign: 'center',

      flex: 1
    },
    'NativeBase.Button': {
      backgroundColor: 'transparent',
      height: 30,
      elevation: 0,
      'NativeBase.Text': {
        fontSize: 14
      }
    }
  };

  return toastTheme;
};
