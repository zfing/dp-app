import React from 'react'
import { TextInput as RNTextInput, TextInputProperties } from 'react-native'

export function NumberInput(props: TextInputProperties) {
  const { value = '', maxLength, onChangeText, ...rest } = props

  return (
    <RNTextInput
      autoCapitalize='none'
      autoCorrect={false}
      {...rest}
      contextMenuHidden
      maxLength={value.length}
      onKeyPress={({ nativeEvent }) => {
        const keyValue = nativeEvent.key || ''

        let nextValue = value

        if (keyValue === 'Backspace' && value.length) {
          nextValue = nextValue.substr(0, nextValue.length - 1)
        } else {
          nextValue += keyValue.replace(/[^\d]/g, '')
        }

        onChangeText(nextValue.substr(0, maxLength) || '')
      }}
      value={value}
      clearButtonMode="never"
      keyboardType="numeric"
    />
  )
}