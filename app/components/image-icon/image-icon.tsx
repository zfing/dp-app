import * as React from 'react'
import { View, Image, ImageStyle, ViewStyle } from 'react-native'
import { mergeStyle } from '../../utils/merge-style'
import { icons, IconTypes } from '../../assets'
import { platform } from '../../theme'

const { px2dp } = platform

export interface ImageIconProps {
  style?: ImageStyle
  size?: number
  containerStyle?: ViewStyle
  icon?: IconTypes
}

const ROOT: ImageStyle = {
  resizeMode: 'contain',
}

export function ImageIcon(props: ImageIconProps) {
  const {
    style: styleOverride,
    icon,
    size,
    containerStyle
  } = props

  const sizeStyle: ImageStyle = {}
  if (size) {
    sizeStyle.width = px2dp(size)
    sizeStyle.height = px2dp(size)
  }

  const style: ImageStyle = mergeStyle([ROOT, sizeStyle, styleOverride])

  return (
    <View style={containerStyle}>
      <Image style={style} source={icons[icon]} />
    </View>
  )
}
