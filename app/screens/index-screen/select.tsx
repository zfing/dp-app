import React from 'react'
import { ViewStyle } from 'react-native'
import { View, SlideMenu } from '../../components'
import { platform } from '../../theme'
import { SelectItem } from './select-item'

const { px2dp, isIOS } = platform

const HEIGHT = isIOS ? px2dp(100) : px2dp(110)

const MENU: ViewStyle = {
  paddingHorizontal: px2dp(20),
  height: HEIGHT,
}

const MENU_BOX: ViewStyle = {
  flexWrap: 'wrap'
}

export const SELECT_LIST: any[] = [
  {
    name: '当前收益率',
    value: 4,
  },
  {
    name: '当前收益',
    value: 3,
  },
  {
    name: '总收益率',
    value: 6,
  },
  {
    name: '总收益额',
    value: 5,
  },
  {
    name: '综合排名',
    value: 1,
  },
  {
    name: '资金量',
    value: 2,
  },
]

export const getSelectTextByValue = (value) => {
  for (let i = 0; i < SELECT_LIST.length; i++) {
    const item = SELECT_LIST[i]
    if (value === item.value) {
      return item.name
    }
  }
  return ''
}

export interface SelectProps {
  tag: number
  onChange: (tag: number) => void
  innerRef: (ref: any) => void
}

export function Select (props: SelectProps) {
  const {
    tag = 1,
    innerRef,
    onChange
  } = props

  return (
    <SlideMenu
      height={HEIGHT}
      ref={innerRef}
      content={
        <View style={MENU}>
          <View style={MENU_BOX} row>
            {SELECT_LIST.map(item => (
              <SelectItem
                active={item.value === tag}
                key={item.value}
                text={item.name}
                onPress={() => onChange(item.value)}
              />
            ))}
          </View>
        </View>
      }
    >
      <View />
    </SlideMenu>
  )
}
