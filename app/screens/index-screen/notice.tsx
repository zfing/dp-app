import React from 'react'
import { ViewStyle, TextStyle } from 'react-native'
import { View, Text, ImageIcon, Marquee } from '../../components'
import { platform } from '../../theme'

const { px2dp } = platform

const ROOT: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: px2dp(20),
  height: px2dp(38),
}

const TEXT: TextStyle = {
  marginLeft: px2dp(3),
  fontSize: 12,
}

export interface NoticeProps {
  items?: string[]
}

export function Notice (props: NoticeProps) {
  const {
    items = []
  } = props
  return (
    <View style={ROOT}>
      <ImageIcon size={14} icon="notice" />
      <Marquee
        renderItem={dataItem => <Text style={TEXT}>{dataItem}</Text>}
        items={items}
      />
    </View>
  )
}
