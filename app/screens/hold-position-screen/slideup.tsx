import React from 'react'
// import { ViewStyle, TextStyle, Image } from 'react-native'
import { Button, View, Text, ImageIcon, SlideUp, Icon } from '../../components'
import { platform } from '../../theme'

const { px2dp } = platform

const COLOR3 = {
  color: '#333'
}
const COLOR9 = {
  color: '#999'
}

const DIVIDE = {
  height: px2dp(1),
  backgroundColor: 'rgba(97,97,97,0.2)'
}

const ICON = {
  width: px2dp(20),
  height: px2dp(20),
  marginLeft: px2dp(3)
}
const UP = {
  paddingHorizontal: px2dp(20),
}
const TITLECONTENT = {
  paddingVertical: px2dp(15),
}
const TITLE = {
  ...COLOR3,
  fontSize: 16
}
const UPCONTENT = {
  paddingVertical: px2dp(10),
  paddingHorizontal: px2dp(35),
}
const DETAIL = {
  marginTop: px2dp(10),
  marginBottom: px2dp(20)
}
const DETAILTLIST = {
  marginBottom: px2dp(5)
}

export interface SlideUpProps {
  item?: any,
  innerRef?: any,
  onChange?: Function,
}

export function Slide(props: SlideUpProps) {
  const { item, innerRef, onChange } = props
  return (
    <SlideUp
      ref={innerRef}
      style={UP}
    >
      <View style={TITLECONTENT} row align="center" justify="center">
        <Text style={TITLE}>{item.name}/USDT</Text>
        <ImageIcon icon='ex_binance' style={ICON} />
        <Button dark transparent style={{ position: 'absolute', right: 0 }} onPress={() => onChange()}>
          <Icon name="close" />
        </Button>
      </View>
      <View style={DIVIDE} />
      <View style={UPCONTENT}>
        <Text style={COLOR9}>操作详情</Text>
        <View style={DETAIL}>
          <View style={DETAILTLIST} row align="center" justify="space-between">
            <Text style={COLOR3}>开仓 {item.num1} {item.name} ({item.price1}$)</Text>
            <Text style={COLOR3}>{item.time1}</Text>
          </View>
          <View style={DETAILTLIST} row align="center" justify="space-between">
            <Text style={COLOR3}>加仓 {item.num2} {item.name} ({item.price2}$)</Text>
            <Text style={COLOR3}>{item.time2}</Text>
          </View>
          <View style={DETAILTLIST} row align="center" justify="space-between">
            <Text style={COLOR3}>减仓 {item.num3} {item.name} ({item.price3}$)</Text>
            <Text style={COLOR3}>{item.time3}</Text>
          </View>
          {item.hold === 0 && <View style={DETAILTLIST} row align="center" justify="space-between">
            <Text style={COLOR3}>平仓 {item.num4} {item.name} ({item.price4}$)</Text>
            <Text style={COLOR3}>{item.time4}</Text>
          </View>}
        </View>
        {item.hold === 0 && <Text center >——交易结束——</Text>}
      </View>
    </SlideUp>
  )
}
