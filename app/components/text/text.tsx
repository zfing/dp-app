import * as React from 'react'
import { TextStyle } from 'react-native'
import { Text as NativeBaseText } from 'native-base'
import { TextProps } from './text.props'
import { translate } from '../../i18n'
import { mergeStyle } from '../../utils/merge-style'

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const {
    tx,
    txOptions,
    text,
    children,
    center,
    right,
    style: styleOverride,
    ...rest
  } = props

  const extendStyle: TextStyle = {}

  if (center) {
    extendStyle.textAlign = 'center'
  } else if (right) {
    extendStyle.textAlign = 'right'
  }

  const style = mergeStyle([extendStyle, styleOverride])

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <NativeBaseText {...rest} style={style} includeFontPadding={false}>
      {content}
    </NativeBaseText>
  )
}
