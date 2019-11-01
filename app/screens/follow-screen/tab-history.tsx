import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { FlatList, ActivityIndicator, TextStyle, ViewStyle } from 'react-native'
import { View, Text, Empty } from '../../components'
import { ListItem } from './list-item'
import { FollowListHistoryStore } from '../../models/follow-list-history-store'
import { color, platform } from '../../theme'
import { NavigationStore } from '../../navigation/navigation-store'

const { px2dp } = platform

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  paddingTop: px2dp(10),
}

const PART: ViewStyle = {
  height: px2dp(10),
}

const END: TextStyle = {
  paddingVertical: 15,
}

export interface TabHistoryProps {
  followListHistoryStore: FollowListHistoryStore
  navigationStore: NavigationStore
}

@inject('followListHistoryStore', 'navigationStore')
@observer
export class TabHistory extends React.Component<TabHistoryProps, {}> {
  state = {
    flatListReady: false, // 处理触发 onEndReached bug
  }

  componentDidMount () {
    this._onRefresh()
  }

  _createListFooter = () => {
    const { isLoading, list } = this.props.followListHistoryStore
    return (
      <View>
        {!list.length && <Empty />}
        {isLoading ? <ActivityIndicator color="#ccc" /> : <Text center note small style={END}>已经是最底部了</Text>}
      </View>
    )
  }

  _onRefresh = () => {
    const { refresh, isRefreshing } = this.props.followListHistoryStore
    !isRefreshing && refresh()
  }

  _onLoadMore = () => {
    const { load, isLoading, isRefreshing } = this.props.followListHistoryStore
    this.state.flatListReady && !isRefreshing && !isLoading && load()
  }

  _scrolled = () => {
    if (!this.state.flatListReady) {
      this.setState({ flatListReady: true })
    }
  }

  onItem = (item) => {
    const { navigationStore } = this.props
    navigationStore.navigateTo('FollowDetail', { params: { id: item.id } })
  }

  render () {
    const { followListHistoryStore } = this.props
    return (
      <View style={ROOT}>
        <FlatList
          onScroll={this._scrolled}
          data={followListHistoryStore.list}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ListItem isHistory item={item} onPress={() => this.onItem(item)} />}
          refreshing={followListHistoryStore.isRefreshing}
          ListFooterComponent={this._createListFooter}
          onRefresh={this._onRefresh}
          onEndReached={this._onLoadMore}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={() => <View style={PART}/>}
        />
      </View>
    )
  }
}
