import React from 'react'
import { ViewStyle, TextStyle } from 'react-native'
import { View, Text } from '../../components'
import { platform } from '../../theme'

const { px2dp } = platform

const LIST: ViewStyle = {
  marginTop: px2dp(20),
}
const TEXT: TextStyle = {
  marginRight: px2dp(20)
}

export interface ListProps {
    text?: string
    data?: any
    children?: any
}

export function List (props: ListProps) {
  const { text, data, children } = props
  const content = children || <Text note small>{data}</Text>
  return (
    <View row align="center" style={LIST}>
      <Text gary style={TEXT}>{text}</Text>
      {content}
    </View>
  )
}
