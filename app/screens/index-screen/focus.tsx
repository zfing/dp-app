import * as React from 'react'
import { observer } from 'mobx-react'
import { FlatList, ActivityIndicator } from 'react-native'
import { View, Text } from '../../components'
import { platform , color} from '../../theme'
import { NavigationScreenProps } from 'react-navigation'
import { ListItem } from './list-item'

const { px2dp } = platform

export interface FocusScreenProps extends NavigationScreenProps<{}> {
}

const CONTENT = {
  backgroundColor: color.background,
}

// @inject("mobxstuff")
@observer
export class FocusScreen extends React.Component<FocusScreenProps, {}> {
  constructor(props) {
    super(props)
    this.state = {
      // 下拉刷新
      refreshing: false,
      // 加载更多
      isLoadMore: false,
      data: [
        { id: 1, nickName: 'AlbertKing', exchange: '币安', multiple: '76', introduction: '历史回溯数据可能有一定偏差', blanace: '12312', monthP: '2324', monthPR: '23', withdrawal: '34.34', money: '34' },
        { id: 2, nickName: 'AlbertKing', exchange: '币安', multiple: '76', introduction: '历史回溯数据可能有一定偏差', assets: '12312', monthP: '2324', monthPR: '23', withdrawal: '34.34', money: '34' },
        { id: 3, nickName: 'AlbertKing', exchange: '币安', multiple: '76', introduction: '历史回溯数据可能有一定偏差', assets: '12312', total: '2324', rate: '23', withdrawal: '34.34', money: '34' },
        { id: 4, nickName: 'AlbertKing', exchange: '币安', multiple: '76', introduction: '历史回溯数据可能有一定偏差', assets: '12312', total: '2324', rate: '23', withdrawal: '34.34', money: '34' },
        { id: 5, nickName: 'AlbertKing', exchange: '币安', multiple: '76', introduction: '历史回溯数据可能有一定偏差', assets: '12312', total: '2324', rate: '23', withdrawal: '34.34', money: '34' },
        { id: 6, nickName: 'AlbertKing', exchange: '币安', multiple: '76', introduction: '历史回溯数据可能有一定偏差', assets: '12312', total: '2324', rate: '23', withdrawal: '34.34', money: '34' },
      ]
    }
  }

  _newData = [{ id: 7, nickName: 'AlbertKing', exchange: '币安', multiple: '6', introduction: '历史回溯342343242偏差', assets: '12312', total: '2324', rate: '23', withdrawal: '34.34', money: '4' }]

  _createEmptyView() {
    return (
      <View align="center" justify="center">
        <Text style={{ fontSize: 16 }}>
          暂无列表数据，下拉刷新
        </Text>
      </View>
    )
  }

  _createListFooter = () => {
    return (
      <View>
        {this.state.isLoadMore === false && <ActivityIndicator />}
        <View style={{ marginTop: px2dp(10) }}></View>
      </View>
    )
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    setTimeout(() => {
      console.tron.log('没有可刷新的内容！')
      this.setState({ refreshing: false })
    }, 3000)
  }

  _onLoadMore = () => {
    if (this.state.isLoadMore) {
      return
    }
    console.tron.log('加载内容！')
    this.state.isLoadMore = true

    setTimeout(() => {
      this.setState(() => ({
        data: this.state.data.concat(this._newData),
      }))
      this.setState({ isLoadMore: true })
    }, 3000)
  }

  render () {
    return (
      <View style={CONTENT}>
        <FlatList
          data={this.state.data}
          // keyExtractor={item => item.id}
          ListHeaderComponent={() => <View style={{ height: 10 }}/>}
          renderItem={({ item }) => <ListItem item={item} />}
          refreshing={this.state.refreshing}
          ListFooterComponent={this._createListFooter.bind(this)}
          onRefresh={this._onRefresh}
          onEndReached={this._onLoadMore}
          onEndReachedThreshold={0.3}
          ItemSeparatorComponent={() => <View style={{ height: 10 }}/>}
        />
      </View>
    )
  }
}
