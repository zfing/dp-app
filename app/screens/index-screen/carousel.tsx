import React from 'react'
import { ViewStyle, ImageStyle, Image, ImageSourcePropType } from 'react-native'
import Swiper from 'react-native-swiper'
import { View, Touchable } from '../../components'
import { platform } from '../../theme'

const { px2dp } = platform

const ROOT: ViewStyle = {
  paddingHorizontal: px2dp(20),
  marginTop: px2dp(10),
  height: px2dp(100),
}

const DOT: ViewStyle = {
  backgroundColor: 'rgba(225,225,225,.4)',
  width: 8,
  height: 8,
  borderRadius: 4,
  margin: 3
}

const UN_DOT: ViewStyle = {
  ...DOT,
  backgroundColor: 'rgb(225,225,225)',
}

const IMG: ImageStyle = {
  borderRadius: px2dp(10),
  height: px2dp(100),
  width: '100%'
}

export interface CarouselProps {
  items?: ImageSourcePropType[]
}

export function Carousel (props: CarouselProps) {
  const {
    items = []
  } = props
  return (
    <View style={ROOT}>
      <Swiper
        loop={true}
        autoplayTimeout={5}
        autoplay={true}
        removeClippedSubviews={false}
        onIndexChanged={(index) => {}}
        paginationStyle={{ bottom: px2dp(10) }}
        dot={<View style={DOT}/>}
        activeDot={<View style={UN_DOT}/>}
      >
        {items.map((item) => (
          <Touchable>
            <Image style={IMG} source={item} resizeMode='cover' />
          </Touchable>
        ))}
      </Swiper>
    </View>
  )
}
