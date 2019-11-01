import * as React from 'react'
import { observer } from 'mobx-react'
import { FlatList, ActivityIndicator } from 'react-native'
import {
  View, Text, ImageIcon, SimpleLine, Touchable
} from '../../components'
import { platform, theme, color } from '../../theme'
import { NavigationScreenProps } from 'react-navigation'

const { px2dp } = platform

export interface QuoteScreenProps extends NavigationScreenProps<{}> {
}

const CONTENT = {
  backgroundColor: color.background,
  flex: 1,
}
const SIGNVIEW = {
  paddingVertical: px2dp(10),
  backgroundColor: '#fff',
  marginBottom: px2dp(10),
  paddingHorizontal: px2dp(20),
}
const SIGN = {
  fontSize: 12,
  color: '#333'
}
const TOUSIGN = {
  paddingHorizontal: px2dp(12),
  paddingVertical: px2dp(4),
  backgroundColor: '#EFF0F2',
  borderRadius: px2dp(10),
  lineHeight: px2dp(20),
  textAlign: 'center',
  marginRight: px2dp(10),
}
const QUOTELIST = {
  paddingVertical: px2dp(10),
  marginBottom: px2dp(2),
  backgroundColor: '#fff',
  paddingHorizontal: px2dp(20),
}
const LISTNAME = {
  flex: 1,
}
const TIPSCOLOR = {
  color: theme.colors.info.contrast,
}
const CHART = {
  marginHorizontal: px2dp(10),
}
const ICONCURRENCY = {
  marginHorizontal: px2dp(5),
}
const ICONGAIN = {
  marginHorizontal: px2dp(2),
  width: px2dp(8),
  height: px2dp(8)
}
const TIPS = {
  marginTop: px2dp(30),
  marginBottom: px2dp(20),
}

// @inject("mobxstuff")
@observer
export class QuoteScreen extends React.Component<QuoteScreenProps, {}> {
  constructor(props) {
    super(props)
    // 当前页
    this.page = 1
    this.state = {
      // 下拉刷新
      refreshing: false,
      // 加载更多
      isLoadMore: false,
      data: [
        { id: '1', name: 'Bitcoin', abbreviation: 'BTC', amplitude: '0', gain: '2.56%', totalPrice: '187.87', currentPrice: '12323.97' },
        { id: '2', name: 'Bitcoin', abbreviation: 'BTC', amplitude: '1', gain: '2.56%', totalPrice: '187.87', currentPrice: '12323.97' },
        { id: '3', name: 'Bitcoin', abbreviation: 'BTC', amplitude: '1', gain: '2.56%', totalPrice: '187.87', currentPrice: '12323.97' },
        { id: '4', name: 'Bitcoin', abbreviation: 'BTC', amplitude: '0', gain: '2.56%', totalPrice: '187.87', currentPrice: '12323.97' },
        { id: '5', name: 'Bitcoin', abbreviation: 'BTC', amplitude: '1', gain: '2.56%', totalPrice: '187.87', currentPrice: '12323.97' },
        { id: '6', name: 'Bitcoin', abbreviation: 'BTC', amplitude: '0', gain: '2.56%', totalPrice: '187.87', currentPrice: '12323.97' },
        { id: '7', name: 'Bitcoin', abbreviation: 'BTC', amplitude: '0', gain: '2.56%', totalPrice: '187.87', currentPrice: '12323.97' },
        { id: '8', name: 'Bitcoin', abbreviation: 'BTC', amplitude: '0', gain: '2.56%', totalPrice: '187.87', currentPrice: '12323.97' },
        { id: '9', name: 'Bitcoin', abbreviation: 'BTC', amplitude: '0', gain: '2.56%', totalPrice: '187.87', currentPrice: '12323.97' },
        { id: '10', name: 'Bitcoin', abbreviation: 'BTC', amplitude: '0', gain: '2.56%', totalPrice: '187.87', currentPrice: '12323.97' },
        { id: '11', name: 'Bitcoin', abbreviation: 'BTC', amplitude: '0', gain: '2.56%', totalPrice: '187.87', currentPrice: '12323.97' },
        { id: '12', name: 'Bitcoin', abbreviation: 'BTC', amplitude: '0', gain: '2.56%', totalPrice: '187.87', currentPrice: '12323.97' },
      ]
    }
  }

  _newData = [
    { id: '13', name: 'Bitcoin', abbreviation: 'BTC', amplitude: '0', gain: '2%', totalPrice: '187.87', currentPrice: '12323.97' },
    { id: '14', name: 'Bitcoin', abbreviation: 'BTC', amplitude: '0', gain: '22.56%', totalPrice: '187.87', currentPrice: '12323.97' },
    { id: '15', name: 'Bitcoin', abbreviation: 'BTC', amplitude: '0', gain: '26%', totalPrice: '1874.87', currentPrice: '12323.97' },
    { id: '163', name: 'okex', abbreviation: 'ok', amplitude: '0', gain: '2.5%', totalPrice: '187.87', currentPrice: '12323.97' }
  ]

  _renderItem = ({ item }) => (
    <Touchable onPress={null} >
      <View style={QUOTELIST} row align="center" justify="space-between">
        <View style={LISTNAME} row align="center">
          <ImageIcon size={30} icon='ex_binance' style={ICONCURRENCY} />
          <View>
            <Text>{item.name}</Text>
            <View row align="center">
              <Text small right style={TIPSCOLOR}>{item.abbreviation}</Text>
              {item.amplitude === '1'
                ? <ImageIcon icon='gain_top' style={ICONGAIN} />
                : <ImageIcon icon='gain_bottom' style={ICONGAIN} />}
              <Text small right style={TIPSCOLOR}>{item.gain}</Text>
            </View>
          </View>
        </View>
        <View style={CHART}>
          <SimpleLine
            width={px2dp(102)}
            height={px2dp(30)}
            data={[
              { x: '2019.3', y: 1.1 },
              { x: '2019.4', y: 1.5 },
              { x: '2019.5', y: 2.9 },
              { x: '2019.6', y: 0.5 },
              { x: '2019.7', y: 1.2 },
              { x: '2019.8', y: 0.8 },
              { x: '2019.9', y: 1.8 },
              { x: '2019.10', y: 1.2 },
            ]}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text right>${item.currentPrice}</Text>
          <Text small right style={TIPSCOLOR}>MCap ${item.totalPrice} Bn</Text>
        </View>
      </View>
    </Touchable>
  );

  _createEmptyView() {
    return (
      <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
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
        <View style={TIPS} align="center">
          <Text small right style={TIPSCOLOR}>仅展示现阶段支持跟单的币种</Text>
        </View>
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
        <View row style={SIGNVIEW}>
          {['USD','%(24h)','现货','总市值'].map((item)=> 
          <Touchable>
            <View style={TOUSIGN} justify="center">
              <Text style={SIGN}>{item}</Text>
            </View>
          </Touchable>)}
        </View>
        <FlatList
          data={this.state.data}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
          ListEmptyComponent={this._createEmptyView}
          ListFooterComponent={this._createListFooter.bind(this)}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          onEndReached={this._onLoadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
    )
  }
}
