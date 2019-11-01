// Welcome to the main entry point of the app.
//
// In this file, we'll be kicking off our app or storybook.

import './i18n'
import React, { useState, useEffect } from 'react'
import { AppRegistry, YellowBox } from 'react-native'
import { StatefulNavigator } from './navigation'
import { StorybookUIRoot } from '../storybook'
import { RootStore, setupRootStore } from './models/root-store'
import { Provider } from 'mobx-react'
import { BackButtonHandler } from './navigation/back-button-handler'
import { contains } from 'ramda'
import { DEFAULT_NAVIGATION_CONFIG } from './navigation/navigation-config'
import { StyleProvider, Root as NativeBaseRoot } from 'native-base'
import getTheme from '../native-base/components'
import platform from '../native-base/variables/platform'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { Bridge } from './components/bridge'

/**
 * Ignore some yellowbox warnings. Some of these are for deprecated functions
 * that we haven't gotten around to replacing yet.
 */
YellowBox.ignoreWarnings([
  'componentWillMount is deprecated',
  'componentWillReceiveProps is deprecated',
  'componentWillUpdate is deprecated',
])

/**
 * Storybook still wants to use ReactNative's AsyncStorage instead of the
 * react-native-community package; this causes a YellowBox warning. This hack
 * points RN's AsyncStorage at the community one, fixing the warning. Here's the
 * Storybook issue about this: https://github.com/storybookjs/storybook/issues/6078
 */
const ReactNative = require('react-native')
Object.defineProperty(ReactNative, 'AsyncStorage', {
  get(): any {
    return require('@react-native-community/async-storage').default
  },
})

/**
 * Are we allowed to exit the app?  This is called when the back button
 * is pressed on android.
 *
 * @param routeName The currently active route name.
 */
const canExit = (routeName: string) => {
  return contains(routeName, DEFAULT_NAVIGATION_CONFIG.exitRoutes)
}

/**
 * This is the root component of our app.
 */
export const App = () => {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  useEffect(() => { setupRootStore().then(setRootStore) }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  //
  // This step should be completely covered over by the splash screen though.
  //
  // You're welcome to swap in your own component to render if your boot up
  // sequence is too slow though.
  if (!rootStore) {
    return null
  }

  // otherwise, we're ready to render the app
  const { navigationStore, ...otherStores } = rootStore
  return (
    <ThemeProvider theme={theme}>
      <StyleProvider style={getTheme(platform)}>
        <Provider rootStore={rootStore} navigationStore={navigationStore} {...otherStores}>
          <Bridge>
            <NativeBaseRoot>
              <BackButtonHandler canExit={canExit}>
                <StatefulNavigator />
              </BackButtonHandler>
            </NativeBaseRoot>
          </Bridge>
        </Provider>
      </StyleProvider>
    </ThemeProvider>
  )
}

/**
 * This needs to match what's found in your app_delegate.m and MainActivity.java.
 */
const APP_NAME = 'EX_APP'

// Should we show storybook instead of our app?
//
// ⚠️ Leave this as `false` when checking into git.
const SHOW_STORYBOOK = false

const RootComponent = SHOW_STORYBOOK && __DEV__ ? StorybookUIRoot : App
// 去掉黄色警告
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.', 'source.uri should not be an empty string', 'Invalid props.style key']
console.disableYellowBox = true

AppRegistry.registerComponent(APP_NAME, () => RootComponent)
