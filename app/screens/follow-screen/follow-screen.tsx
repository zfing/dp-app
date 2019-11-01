import * as React from 'react'
import { ViewStyle } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Screen, ScrollTabBar } from '../../components'
import { NavigationScreenProps } from 'react-navigation'
import { platform } from '../../theme'

import { TabHold } from './tab-hold'
import { TabCurrent } from './tab-current'
import { TabHistory } from './tab-history'

const { px2dp } = platform

const TABBAR: ViewStyle = {
  paddingHorizontal: px2dp(10),
}

export interface FollowScreenProps extends NavigationScreenProps<{}> {
}

export class FollowScreen extends React.Component<FollowScreenProps> {
  current: any = null

  render () {
    return (
      <Screen preset="fixed" backgroundColor="#fff">
        <ScrollableTabView
          initialPage={0}
          renderTabBar={(props: any = {}) => {
            if (props.activeTab === 1) {
              this.current && this.current._onRefresh() // hook
            }
            return <ScrollTabBar style={TABBAR} {...props} />
          }}
        >
          <TabHold tabLabel="当前持仓" />
          <TabCurrent tabLabel="当前跟单" inRef={current => this.current = current}/>
          <TabHistory tabLabel="历史跟单" />
        </ScrollableTabView>
      </Screen>
    )
  }
}
