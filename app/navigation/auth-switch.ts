import {
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation'
import { mergeDeepLeft } from 'ramda'

import { defaultNavigationOptions } from './defaultNavigationOptions'

import { LoginScreen } from '../screens/login-screen'
import { RegisterScreen } from '../screens/register-screen'
import { CodeLoginScreen } from '../screens/code-login-screen'
import { ForgetScreen } from '../screens/forget-screen'

export const TRANSPARENT = {
  headerStyle: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    shadowOpacity: 0, // android
    elevation: 0 // android
  },
  headerTransparent: true,
}

export const AuthNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
  Register: { screen: RegisterScreen },
  CodeLogin: { screen: CodeLoginScreen },
  Forget: { screen: ForgetScreen },
}, {
  defaultNavigationOptions: mergeDeepLeft({
    headerStyle: {
      borderBottomWidth: 0,
      elevation: 0,
    }
  }, defaultNavigationOptions),
})

export const AuthSwitch = createSwitchNavigator({
  AuthLogin: {
    screen: AuthNavigator,
  }
})
