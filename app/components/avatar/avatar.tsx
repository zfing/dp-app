import * as React from 'react'
import { ViewStyle, Image, ImageStyle, TextStyle } from 'react-native'
import { Text } from '../text'
import { View } from '../view'
import { Icon } from 'native-base'
import { platform } from '../../theme'
import { Touchable } from '../touchable'
import { icons } from '../../assets/icons'

const { px2dp } = platform

export interface AvatarProps {
  onPress?: () => void,
  onLongPress?: () => void
  style?: ViewStyle
  name?: string
}

const ROOT: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: px2dp(11),
  paddingRight: px2dp(11),
}

const LEFT: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}

const IMAGE: ImageStyle = {
  width: px2dp(50),
  height: px2dp(50),
  margin: px2dp(16),
}

const INFO: ViewStyle = {
  height: px2dp(45),
  justifyContent: "space-between"
}

const NAME: TextStyle = {
  fontSize: 18,
}

const ARROW: TextStyle = {
  fontSize: 14,
  color: '#ccc',
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function Avatar(props: AvatarProps) {
  // grab the props
  const {
    onPress,
    onLongPress,
    name
  } = props

  return (
    <Touchable
      onPress={onPress}
      onLongPress={onLongPress}
      style={ROOT}
    >
      <View style={LEFT}>
        <Image style={IMAGE} source={icons.avatar} />
        <View style={INFO}>
          <Text style={NAME}>{name}</Text>
          <Text note small>您暂时还没有自我介绍哦～</Text>
        </View>
      </View>
      <Icon style={ARROW} name="right" type="AntDesign" />
    </Touchable>
  )
}
