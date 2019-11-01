import * as React from 'react'
import { ViewStyle, TextStyle } from 'react-native'
import { VictoryChart, VictoryLine, VictoryBar, VictoryAxis } from 'victory-native'
import { Antv } from '../antv'
import { theme } from './theme'
import { View } from '../view'
import { Text } from '../text'

export interface LineProps {
  data?: any[]
  [key: string]: any
}

const TOOL: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 30,
  height: 30,
}

const TEXT: TextStyle = {
  fontSize: 12,
  transform: [{ rotateZ: '-45deg' }, { scale: 0.7 }],
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function SimpleLine(props: LineProps) {
  return (
    <VictoryLine
      padding={0}
      style={{
        data: {
          stroke: '#0BA194'
        },
      }}
      {...props}
    />
  )
}

export function LineChart(props) {
  const { data, ...rest } = props
  return (
    <Antv
      {...rest}
      type="line"
      data={data}
    />
  )
}

export function BarChart(props) {
  const { data, ...rest } = props
  return (
    <Antv
      {...rest}
      type="bar"
      data={data}
    />
  )
}
