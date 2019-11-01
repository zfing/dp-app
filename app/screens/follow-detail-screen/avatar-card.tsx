import React from 'react'
import { ViewStyle, ImageStyle, Image } from 'react-native'
import { View, Text, Touchable, ImageIcon } from '../../components'
import { platform } from '../../theme'
import { images } from '../../assets/images'

const { px2dp } = platform

const ROOT: ViewStyle = {
  backgroundColor: '#fff',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: px2dp(80),
  paddingHorizontal: px2dp(20),
  marginBottom: px2dp(10),
}

const INFOIMG: ImageStyle = {
  width: px2dp(48),
  height: px2dp(48),
  borderRadius: px2dp(24),
  marginRight: px2dp(20)
}

const FELLOETEXT = {
  color: true ? '#ccc' : '#108EE9',
}

const FOLLOW: ViewStyle = {
  width: px2dp(60),
  backgroundColor: '#fff',
  borderRadius: px2dp(4),
  borderColor: FELLOETEXT.color,
  borderWidth: px2dp(1),
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: px2dp(6),
  paddingHorizontal: px2dp(6)
}

const ICON: ImageStyle = {
  width: px2dp(10),
  height: px2dp(10),
  marginLeft: 6,
  marginRight: 2,
}

export interface AvatarCardProps {
  detail?: any
}

export function AvatarCard (props: AvatarCardProps) {
  const { detail = {} } = props
  return (
    <Touchable
      style={ROOT}
      // onPress={() => navigation.navigate('FirmOffer', { data: this.state.FirmData })}
    >
      <View row>
        <Image
          style={INFOIMG}
          source={images.info}
        />
        <View justify="space-between">
          <Text>您的{detail.nickName} {detail.exchange}跟单</Text>
          <Text note least>已经入驻300天</Text>
          <Text note least>他暂时还没有个人介绍哦～</Text>
        </View>
      </View>
      <Touchable style={FOLLOW} onPress={null}>
        <Text small style={FELLOETEXT}>{true ? '已关注' : '关注'}</Text>
      </Touchable>
    </Touchable>
  )
}
