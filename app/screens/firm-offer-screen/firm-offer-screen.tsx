import * as React from 'react'
// import { observable, useStrict, action } from 'mobx'
import { observer } from 'mobx-react'
import { ViewStyle, FlatList, ActivityIndicator } from 'react-native'
import { color } from '../../theme'
import { NavigationScreenProps } from 'react-navigation'
import { View, Screen } from '../../components'
import { ListItem } from '../index-screen/list-item'

export interface FirmOfferScreenProps extends NavigationScreenProps<{}> {
}
const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}
// @inject("mobxstuff")
@observer
export class FirmOfferScreen extends React.Component<FirmOfferScreenProps, {}> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: '他的实盘',
  });

  state = {
    // 下拉刷新
    refreshing: false,
    // 加载更多
    isLoadMore: false,
    data: this.props.navigation.state.params.data,
  }

  _newData = [{ id: 7, nickName: 'AlbertKing', exchange: '币安', multiple: '6', stayTime: '342', introduction: '历史回溯342343242偏差', assets: '12312', total: '2324', rate: '23', withdrawal: '34.34', money: '4' }]

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
    console.tron.log('加载数据！')
    this.state.isLoadMore = true

    setTimeout(() => {
      this.setState((state) => ({
        data: state.data.concat(this._newData),
      }))
      this.setState({ isLoadMore: true })
    }, 5000)
  }

  _createListFooter = () => {
    return (
      <View>
        {this.state.isLoadMore === false && <ActivityIndicator />}
      </View>
    )
  }

  render () {
    return (
      <Screen style={ROOT}>
        <FlatList
          data={this.state.data}
          // keyExtractor={item => item.id}
          renderItem={({ item }) => <ListItem item={item} />}
          refreshing={this.state.refreshing}
          ListHeaderComponent={() => <View style={{ height: 10 }}/>}
          ListFooterComponent={this._createListFooter.bind(this)}
          onRefresh={this._onRefresh}
          onEndReached={this._onLoadMore}
          onEndReachedThreshold={0.3}
          ItemSeparatorComponent={() => <View style={{ height: 10 }}/>}
        />
      </Screen>
    )
  }
}
