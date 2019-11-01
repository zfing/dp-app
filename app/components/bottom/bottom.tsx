import * as React from 'react'
import { ViewStyle } from 'react-native'
import { platform } from '../../theme'
import { mergeStyle } from '../../utils/merge-style'
import { View, ViewProps } from '../view'

const { px2dp, isIphoneX } = platform

const ROOT: ViewStyle = {
  position: 'absolute',
  bottom: isIphoneX ? px2dp(40) : px2dp(20),
  left: 0,
  right: 0,
}

export interface BottomProps extends ViewProps {
  children?: React.ReactNode
  style?: ViewStyle
}

export function Bottom(props: BottomProps) {
  const {
    style: styleOverride,
    ...rest
  } = props
  const style = mergeStyle([ROOT, styleOverride])
  return (
    <View style={style} {...rest}>
      {props.children}
    </View>
  )
}
