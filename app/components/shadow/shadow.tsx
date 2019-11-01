import React from 'react'
import { ViewStyle } from 'react-native'
import { View } from '../../components'
import { platform } from '../../theme'
import { mergeStyle } from '../../utils/merge-style'

const { px2dp } = platform

const ROOT: ViewStyle = {
  shadowOffset: { width: 0, height: 3 },
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 1,
  marginBottom: px2dp(10),
}

export interface ShadowProps {
  children?: React.ReactNode
  style?: ViewStyle | ViewStyle[]
}

export function Shadow (props: ShadowProps) {
  const {
    children,
    style: styleOverride,
  } = props

  const style = mergeStyle([ROOT, styleOverride])

  return (
    <View style={style} >
      {children}
    </View>
  )
}
