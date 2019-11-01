import React from 'react'
import { ImageStyle } from 'react-native'
import { View, Text, Touchable, ImageIcon, TouchableProps } from '../../components'
import { platform } from '../../theme'

const { px2dp } = platform
const COLORF = {
  color: '#fff'
}
const EXICON: ImageStyle = {
  width: px2dp(14),
  height: px2dp(14),
  marginRight: px2dp(2),
}

export interface ExchangeBtnProps extends TouchableProps {
  item?: any,
  onPress?: () => void,
  style?:any
}

export function ExchangeBtn (props: ExchangeBtnProps) {
  const {
    onPress,
    item,
    style
  } = props

  return (
    <Touchable onPress={onPress} >
      <View style={style} row align='center'>
        <ImageIcon icon={item.icon} style={EXICON} />
        <Text small style={COLORF}>{item.name}</Text>
      </View>
    </Touchable>
  )
}
