import {
  Platform,
  Dimensions,
  PixelRatio,
} from 'react-native'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

const basePx = 375

const isIphoneX = Platform.OS === 'ios' && deviceHeight === 812 && deviceWidth === 375
const isIOS = Platform.OS === 'ios'
const isAndroid = Platform.OS === 'android'

export const platform = {
  deviceHeight,
  deviceWidth,
  px2dp: px => (px * deviceWidth) / basePx,
  onePixel: 1 / PixelRatio.get(),
  platform: Platform.OS,
  isIOS,
  isAndroid,
  isIphoneX
}
