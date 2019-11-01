import * as React from 'react'
import { View, ViewStyle, TextStyle } from 'react-native'
import { mergeStyle } from '../../utils/merge-style'
import { platform, theme } from '../../theme'
import { Touchable } from '../touchable'
import { Text } from '../text'

const { px2dp } = platform

const ROOT: ViewStyle = {
  height: px2dp(52),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}

const BUTTON: ViewStyle = {
  paddingHorizontal: px2dp(10),
  paddingVertical: px2dp(10),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const TEXT: TextStyle = {
  fontWeight: 'bold',
}

const LINE: ViewStyle = {
  position: 'absolute',
  bottom: 2,
  marginTop: px2dp(10),
  height: px2dp(4),
  width: px2dp(14),
  borderRadius: px2dp(2),
  backgroundColor: theme.colors.primary.base,
}

export interface ScrollTabBarProps {
  style?: ViewStyle | ViewStyle[]
  tabs: []
  activeTab: number
  goToPage: (page: number) => void
}

export function ScrollTabBar(props: ScrollTabBarProps) {
  const {
    style: styleOverride,
    tabs,
    activeTab,
    goToPage,
    ...rest
  } = props

  const style = mergeStyle([ROOT, styleOverride])

  return (
    <View style={style} {...rest}>
      {tabs.map((name, page) => {
        const isActive = activeTab === page
        return (
          <Touchable
            key={name}
            style={BUTTON}
            onPress={() => goToPage(page)}
          >
            <Text style={TEXT} note primary={isActive}>{name}</Text>
            {isActive && <View style={LINE} />}
          </Touchable>
        )
      })}
    </View>
  )
}
