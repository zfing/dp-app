import * as React from 'react'
import { observer } from 'mobx-react'
import { ViewStyle } from 'react-native'
import { WebView } from 'react-native-webview'
import { Screen } from '../../components/screen'
import { NavigationScreenProps } from 'react-navigation'

export interface WebviewScreenProps extends NavigationScreenProps {
}

const WEBVIEW: ViewStyle = {
  flex: 1,
}

// @inject("mobxstuff")
@observer
export class WebviewScreen extends React.Component<WebviewScreenProps, {}> {
  render () {
    const target: string = this.props.navigation.getParam('target') || ''
    return (
      <Screen>
        <WebView
          source={{ uri: target }}
          style={WEBVIEW}
          scalesPageToFit={false}
        />
      </Screen>
    )
  }
}
