import { mergeAll, flatten } from 'ramda'
import { ViewStyle, TextStyle, ImageStyle } from 'react-native'

export type MergeStyleType = (
  ViewStyle | ViewStyle[] | TextStyle | TextStyle[] | ImageStyle | ImageStyle[]
)[]

export function mergeStyle(styles?: MergeStyleType): object {
  return mergeAll(flatten(styles))
}
