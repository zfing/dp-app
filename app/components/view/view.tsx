import * as React from 'react'
import { View as RNView, ViewStyle, ViewProperties, FlexAlignType } from 'react-native'
import { mergeStyle } from '../../utils/merge-style'

export interface ViewProps extends ViewProperties {
  style?: ViewStyle | ViewStyle[];
  justify?: any
  align?: FlexAlignType
  row?: boolean
  children?: React.ReactNode
}

export function View(props: ViewProps) {
  const {
    style: styleOverride,
    row,
    justify,
    align,
    ...rest
  } = props

  const extendStyle: ViewStyle = {}

  if (row) {
    extendStyle.flexDirection = 'row'
  }
  if (justify) {
    extendStyle.justifyContent = justify
  }
  if (align) {
    extendStyle.alignItems = align
  }

  const style = mergeStyle([extendStyle, styleOverride])

  return <RNView style={style} {...rest} />
}
