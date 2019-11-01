import React from 'react'
import { ViewStyle, TextStyle, Alert } from 'react-native'
import { View, Text, Touchable, ImageIcon } from '../../components'
import { platform } from '../../theme'
import { CardTitle } from '../kol-detail-screen/card-title'
import { valueFixed, valueWithColor } from '../../utils/values'

const { px2dp } = platform

const ROOT: ViewStyle = {
  backgroundColor: '#fff',
  marginBottom: px2dp(10),
}

const MAIN: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: px2dp(30),
  paddingTop: px2dp(5),
  paddingBottom: px2dp(15),
}

const PART: ViewStyle = {
  flex: 1,
}

const NAME: TextStyle = {
  fontSize: 12,
  color: '#999',
  marginVertical: px2dp(5),
  marginRight: px2dp(5),
}

const PROFITLT: TextStyle = {
  fontSize: 24,
  lineHeight: 28,
  marginBottom: px2dp(15),
  color: '#000',
  fontWeight: 'bold',
}

export interface AccountCardProps {
  detail?: any
}

export function AccountCard (props: AccountCardProps) {
  const { detail = {} } = props

  return (
    <View style={ROOT}>
      <CardTitle title="账户概览" />
      <View style={MAIN}>
        <View style={PART}>
          <View row align="center">
            <Text style={NAME}>财产总资产</Text>
            <Touchable onPress={() =>
              Alert.alert('','仅展示当周交易盈利最多的品种前五名',[{text:'确定'}])
            }>
              <ImageIcon size={12} icon="message" />
            </Touchable>
          </View>
          <Text style={PROFITLT}>${valueFixed(detail.balance, 0)}</Text>
          <View row align="center">
            <Text style={NAME}>累计收益</Text>
            <Text style={valueWithColor(NAME, detail.totalP)}>${valueFixed(detail.totalP, 0)}</Text>
          </View>
        </View>
        <View style={PART}>
          <Text style={NAME}>总收益率<Text note least>（近6个月）</Text></Text>
          <Text style={valueWithColor(PROFITLT, detail.totalPR)}>{valueFixed(detail.totalPR, 1)}%</Text>
          <View row align="center">
            <Text style={NAME}>最大回撤</Text>
            <Text style={NAME}>40%</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
