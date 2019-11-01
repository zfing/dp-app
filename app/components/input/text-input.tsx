import * as React from 'react'
import { TextInput as  RNTextInput, TextInputProperties } from 'react-native'

export function TextInput(props: TextInputProperties) {
  const { onChangeText, ...rest } = props
  return (
    <RNTextInput
      autoCapitalize='none'
      autoCorrect={false}
      {...rest}
      onChangeText={(text = '') => onChangeText && onChangeText(text.trim())}
    />
  )
}