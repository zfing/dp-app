import React from 'react'
import { ViewStyle, TextStyle } from 'react-native'
import { Text, Touchable, TouchableProps } from '../../components'
import { platform, theme } from '../../theme'

const { px2dp } = platform

const ROOT: ViewStyle = {
  padding: px2dp(4),
  backgroundColor: '#CCCCCC',
  marginRight: px2dp(24),
  marginTop: px2dp(12),
  borderRadius: 4,
}

const ROOT_ACTIVE: ViewStyle = {
  ...ROOT,
  backgroundColor: '#108EE94D',
}

const TEXT: TextStyle = {
  fontSize: 12,
  color: '#fff',
}

const TEXT_ACTIVE: TextStyle = {
  ...TEXT,
  color: theme.colors.primary.base,
}

export interface SelectItemProps extends TouchableProps {
  text?: string
  active?: boolean
}

export function SelectItem (props: SelectItemProps) {
  const {
    active,
    text = '',
    ...rest
  } = props

  return (
    <Touchable style={active ? ROOT_ACTIVE : ROOT} {...rest}>
      <Text style={active ? TEXT_ACTIVE : TEXT} tx={text} />
    </Touchable>
  )
}
