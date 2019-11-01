import * as React from 'react'
import { observer } from 'mobx-react'
import { ViewStyle, FlatList, ActivityIndicator } from 'react-native'
import { View, Screen } from '../../components'
import { color } from '../../theme'
import { NavigationScreenProps } from 'react-navigation'
import { ListItem } from './list-item'
import { Slide } from './slideup'

export interface HoldPositionScreenProps extends NavigationScreenProps<{}> {
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

// @inject("mobxstuff")
@observer
export class HoldPositionScreen extends React.Component<HoldPositionScreenProps, {}> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.hold === 1 ? '当前持仓' : '历史持仓',
  });

  state = {
    item: {},
    // 下拉刷新
    refreshing: false,
    // 加载更多
    isLoadMore: false,
    data: this.props.navigation.state.params.data,
  }

  slideUp=null

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
    console.tron.log('加载持仓数据！')
    this.state.isLoadMore = true

    setTimeout(() => {
      this.setState(() => ({
        data: this.state.data.concat(this.props.navigation.state.params.newData),
      }))
      this.setState({ isLoadMore: true })
    }, 5000)
  }

  _renderItem = ({ item }) => (
    <ListItem
      item={item}
      onPress={() => {
        this.slideUp.open()
        this.setState({ item })
      }}
    />
  )

  _createListFooter = () => {
    return (
      <View>
        {this.state.isLoadMore === false && <ActivityIndicator />}
      </View>
    )
  }

  render () {
    const { item } = this.state
    return (
      <Screen style={ROOT}>
        <FlatList
          data={this.state.data}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
          ListHeaderComponent={() => <View style={{ height: 10 }}/>}
          ListFooterComponent={this._createListFooter}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          onEndReached={this._onLoadMore}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={() => <View style={{ height: 10 }}/>}
        />
        <Slide
          item={item}
          innerRef={ref => this.slideUp = ref}
          onChange={() => this.slideUp.close()}
        />
      </Screen>
    )
  }
}
