import React from 'react'
// import { ViewStyle, TextStyle, Image } from 'react-native'
import { View, Text, Touchable } from '../../components'
import { platform } from '../../theme'

const { px2dp } = platform

const COLOR3 = {
  color: '#333'
}
const COLOR9 = {
  color: '#999'
}

const LISTSTYLE = {
  // marginTop: px2dp(10),
  backgroundColor: '#fff',
}
const LISTITEMTOP = {
  paddingVertical: px2dp(10),
  paddingHorizontal: px2dp(20),
}
const LISTITEMBOTTOM = {
  paddingHorizontal: px2dp(20),
  paddingVertical: px2dp(20),
}
const NAME = {
  ...COLOR3,
  fontSize: 16,
  marginRight: px2dp(6)
}
const SIGN = {
  backgroundColor: '#0BA194',
  color: '#fff',
  paddingHorizontal: px2dp(6),
  paddingVertical: px2dp(2),
  borderRadius: px2dp(4)
}
const INCOME = {
  color: '#0BA194',
  fontSize: 16
}
const DIVIDE = {
  height: px2dp(1),
  backgroundColor: 'rgba(97,97,97,0.2)'
}
const TEXT1 = {
  ...COLOR9,
  marginTop: px2dp(10)
}
const TEXT2 = {
  ...COLOR9,
  marginRight: px2dp(10)
}
const KC = {
  marginBottom: px2dp(20)
}

export interface TagProps {
  text?: string
}

export interface ListItemProps {
  item?: any,
  onPress?: () => void,
  alert?: any,
}

export function ListItem(props: ListItemProps) {
  const { item, onPress, alert } = props
  return (
    <Touchable
      onPress={onPress}
      style={LISTSTYLE}
    >
      <View style={LISTITEMTOP} row align="center" justify="space-between">
        <View>
          <View row align="center">
            <Text style={NAME}>{item.name}/USDT</Text>
            <Text small style={SIGN}>{item.sign}</Text>
          </View>
          {item.hold === 0 && <Text small style={TEXT1}>平仓原因：{item.reason}</Text>}
        </View>
        {item.operation ? <Touchable onPress={alert(true)}>
          <Text small style={SIGN}>{item.operation}</Text>
        </Touchable> : null }
      </View>

      <View style={DIVIDE} />

      <View style={LISTITEMBOTTOM}>
        <View style={KC} row align="center" justify="space-between">
          <View row align="center">
            <Text small style={TEXT2}>开仓均价</Text>
            <Text style={COLOR3}>{item.kaverage} $</Text>
          </View>
          <View row align="center">
            <Text small style={TEXT2}>收益金额</Text>
            <Text style={INCOME}>{item.income} $</Text>
          </View>
        </View>

        <View row align="center" justify="space-between">
          {item.hold === 0
            ? <View row align="center">
              <Text small style={TEXT2}>平仓均价</Text>
              <Text style={COLOR3}>{item.paverage} $</Text>
            </View>
            : <View row align="center">
              <Text small style={TEXT2}>持仓数量</Text>
              <Text style={COLOR3}>{item.num0} {item.name}</Text>
            </View>
          }
          <View row align="center">
            <Text small style={TEXT2}>收益率</Text>
            <Text style={INCOME}>{item.rate}%</Text>
          </View>
        </View>
      </View>
    </Touchable>
  )
}
