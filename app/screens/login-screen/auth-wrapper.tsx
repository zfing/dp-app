import * as React from 'react'
import { ViewStyle, ImageStyle, TextStyle, Image } from 'react-native'
import { View, Screen, H1, Bottom, Touchable, Text } from '../../components'
import { platform } from '../../theme'

const { px2dp } = platform

const ROOT: ViewStyle = {
  padding: px2dp(20),
  flex: 1,
  height: '100%',
  justifyContent: 'space-between'
}

const IMAGE_BOX: ViewStyle = {
  alignItems: 'center',
  marginTop: px2dp(30),
  marginBottom: px2dp(50),
}

const IMAGE: ImageStyle = {
  width: px2dp(64),
  height: px2dp(64),
  borderRadius: 8,
}

const TITLE: TextStyle = {
  marginTop: px2dp(8),
}

export interface AuthWrapperProps {
  children?: React.ReactNode
  navigation?: any
  self?: boolean
}

export function AuthWrapper(props: AuthWrapperProps) {
  const { navigation, self } = props
  return (
    <Screen style={ROOT} backgroundColor="#fff">
      <View>
        <View style={IMAGE_BOX}>
          <Image style={IMAGE} source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }} />
          <H1 style={TITLE}>btoto</H1>
        </View>
        {props.children}
      </View>
      {!self && 
        <View>
          <Bottom align="center">
            <Touchable
              onPress={() => navigation.navigate('Forget')}
            >
              <Text note tx="忘记密码？" />
            </Touchable>
          </Bottom>
        </View>}
    </Screen>
  )
}
