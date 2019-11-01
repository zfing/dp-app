import * as React from 'react'
import { Text, View } from '../../components'
import { platform } from '../../theme'

const { px2dp } = platform

const TITLE = {
  fontSize: px2dp(20),
}

const NOTE = {
  marginTop: px2dp(8),
}

export interface BlockItemProps {
  title?: string
  note?: string
}

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function BlockItem(props: BlockItemProps) {
  // grab the props
  const {
    title,
    note,
    ...rest
  } = props

  return (
    <View align="center" {...rest}>
      <Text style={TITLE}>{title}</Text>
      <Text note small style={NOTE}>{note}</Text>
    </View>
  )
}
