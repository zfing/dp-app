import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { FlatList, ActivityIndicator, TextStyle, ViewStyle, Alert } from 'react-native'
import {
  View, Text, Empty
} from '../../components'
import { ListItem } from './list-item'
import { FollowListStore } from '../../models/follow-list-store'
import { NavigationStore } from '../../navigation/navigation-store'
import { color, platform } from '../../theme'

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

export interface TabCurrentProps {
  followListStore: FollowListStore
  navigationStore: NavigationStore
  inRef: (ref: any) => void
}

@inject('followListStore', 'navigationStore')
@observer
export class TabCurrent extends React.Component<TabCurrentProps, {}> {
  select: any = {}
  state = {
    flatListReady: false, // 处理触发 onEndReached bug
  }

  componentDidMount () {
    this._onRefresh()
  }

  _createListFooter = () => {
    const { isLoading, list } = this.props.followListStore
    return (
      <View>
        {!list.length && <Empty />}
        {isLoading ? <ActivityIndicator color="#ccc" /> : <Text center note small style={END}>已经是最底部了</Text>}
      </View>
    )
  }

  _onRefresh = () => {
    const { refresh, isRefreshing } = this.props.followListStore
    !isRefreshing && refresh()
  }

  _onLoadMore = () => {
    const { load, isLoading, isRefreshing } = this.props.followListStore
    this.state.flatListReady && !isRefreshing && !isLoading && load()
  }

  _scrolled = () => {
    if (!this.state.flatListReady) {
      this.setState({ flatListReady: true })
    }
  }

  onOk = async () => {
    const { followListStore } = this.props
    const { targetUserId, exchangeName } = this.select
    if (await followListStore.stopCopy({ targetUserId, exchangeName})) {
      this._onRefresh()
    }
  }

  onShow = (item = {}) => {
    this.select = item
    Alert.alert(
      '提示',
      '停止跟投后，我们将不再接管您的账户，您账户中剩余仓位请自行处理。是否确认停止跟投',
      [
        {text: '确定', onPress: this.onOk},
        {text: '取消'}
      ]
    )
  }

  onItem = (item) => {
    const { navigationStore } = this.props
    navigationStore.navigateTo('FollowDetail', { params: { id: item.id } })
  }

  render () {
    const { followListStore, inRef } = this.props
    inRef && inRef(this)
    return (
      <View style={ROOT}>
        <FlatList
          onScroll={this._scrolled}
          data={followListStore.list}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              alert={() => this.onShow(item)}
              onPress={() => this.onItem(item)}
            />
          )}
          refreshing={followListStore.isRefreshing}
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
