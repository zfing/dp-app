import React from 'react'
import { ViewStyle } from 'react-native'
import { View, Text, Touchable, Shadow } from '../../components'
import { platform } from '../../theme'
import { CardTitle } from './card-title'

const { px2dp } = platform

const LIST_ITEM: ViewStyle = {
  height: px2dp(35),
  // paddingTop: px2dp(16),
  // paddingBottom: px2dp(11),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottomColor: 'rgba(97,97,97,0.2)',
  borderBottomWidth: 1,
}

interface ListItemProps {
  title?: string
  value?: string
  isEnd?: boolean
  onPress?: () => void
}

function ListItem(props: ListItemProps) {
  const {
    title,
    value,
    isEnd,
    onPress
  } = props

  const child = (
    <React.Fragment>
      <Text note small>{title}</Text>
      <View row align="center">
        <Text small>{value}</Text>
        {onPress && <Text small>{' >'}</Text>}
      </View>
    </React.Fragment>
  )
  const style = isEnd ? {
    ...LIST_ITEM,
    borderBottomColor: 'white'
  } : LIST_ITEM
  return onPress ? (
    <Touchable style={style}>{child}</Touchable>
  ) : (
    <View style={style}>{child}</View>
  )
}

const ROOT: ViewStyle = {
  backgroundColor: '#fff',
  marginBottom: px2dp(10),
}

const MAIN: ViewStyle = {
  paddingHorizontal: px2dp(30),
  paddingBottom: px2dp(20),
}

export interface DetailCardProps {
  detail?: any
}

export function DetailCard (props: DetailCardProps) {
  const { detail = {} } = props
  return (
    <View style={ROOT} >
      <CardTitle title="高级数据" />

      <View style={MAIN}>
        <ListItem
          title="当前持仓"
          value="4"
          onPress={() => navigation.navigate('HoldPosition', { hold: 1, data: this.state.cData, newData: this.newCData })}
        />
        <ListItem
          title="历史持仓"
          value="4"
          onPress={() => navigation.navigate('HoldPosition', { hold: 1, data: this.state.cData, newData: this.newCData })}
        />
        <ListItem title="每周平均收益率" value="12.3%" />
        <ListItem title="每周平均收益金额" value="$4" />
        <ListItem title="平均持仓时间" value="4H" />
        <ListItem title="大连续盈利次数" value="4" />
        <ListItem title="最大连续亏损次数" value="4" />
        <ListItem title="交易期望值" value="$56" />
        <ListItem title="交易胜率" value="86.45%" />
        <ListItem title="利润因子" value="1.23" isEnd />
      </View>
    </View>
  )
}
