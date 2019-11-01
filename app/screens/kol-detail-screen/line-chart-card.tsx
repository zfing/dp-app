import React, { useState } from 'react'
import { ViewStyle, TextStyle, ImageStyle, Alert } from 'react-native'
import { View, Text, Touchable, ImageIcon, LineChart } from '../../components'
import { platform, theme } from '../../theme'
import { CardTitle } from './card-title'
import { handleProfitMonth, valueFixed } from '../../utils/values'

const { px2dp } = platform

const ROOT: ViewStyle = {
  backgroundColor: '#fff',
  marginBottom: px2dp(10),
}

const CHARTTITLE: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: px2dp(20),
  paddingVertical: px2dp(10),
}
const TEXT_TITLE: TextStyle = {
  marginRight: px2dp(10),
  fontSize: 12,
}

const ICON: ImageStyle = {
  marginLeft: px2dp(-5)
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
  const [active, togActive]= useState(0)

  const data = handleProfitMonth(dataSource)

  const textColor = (style:any ,value:any) => {
    return {
      ...style,
      color: value ? theme.colors.primary.base : theme.colors.info.contrast
    }
  }
  return (
    <View style={ROOT} >
      <CardTitle title="数据图表" />

      <View style={CHARTTITLE}>
        {['收益率','预期跟单收益'].map((item,index) =>(
          <Text
            onPress={() => togActive(index)}
            style={textColor(TEXT_TITLE, active===index)}
          >
            {item}
          </Text>
          ))}
        <Touchable onPress={() =>
          Alert.alert('', '以10000美元进行模拟跟单的资产图表', [{ text: '确定' }])}
        >
          <ImageIcon size={12} style={ICON} icon="message" />
        </Touchable>
      </View>

      <View style={CHART}>
        {active === 0 ?
          <LineChart
            data={data.map(_ => ({
              ..._,
              x: `${_.year}-${_.month}`,
              y: valueFixed(_.pR * 100, 1),
            }))}
          /> :
          <LineChart
            data={[{x:0,y:0},{x:1,y:2},{x:2,y:2},{x:3,y:6},{x:4,y:7},{x:5,y:2},{x:6,y:12},{x:7,y:20}]}
          />
        }
      </View>

    </View>
  )
}
