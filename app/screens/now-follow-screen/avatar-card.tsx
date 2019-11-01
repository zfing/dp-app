import React from 'react'
import { ViewStyle, ImageStyle, Image, TextStyle } from 'react-native'
import { View, Text, Touchable, ImageIcon } from '../../components'
import { platform } from '../../theme'
import { icons } from '../../assets/icons'
import { valueFixed, valueWithColor } from '../../utils/values'

const { px2dp } = platform

const ROOT: ViewStyle = {
  backgroundColor: '#fff',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: px2dp(80),
  paddingHorizontal: px2dp(20),
  paddingTop: px2dp(10),
  paddingBottom: px2dp(20),
  marginBottom: px2dp(10),
}

const INFOIMG: ImageStyle = {
  width: px2dp(48),
  height: px2dp(48),
  borderRadius: px2dp(24),
  marginRight: px2dp(10)
}
const RATE: TextStyle = {
  fontSize: 20,
  marginRight: px2dp(10),
  lineHeight: 22
}
const FELLOETEXT = {
  color: true ? '#ccc' : '#108EE9',
}

const FOLLOW: ViewStyle = {
  width: px2dp(60),
  backgroundColor: '#fff',
  borderRadius: px2dp(4),
  borderColor: FELLOETEXT.color,
  borderWidth: px2dp(1),
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: px2dp(6),
  paddingHorizontal: px2dp(6)
}

const ICON: ImageStyle = {
  width: px2dp(10),
  height: px2dp(10),
  marginLeft: 8,
  marginRight: 2,
}

export interface AvatarCardProps {
  detail?: any
}

export function AvatarCard (props: AvatarCardProps) {
  const { detail = {} } = props
  return (
    <View
      style={ROOT}
    >
      <View row>
        <Image
          style={INFOIMG}
          source={icons.avatar}
        />
        <View justify="space-between">
          <View row align="center">
            <Text gary>{detail.nickName}</Text>
            <ImageIcon icon="ex_binance" style={ICON} />
            <Text note least>{detail.exchange}实盘</Text>
          </View>
          <View row align="flex-end">
            <Text green style={valueWithColor(RATE, detail.totalPR)}>{valueFixed(detail.totalPR, 1)}%</Text>
            <View align="flex-end" style={{paddingBottom: px2dp(3)}}>
              <Text green least >过去6个月总收益</Text>
            </View>
          </View>
        </View>
      </View>
      <Touchable style={FOLLOW} onPress={null}>
        <Text small style={FELLOETEXT}>{true ? '已关注' : '关注'}</Text>
      </Touchable>
    </View>
  )
}
