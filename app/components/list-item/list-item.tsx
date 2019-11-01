import * as React from 'react'
import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Icon } from 'native-base'
import { mergeAll, flatten } from 'ramda'
import { Text } from '../text'
import { View } from '../view'
import { platform, color } from '../../theme'
import { Touchable } from '../touchable'
import { ImageIcon } from '../image-icon'
import { ListContext } from '../list'

const { px2dp } = platform

export interface ListItemProps {
  icon?: any
  title?: string
  text?: string
  arrow?: boolean
  note?: React.ReactNode
  onPress?: () => void
  onLongPress?: () => void

  titleStyle?: ViewStyle
  arrowStyle?: ViewStyle
  noteStyle?: ViewStyle
  style?: ViewStyle
  iconStyle?: ImageStyle

  noteActive?: boolean
}

const ROOT: ViewStyle = {
  flexDirection: 'row',
  paddingLeft: px2dp(11),
  paddingRight: px2dp(11),
  height: px2dp(44),
  alignItems: 'center',
  justifyContent: 'space-between',
  // marginBottom: 2,
  backgroundColor: '#fff',
}

const ICON: ImageStyle = {
  margin: px2dp(10),
}

const LEFT: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}

const TITLE: TextStyle = {
  color: '#333333',
  fontSize: 14,
}

const RIGHT: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}

const NOTE: TextStyle = {
  fontSize: 14,
}

const ARROW: TextStyle = {
  fontSize: 14,
  color: '#ccc',
}

export class ListItem extends React.PureComponent<ListItemProps> {
  static contextType = ListContext;

  render () {
    const {
      style,
      icon,
      iconStyle,
      title,
      titleStyle: titleStyleOverride,
      arrow,
      arrowStyle: arrowStyleOverride,
      note,
      noteStyle: noteStyleOverride,
      onPress,
      onLongPress,
      noteActive,
    } = this.props

    const hasArrow = typeof arrow === 'boolean' ? arrow : JSON.parse(this.context)

    const rootStyle = mergeAll(flatten([ROOT, style]))
    const titleStyle = mergeAll(flatten([TITLE, titleStyleOverride]))
    const noteStyle = mergeAll(flatten([NOTE, noteStyleOverride]))
    const arrowStyle = mergeAll(flatten([ARROW, arrowStyleOverride, noteActive ? { color: color.theme } : { color: color.disabled }]))
    const icon_Style = mergeAll(flatten([ICON, iconStyle]))

    return (
      <Touchable
        onPress={onPress}
        onLongPress={onLongPress}
        style={rootStyle}
      >
        <View style={LEFT}>
          {icon && <ImageIcon style={icon_Style} icon={icon} />}
          {title && <Text style={titleStyle}>{title}</Text>}
        </View>
        <View style={RIGHT}>
          {note && <Text style={noteStyle} primary={noteActive} note={!noteActive}>{note}</Text>}
          {hasArrow && <Icon style={arrowStyle} name="right" type="AntDesign" />}
        </View>
      </Touchable>
    )
  }
}
