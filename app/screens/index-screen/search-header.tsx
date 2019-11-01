import React from 'react'
import { ViewStyle, ImageStyle } from 'react-native'
import { View, Text, ImageIcon, Touchable, TextInput } from '../../components'
import { platform } from '../../theme'

const { px2dp } = platform

const HEAD: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: px2dp(20),
  backgroundColor: '#fff',
  paddingBottom: px2dp(10),
  justifyContent: 'space-between',
  alignItems: 'center',
}

const SEARCHBOX: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  position: 'relative'
}

const SEARCHICON: ImageStyle = {
  position: 'absolute',
  top: px2dp(-6),
  left: px2dp(6),
  width: px2dp(12),
  height: px2dp(12)
}

const SEARCH = {
  borderRadius: px2dp(7),
  backgroundColor: '#F7F8FF',
  height: px2dp(24),
  width: px2dp(237),
  paddingLeft: px2dp(26),
  zIndex: -1,
  padding: 0
}

const BTN: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center'
}

const KOLICON: ImageStyle = {
  width: px2dp(8),
  height: px2dp(6),
  marginLeft: 3,
}

export interface SearchHeaderProps {
  onToggle?: () => void;
  text?: string
}

export function SearchHeader (props: SearchHeaderProps) {
  const {
    onToggle,
    text
  } = props
  return (
    <View style={HEAD}>
      <View style={SEARCHBOX}>
        <ImageIcon icon="search" style={SEARCHICON} />
        <TextInput
          style={SEARCH}
          placeholder="昵称/平台"
        />
      </View>
      <Touchable style={BTN} onPress={onToggle}>
        <Text primary>{text}</Text>
        <ImageIcon icon="triangle_blue" style={KOLICON} />
      </Touchable>
    </View>
  )
}
