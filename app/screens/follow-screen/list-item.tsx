import React from 'react'
import { ViewStyle, TextStyle, Image } from 'react-native'
import { View, Text, Touchable } from '../../components'
import { platform } from '../../theme'
import { icons } from '../../assets/icons'
import moment from 'moment'

const { px2dp } = platform

const COLOR_UP = '#0BA194'
const COLOR_DOWN = '#FF3B30'
const COLOR_LIGHT = '#108EE9'

const ROOT: ViewStyle = {
  // height: px2dp(144),
  overflow: 'hidden',
  backgroundColor: '#fff',
}

const TAG: ViewStyle = {
  backgroundColor: COLOR_UP,
  height: px2dp(20),
}

const TAG_TXT: TextStyle = {
  fontSize: 12,
  lineHeight: px2dp(20),
  color: '#fff',
}

const TAG_TOP: ViewStyle = {
  ...TAG,
  paddingRight: px2dp(7),
  paddingLeft: px2dp(4),
  borderBottomRightRadius: px2dp(10)
}

const TAG_BOTTOM: ViewStyle = {
  ...TAG,
  paddingLeft: px2dp(7),
  paddingRight: px2dp(4),
  borderTopLeftRadius: px2dp(10)
}

const MAIN: ViewStyle = {
  paddingHorizontal: px2dp(20),
  paddingTop: px2dp(15),
}

const INFO: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: px2dp(8),
  borderBottomColor: 'rgba(97,97,97,0.2)',
  borderBottomWidth: 1,
}

const INFO_IMG = {
  width: px2dp(40),
  height: px2dp(40),
  borderRadius: px2dp(20),
  marginRight: px2dp(18),

}
const INFO_TXT: TextStyle = {
  fontSize: 10,
  marginTop: px2dp(5),
  // 暂时先固定
  maxWidth: px2dp(200)
}

const BTN = {
  paddingHorizontal: px2dp(10),
  paddingVertical: px2dp(6),
  borderRadius: px2dp(4),
  borderWidth: px2dp(1),
}

const BTN_TXT_C = {
  color: COLOR_DOWN,
  fontSize: 12,
}

const BLOCK: ViewStyle = {
  marginRight: px2dp(25)
}

const BLOCK_TITLE: TextStyle = {
  fontSize: 12,
  color: '#999',
  marginVertical: px2dp(6),
}

const BLOCK_TXT: TextStyle = {
  fontSize: 16,
}

const BOTTOM: ViewStyle = {
  height: px2dp(20),
  flexDirection: 'row',
  justifyContent: 'flex-end'
}

export interface TagProps {
  text?: string
}

export interface ListItemProps {
  item?: any,
  alert?: () => void,
  onPress: Function,
  isHistory?: boolean
}

export function ListItem(props: ListItemProps) {
  const {
    item = {},
    alert,
    onPress,
    isHistory
  } = props

  function withTextColor(style = {}, value) {
    return {
      ...style,
      color: value > 0 ? COLOR_UP : COLOR_DOWN
    }
  }
  function withBtnColor(style = {}, value) {
    return {
      ...style,
      borderColor: value > 0 ? COLOR_LIGHT : COLOR_DOWN
    }
  }

  const startTime = moment(item.copyStartDate).format('Y/M/D')
  const endTime = moment(item.copyEndDate).format('Y/M/D')

  const refDate = moment(item.relationEndDate)
  const refEndDay = refDate.diff(moment(), 'days')
  return (
    <Touchable style={ROOT} onPress={onPress}>
      <View row>
        {!isHistory && (
          <View style={TAG_TOP}>
            <Text style={TAG_TXT}>做多{item.multiple}倍</Text>
          </View>
        )}
      </View>

      <View style={MAIN}>

        <View style={INFO}>
          <View row>
            <Image style={INFO_IMG} source={icons.avatar} />
            <View>
              <Text>您的{item.nickName} {item.exchangeName}跟单</Text>
              <Text note style={INFO_TXT}>跟单开始日期：{startTime}{isHistory ? ` - ${endTime}` : ''}</Text>
            </View>
          </View>
          {!isHistory && (
            <Touchable
              style={withBtnColor(BTN, 0)}
              onPress={() => alert()}
            >
              <Text style={BTN_TXT_C}>停止跟单</Text>
            </Touchable>
          )}
        </View>

        <View row>
          <View style={BLOCK}>
            <Text style={BLOCK_TITLE}>跟单资产</Text>
            <Text style={BLOCK_TXT}>${item.amount}</Text>
          </View>
          <View style={BLOCK}>
            <Text style={BLOCK_TITLE}>总收益额</Text>
            <Text style={withTextColor(BLOCK_TXT, item.total)}>${item.total}</Text>
          </View>
          <View style={BLOCK}>
            <Text style={BLOCK_TITLE}>总收益率</Text>
            <Text style={withTextColor(BLOCK_TXT, item.rate)}>{item.rate}%</Text>
          </View>
          <View style={BLOCK}>
            <Text style={BLOCK_TITLE}>已跟单时间</Text>
            <Text style={BLOCK_TXT}>{item.copyTime}天</Text>
          </View>
        </View>
      </View>
      <View style={BOTTOM}>
        {!isHistory && (
          <View style={TAG_BOTTOM}>
            <Text style={TAG_TXT}>还剩{refEndDay}天</Text>
          </View>
        )}
      </View>
    </Touchable>
  )
}
