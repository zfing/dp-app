import * as React from 'react'
import { Button as NativeBaseButton, Spinner } from 'native-base'
import { Text } from '../text'
import { ButtonProps } from './button.props'

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    tx,
    text,
    textStyle,
    disabled,
    light,
    loading,
    children,
    ...rest
  } = props

  const content = children || <Text tx={tx} text={text} style={textStyle} />

  return (
    <NativeBaseButton
      disabled={disabled || loading}
      light={light}
      {...rest}
    >
      {loading && <Spinner size={18} color={light ? '#ccc' : '#fff'}/>}
      {content}
    </NativeBaseButton>
  )
}
