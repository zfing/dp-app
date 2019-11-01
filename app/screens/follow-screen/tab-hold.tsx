import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { FlatList, ScrollView, ActivityIndicator, ViewStyle, TextStyle, Alert } from 'react-native'
import { View, Text, Empty } from '../../components'
import { platform, theme , color} from '../../theme'
import { NavigationScreenProps } from 'react-navigation'
import { ListItem } from '../hold-position-screen/list-item'
import { Slide } from '../hold-position-screen/slideup'
import { Account } from './account'
import { ExchangeBtn } from './exchange-btn'
import { CurrentHoldStore } from '../../models/current-hold-store'

const { px2dp } = platform

export interface TabHoldProps extends NavigationScreenProps {
  currentHoldStore: CurrentHoldStore
  tabLabel: string
}

const CONTENT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

const EXCHANGE: ViewStyle = {
  backgroundColor: '#fff',
  paddingHorizontal: px2dp(20),
  paddingBottom: px2dp(15),
  paddingTop: px2dp(10),
}
const USERFOLLOW: TextStyle = {
  paddingHorizontal: px2dp(20),
  paddingVertical: px2dp(10),
}
const EXCHANGEBTN: ViewStyle = {
  height: px2dp(20),
  borderRadius: px2dp(4),
  paddingHorizontal: px2dp(6),
  marginRight: px2dp(20)
}
const DIVIDE = {
  height: px2dp(1),
  backgroundColor: 'rgba(97,97,97,0.2)'
}

const END: TextStyle = {
  paddingVertical: 15,
}

@inject("currentHoldStore")
@observer
export class TabHold extends React.Component<TabHoldProps, {}> {
  state = {
    flatListReady: false, // 处理触发 onEndReached bug
    item: {},
  }

  exData = [
    { name: '币安', icon: 'ex_binance_w', value: 'Binance' },
    { name: 'Okex', icon: 'ex_okex_w', value: 'OKEx' },
    { name: '火币', icon: 'ex_huobi_w', value: 'Huobi' },
    { name: 'Bitmex', icon: 'ex_bitmex_w', value: 'BitMex' },
  ]

  slideUp = null

  componentDidMount () {
    this._onRefresh()
  }

  onShow = () => {
    Alert.alert(
      '提示',
      '您的BTC/USDT持仓1.8BTC将被市价全平，且不再接受当前仓位的后续指令，是否确定平仓',
      [
        {text: '确定', onPress: () => {null}},
        {text: '取消'}
      ]
    )
  }

  _renderItem = ({ item }) => (
    <ListItem
      item={item}
      onPress={() => {
        this.slideUp.open()
        this.setState({ item })
      }}
      alert = {() => this.onShow}
    />
  )

  _separator() {
    return <View style={{ width: px2dp(20) }} />
  }

  bgColor = (style, active) =>{
    return {
      ...style,
      backgroundColor: active ? theme.colors.primary.base : theme.colors.info.contrast
    }
  }
  _renderExchange = (item) => {
    const { current, setCurrent } = this.props.currentHoldStore
    return (
      <ExchangeBtn
        key={item.value}
        item={item}
        onPress={() => setCurrent(item.value)}
        style={this.bgColor(EXCHANGEBTN, current === item.value && 'active')}
      />
    )
  }

  _createListFooter = () => {
    const { isLoading, list } = this.props.currentHoldStore
    return (
      <View>
        {!list.length && <Empty />}
        {isLoading ? <ActivityIndicator color="#ccc" /> : <Text center note small style={END}>已经是最底部了</Text>}
      </View>
    )
  }

  _onRefresh = () => {
    const { refresh, isRefreshing } = this.props.currentHoldStore
    !isRefreshing && refresh()
  }

  _onLoadMore = () => {
    const { load, isLoading, isRefreshing } = this.props.currentHoldStore
    this.state.flatListReady && !isRefreshing && !isLoading && load()
  }

  _scrolled = () => {
    if (!this.state.flatListReady) {
      this.setState({ flatListReady: true })
    }
  }

  render () {
    const { currentHoldStore } = this.props
    const { current } = currentHoldStore

    const { item } = this.state
    return (
      <View style={CONTENT} >
        <Account />
        <View style={DIVIDE} />
        <View style={EXCHANGE}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {this.exData.map(this._renderExchange)}
          </ScrollView>
        </View>
        <Text small style={USERFOLLOW}>
          {`AlbertKing ${current || ''} 跟单`}
        </Text>
        <FlatList
          data={currentHoldStore.list}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
          refreshing={currentHoldStore.isRefreshing}
          ListFooterComponent={this._createListFooter}
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
      </View>
    )
  }
}
