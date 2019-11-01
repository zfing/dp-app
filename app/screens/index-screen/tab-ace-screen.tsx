import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { ViewStyle, TextStyle, FlatList, ActivityIndicator, Image, ImageStyle } from 'react-native'
import NetInfo from "@react-native-community/netinfo"
import { View, Empty, Text } from '../../components'
import { platform } from '../../theme'
import { NavigationScreenProps } from 'react-navigation'
import { SearchHeader } from './search-header'
import { Carousel } from './carousel'
import { Notice } from './notice'
import { ListItem } from './list-item'
import { images } from '../../assets/images'
import { KolStore } from '../../models/kol-store'
import { color } from '../../theme'
import { Select, getSelectTextByValue } from './select'

const { px2dp } = platform

export interface TabAceScreenProps extends NavigationScreenProps<{}> {
  kolStore: KolStore;
}

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
}

const END: TextStyle = {
  paddingVertical: 15,
}
const IMG: ImageStyle = {
  width: px2dp(180),
  height: px2dp(190),
  marginBottom: px2dp(40)
}
const TEXT_NET: TextStyle = {
  fontSize: 18,
  color: '#9F9F9F',
}

@inject('kolStore')
@observer
export class TabAceScreen extends React.Component<TabAceScreenProps, {}> {
  slideMenu: any

  state = {
    flatListReady: false, // 处理触发 onEndReached bug
    isConnected: false,
  }
  componentWillMount() {
    this.checkNet()
  }
  componentWillUnMount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange)
  }
  // 检测网络状态
  checkNet = () => {
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ isConnected })
    })
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange)
  }
  // 监听网络状态
  handleConnectivityChange = (isConnected) => {
    this.setState({ isConnected })
    // console.tron.log(isConnected)
  }

  componentDidMount() {
    this._onRefresh()
  }

  _createListFooter = () => {
    const { isLoading, list } = this.props.kolStore
    return (
      <View>
        {!list.length && <Empty />}
        {isLoading ? <ActivityIndicator color="#ccc" /> : <Text center note small style={END}>已经是最底部了</Text>}
      </View>
    )
  }

  _onRefresh = () => {
    const { refresh, isRefreshing } = this.props.kolStore
    !isRefreshing && refresh()
  }

  _onLoadMore = () => {
    const { load, isLoading, isRefreshing } = this.props.kolStore
    this.state.flatListReady && !isRefreshing && !isLoading && load()
  }

  _scrolled = () => {
    if (!this.state.flatListReady) {
      this.setState({ flatListReady: true })
    }
  }

  render () {
    const { kolStore } = this.props
    
    return (
      <React.Fragment>
        <SearchHeader
          onToggle={() => this.slideMenu.open()}
          text={getSelectTextByValue(kolStore.rankType)}
        />
        <View style={ROOT}>
          <Select
            innerRef={ref => this.slideMenu = ref}
            tag={kolStore.rankType}
            onChange={tag => {
              this.slideMenu.close()
              kolStore.setKolTag(tag)
            }}
          />
          {this.state.isConnected
            ? <FlatList
                ListHeaderComponent={() => (
                  <React.Fragment>
                    <Carousel items={[images.swiper1, images.swiper2, images.swiper3]} />
                    <Notice items={['1.0版本正式上线', '2.0版本正式上线', '3.0版本正式上线', '4.0版本正式上线']} />
                  </React.Fragment>
                )}
                onScroll={this._scrolled}
                data={kolStore.list}
                keyExtractor={item => `${item.userId}${item.exchange}`}
                renderItem={({ item }) => <ListItem item={item} />}
                refreshing={kolStore.isRefreshing}
                ListFooterComponent={this._createListFooter}
                onRefresh={this._onRefresh}
                onEndReached={this._onLoadMore}
                onEndReachedThreshold={0.3}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
          : <View style={{flex: 1}} align="center" justify="center">
              <Image style={IMG} source={images.net_fail} />
              <Text style={TEXT_NET}>您的网络无法链接请稍后再试</Text>
            </View>}
        </View>
      </React.Fragment>
    )
  }
}
