import React from 'react'
import { ViewStyle, TextStyle } from 'react-native'
import { View, Text } from '../../components'
import { platform, color } from '../../theme'

const { px2dp } = platform

const ROOT: ViewStyle = {
  paddingHorizontal: px2dp(20),
  height: px2dp(40),
  flexDirection: 'row',
  alignItems: 'center',
  borderBottomColor: 'rgba(97,97,97,0.2)',
  borderBottomWidth: 1,
}
const SIGN: ViewStyle = {
  backgroundColor: color.palette.primary,
  width: px2dp(4),
  height: px2dp(16),
  marginRight: px2dp(6),
  borderRadius: px2dp(4)
}
const TEXT: TextStyle = {
  fontSize: 16,
  fontWeight: '500',
}

export interface CardTitleProps {
  title?: string
}

export function CardTitle (props: CardTitleProps) {
  return (
    <View style={ROOT} >
      <View style={SIGN} />
      <Text style={TEXT}>{props.title}</Text>
    </View>
  )
}
