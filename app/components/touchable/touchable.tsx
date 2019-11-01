import * as React from 'react'
import { View, ViewStyle, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { platform } from '../../theme'

export interface TouchableProps {
  style?: ViewStyle | ViewStyle[]
  disabled?: boolean
  onPress?: Function
  onLongPress?: Function
  children?: React.ReactNode
}

export function Touchable(props: TouchableProps) {
  const {
    disabled,
    onPress,
    onLongPress,
    style,
    children
  } = props

  let onProps = {}
  if (!disabled) {
    onProps = { onPress, onLongPress }
  }

  return platform.isIOS ? (
    <TouchableOpacity
      {...onProps}
      activeOpacity={0.8}
      style={style}
    >
      {children}
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback
      {...onProps}
      background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.15)')}
      style={style}
    >
      <View style={style}>
        {children}
      </View>
    </TouchableNativeFeedback>
  )
}
