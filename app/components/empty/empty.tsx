import * as React from 'react'
import { ViewStyle } from 'react-native'
import { Text } from '../text'
import { View } from '../view'

const ROOT: ViewStyle = {
  marginTop: 50,
}

export function Empty() {
  return (
    <View style={ROOT}>
      <Text note center>暂无列表数据，下拉刷新</Text>
    </View>
  )
}
