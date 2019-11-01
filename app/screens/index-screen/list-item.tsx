import React from 'react'
import { inject } from 'mobx-react'
import { ViewStyle, TextStyle, Image, ImageStyle } from 'react-native'
import { View, Text, ImageIcon, Touchable } from '../../components'
import { platform, theme } from '../../theme'
import { icons } from '../../assets/icons'
import { valueFixed, valueWithColor } from '../../utils/values'
import { NavigationStore } from '../../navigation/navigation-store'

const { px2dp } = platform

const ROOT: ViewStyle = {
  backgroundColor: '#fff',
}

// const TAG: ViewStyle = {
//   height: px2dp(20),
// }

const TAG_TXT: TextStyle = {
  lineHeight: px2dp(20),
  color: '#fff',
}
const CARD_TOP: ViewStyle = {
  height: px2dp(20),
}
const TAG_TOP: ViewStyle = {
  height: px2dp(20),
  paddingRight: px2dp(7),
  paddingLeft: px2dp(4),
  borderBottomRightRadius: px2dp(10)
}

const TAG_BOTTOM: ViewStyle = {
  backgroundColor: theme.colors.info.contrast,
  height: px2dp(20),
  paddingLeft: px2dp(7),
  paddingRight: px2dp(4),
  borderTopLeftRadius: px2dp(10)
}

const ICON: ImageStyle = {
  width: px2dp(14),
  marginHorizontal: 5,
}

const MAIN: ViewStyle = {
  paddingHorizontal: px2dp(20),
  paddingTop: px2dp(15),
}

const INFO: ViewStyle = {
  paddingBottom: px2dp(8),
  borderBottomColor: 'rgba(97,97,97,0.2)',
  borderBottomWidth: 1,
}

const INFO_IMG: ImageStyle = {
  width: px2dp(40),
  height: px2dp(40),
  borderRadius: px2dp(20),
  marginRight: px2dp(18),

}
// const INFO_TIME: TextStyle = {
//   color: theme.colors.info.contrast,
//   fontSize: px2dp(10),
// }
const INFO_TXT: TextStyle = {
  fontSize: px2dp(10),
  marginTop: px2dp(5),
  // 暂时先固定
  maxWidth: px2dp(200)
}

const BTN: ViewStyle = {
  paddingHorizontal: px2dp(10),
  paddingVertical: px2dp(6),
  borderRadius: px2dp(4),
  borderColor: theme.colors.primary.base,
  borderWidth: px2dp(1),
}

const BTN_TXT: TextStyle = {
  color: theme.colors.primary.base,
  fontSize: px2dp(12),
}

const BLOCK: ViewStyle = {
  marginRight: px2dp(25)
}

const BLOCK_TITLE: TextStyle = {
  fontSize: px2dp(12),
  color: '#999',
  marginVertical: px2dp(6),
}

const BLOCK_TXT: TextStyle = {
  fontSize: px2dp(16),
}

const BOTTOM: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginTop: px2dp(5)
}

export interface ItemProps {
  [key: string]: any
}

export interface ListItemProps {
  navigationStore: NavigationStore
  item: ItemProps
}

@inject('navigationStore')
export class ListItem extends React.Component<ListItemProps> {
  render () {
    const {
      item = {},
      navigationStore: {
        navigateTo
      },
    } = this.props

    function toDetail() {
      navigateTo('KolDetail', {
        params: {
          userId: item.userId,
          exchange: item.exchange,
        }
      })
    }

    const bgColor = (style, value) => {
      let color = '#0BA194'
      if(Math.abs(value) < 0.1) {
        color = '#999'
      } else if(value <= -0.1) {
        color = '#FF3B30'
      } else if(value >= 0.1) {
        color = '#0BA194'
      }
      return {
        ...style,
        backgroundColor: color,
      }
    }
    
    const leverage = (value: any) => {
      let multiple = ''
      if(Math.abs(value) < 0.1) {
        multiple = '空仓'
      }else if(value <= -0.1 ) {
        if(value <= -10) {
          multiple = `做空${Math.abs(Math.round(value))}倍`
        } else {
          multiple = `做空${Math.abs(valueFixed(value, 1))}倍`
        }
      } else if(value >= 0.1) {
        if(value >= 10) {
          multiple = `做多${Math.round(value)}倍`
        } else {
          multiple = `做多${valueFixed(value, 1)}倍`
        }
      }
      return multiple
    }

    return (
      <Touchable style={ROOT} onPress={toDetail}>
        <View row align="center" style={CARD_TOP} >
          <View style={bgColor(TAG_TOP, Number(item.leverage))}>
            <Text small style={TAG_TXT}>{leverage(Number(item.leverage)) || '做多x倍'}</Text>
          </View>
          <ImageIcon icon="ex_binance" style={ICON} />
          <Text note least>{item.exchange}实盘</Text>
        </View>

        <View style={MAIN}>
          <View row justify="space-between" align="center" style={INFO}>
            <View row>
              <Image style={INFO_IMG} source={icons.avatar} />
              <View justify="center">
                <Text>{item.nickName}</Text>
                {/* {item.stayTime && <Text small style={INFO_TIME}>已经入驻{item.stayTime}天</Text>} */}
                <Text note style={INFO_TXT}>{item.introduction || '他暂时还没有个人介绍哦～'}</Text>
              </View>
            </View>
            <Touchable style={BTN} onPress={toDetail}>
              <Text style={BTN_TXT}>立即跟单</Text>
            </Touchable>
          </View>

          <View row>
            <View style={BLOCK}>
              <Text style={BLOCK_TITLE}>账户资产</Text>
              <Text style={BLOCK_TXT}>${valueFixed(item.balance, 0)}</Text>
            </View>
            <View style={BLOCK}>
              <Text style={BLOCK_TITLE}>月收益额</Text>
              <Text style={valueWithColor(BLOCK_TXT, item.monthP)}>${valueFixed(item.monthP, 0)}</Text>
            </View>
            <View style={BLOCK}>
              <Text style={BLOCK_TITLE}>月收益率</Text>
              <Text style={valueWithColor(BLOCK_TXT, item.monthPR)}>{valueFixed(item.monthPR * 100)}%</Text>
            </View>
            <View style={BLOCK}>
              <Text style={BLOCK_TITLE}>最大回撤</Text>
              <Text style={valueWithColor(BLOCK_TXT, 0)}>{valueFixed(item.withdrawal)}%</Text>
            </View>
          </View>
        </View>
        <View style={BOTTOM}>
          <View style={TAG_BOTTOM}>
            <Text small style={TAG_TXT}>${item.money}/月</Text>
          </View>
        </View>
      </Touchable>
    )
  }
}
