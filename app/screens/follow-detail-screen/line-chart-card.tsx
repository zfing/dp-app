import React from 'react'
import { ViewStyle, TextStyle, Alert } from 'react-native'
import { View, Text, Touchable, ImageIcon, LineChart, Shadow } from '../../components'
import { platform } from '../../theme'
import { CardTitle } from '../kol-detail-screen/card-title'
import { handleProfitMonth, valueFixed } from '../../utils/values'

const { px2dp } = platform

const ROOT: ViewStyle = {
  backgroundColor: '#fff',
  marginBottom: px2dp(10),
}

const CHARTTITLE: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: px2dp(30),
  paddingVertical: px2dp(10),
}

const TEXT: TextStyle = {
  marginLeft: 10,
  marginRight: 5,
}

const CHART: TextStyle = {
  paddingHorizontal: px2dp(10),
  marginBottom: px2dp(20),
}

export interface LineCahrtCardProps {
  dataSource?: any[]
}

export function LineCahrtCard (props: LineCahrtCardProps) {
  const { dataSource = [] } = props

  const data = handleProfitMonth(dataSource)
  return (
    <Shadow style={ROOT} >
      <CardTitle title="数据图表" />

      <View style={CHARTTITLE}>
        <Text note small>总收益率</Text>
        <Text note small style={TEXT}>净值曲线</Text>
        <Touchable onPress={() =>
          Alert.alert('', '以10000美元进行模拟跟单的资产图表', [{ text: '确定' }])
        }>
          <ImageIcon size={12} icon="message" />
        </Touchable>
      </View>

      <View style={CHART}>
        <LineChart
          data={data.map(_ => ({
            ..._,
            x: `${_.year}-${_.month}`,
            y: valueFixed(_.pR * 100, 1),
          }))}
        />
      </View>
    </Shadow>
  )
}
