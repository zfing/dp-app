import * as React from 'react'
import { ViewStyle } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Screen, ScrollTabBar } from '../../components'
import { platform } from '../../theme'
import { NavigationScreenProps } from 'react-navigation'

import { QuoteScreen } from './quote'
import { TabAceScreen } from './tab-ace-screen'
import { FocusScreen } from './focus'

const { px2dp } = platform

export interface IndexScreenProps extends NavigationScreenProps<{}> {
}
const TABBAR: ViewStyle = {
  paddingHorizontal: px2dp(10),
}

export class IndexScreen extends React.Component<IndexScreenProps, {}> {
  render() {
    return (
      <Screen backgroundColor="#fff" preset="fixed">
        <ScrollableTabView
          initialPage={0}
          renderTabBar={(props) => {
            return <ScrollTabBar style={TABBAR} {...props} />
          }}
        >
          <TabAceScreen tabLabel="高手列表" />
          <FocusScreen tabLabel="我的关注" />
          <QuoteScreen tabLabel="行情" />
        </ScrollableTabView>
      </Screen>
    )
  }
}
