import React from 'react'
import { ViewStyle, ImageStyle, Image, TextStyle } from 'react-native'
import { View, Text, Touchable, ImageIcon } from '../../components'
import { platform } from '../../theme'
import { valueFixed, valueWithColor } from '../../utils/values'

const { px2dp } = platform

const ROOT: ViewStyle = {
  backgroundColor: '#fff',
  height: px2dp(78),
  paddingHorizontal: px2dp(20),
  paddingTop: px2dp(10),
  paddingBottom: px2dp(20),
  marginBottom: px2dp(10),
}
const RATE: TextStyle = {
  fontSize: 20,
  marginRight: px2dp(10),
  lineHeight: 22
}
const TEXT_NAME: TextStyle = {
  marginBottom: px2dp(4)
}
const ICON: ImageStyle = {
  marginRight: px2dp(10),
}

export interface AvatarCardProps {
  detail?: any
}

export function AvatarCard (props: AvatarCardProps) {
  const { detail = {} } = props
  return (
    <View
      style={ROOT}
      row
      align="center"
    >
      <ImageIcon size={48} style={ICON} icon="avatar" />
      <View justify="space-between">
        <Text gary  style={TEXT_NAME}>您({detail.nickName || '临时名字'})的{detail.exchange || 'Binance'}实盘</Text>
        <View row align="flex-end">
          <Text green style={valueWithColor(RATE, detail.totalPR)}>
            {valueFixed(detail.totalPR, 2) || '123'}%
          </Text>
          <View align="flex-end" style={{ paddingBottom: px2dp(3) }}>
            <Text green least >过去6个月总收益</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
