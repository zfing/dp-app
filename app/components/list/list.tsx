import * as React from 'react'
import { ViewStyle } from 'react-native'
import { mergeAll, flatten } from 'ramda'
import { View } from '../view'
import { platform } from '../../theme'

const { px2dp } = platform

const { createContext } = React
export const ListContext = createContext('List')
const { Provider } = ListContext

export interface ListProps {
  style?: ViewStyle
  children?: React.ReactNode
  arrow?: boolean
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function List(props: ListProps) {
  const {
    arrow,
    style: styleOverride,
    children,
    ...rest
  } = props

  const values = { arrow }

  const style = mergeAll(flatten([{
    marginTop: px2dp(10),
  }, styleOverride]))

  return (
    <Provider value={JSON.stringify(values)}>
      <View style={style} {...rest}>
        {children}
      </View>
    </Provider>
  )
}
