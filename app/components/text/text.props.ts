import { TextStyle, TextProps as TextProperties } from 'react-native'

export interface TextProps extends TextProperties {
  // [key:string]: any
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: object

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: TextStyle | TextStyle[]

  note?: boolean
  primary?: boolean
  center?: boolean
  right?: boolean
  small?: boolean
  least?: boolean
  bold?: boolean
  largest?: boolean
  green?: boolean
  gary?: boolean
}
