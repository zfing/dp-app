import React from 'react'
import { View, Text, ImageIcon } from '../../components'
import { platform } from '../../theme'
import { ViewStyle, TextStyle, ImageStyle } from 'react-native'

const { px2dp } = platform

const COLOR9 = {
  color: '#999'
}
const FONT16 = {
  fontSize: 16,
}
const ACCOUNT: ViewStyle = {
  backgroundColor: '#fff',
  paddingHorizontal: px2dp(20),
  paddingTop: px2dp(15),
  paddingBottom: px2dp(10),
  // marginTop: px2dp(10),
}
const TOTAL: TextStyle = {
  marginRight: px2dp(20),
  lineHeight: 26,
}
const ICON: ImageStyle = {
  marginHorizontal: px2dp(3),
  width: px2dp(16), 
  height: px2dp(12)
}
const ACCOUNTTOP: ViewStyle = {
  marginBottom: px2dp(20)
}
const ACCOUNTTOPLAYOUT: ViewStyle = {
  marginBottom: px2dp(6)
}

const MR: ViewStyle = {
  marginRight: px2dp(25)
}
const MT: ViewStyle = {
  ...FONT16,
  marginTop: px2dp(6),
}
const MT1: TextStyle = {
  ...MT,
  color: '#0BA194',
}
const MT3: TextStyle = {
  ...MT,
  color: '#FF3B30'
}
export interface AccountProps { }

export function Account(props: AccountProps) {
  return (
    <View style={ACCOUNT}>
      <View style={ACCOUNTTOP}>
        <View style={ACCOUNTTOPLAYOUT} row align="center" justify="space-between">
          <Text small style={COLOR9}>账户总资产</Text>
        </View>
        <View row align="flex-end">
          <Text bold largest style={TOTAL}>$ 23243.43</Text>
          <View row align="flex-end" style={{paddingBottom: 5}}>
            <Text small style={COLOR9}>赞，今日盈利</Text>
            <ImageIcon icon="up" style={ICON} />
            <Text small style={COLOR9}>$2313</Text>
          </View>
        </View>
      </View>
      <View row>
        <View style={MR}>
          <Text small style={COLOR9}>月收益额</Text>
          <Text style={MT1}>$1234</Text>
        </View>
        <View style={MR}>
          <Text small style={COLOR9}>月收益率</Text>
          <Text style={MT1}>34%</Text>
        </View>
        <View style={MR}>
          <Text small style={COLOR9}>总收益额</Text>
          <Text style={MT1}>$1232</Text>
        </View>
        <View style={MR}>
          <Text small style={COLOR9}>最大回撤</Text>
          <Text style={MT3}>23%</Text>
        </View>
      </View>
    </View>
  )
}
