import * as React from 'react'
import { ViewStyle } from 'react-native'
import { View } from '../view'
import { PickerView } from './picker-view'

const ROOT: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
}

const ITEM: ViewStyle = {
  flex: 1,
}

interface ModelItemType {
  labelKey?: string,
  valueKey?: string,
  childKey?: string,
}

interface DataItemType {
  deep?: 0,
  father?: string,
  label?: string,
  value?: string,
  child?: [],
}

export interface PickerViewMultiProps {
  model?: [] | ModelItemType[];
  dataSource?: any[];
  selectedValue?: string[];
  onValueChange?: (selectedValue: any[]) => void
}

export class PickerViewMulti extends React.Component<PickerViewMultiProps, {}> {
  relationList: any[]

  selectedValue: any[]

  state: {
    selectedValue: any[]
  }

  constructor(props: Readonly<PickerViewMultiProps>) {
    super(props)
    this.relationList = this.getRelationList()
    this.selectedValue = props.selectedValue || []
    this.state = {
      selectedValue: this.selectedValue
    }
  }

  formatData2TreeByModel = (dataSource, deep = 0, father = '') => {
    const { labelKey, valueKey, childKey } = this.props.model[deep]
    return dataSource.map((item, index: number) => {
      let label: any
      let value: any
      let child = []

      if (labelKey) {
        label = item[labelKey]
      } else if (valueKey) {
        label = item[valueKey]
      } else {
        label = item
      }
      if (valueKey) {
        value = item[valueKey]
      } else {
        value = item
      }

      if (childKey) {
        child = item[childKey]
      }

      if (Array.isArray(child) && child.length) {
        child = this.formatData2TreeByModel(child, deep + 1, value)
      }

      return {
        father,
        deep,
        label,
        value,
        child
      }
    })
  }

  getTreeData = (): DataItemType[] => {
    const { dataSource, model } = this.props
    return model.length ? this.formatData2TreeByModel(dataSource) : dataSource
  }

  flatten = () => {
    const flattenData = []
    const loop = (data: DataItemType[]) => {
      data.forEach((dataItem: DataItemType) => {
        const { child, ...rest } = dataItem
        flattenData.push(rest)
        child.length && loop(child)
      })
    }
    loop(this.getTreeData())
    return flattenData
  }

  getRelationList = () => {
    const relationList = []
    const flattenData = this.flatten()

    flattenData.forEach(item => {
      if (relationList[item.deep]) {
        relationList[item.deep].push(item)
      } else {
        relationList[item.deep] = [item]
      }
    })

    return relationList
  }

  getRenderDataList = () => {
    const selectedValue = this.state.selectedValue || []
    const relationList = this.relationList
    const newRelationList = []

    for (let i = 0; i < relationList.length; i++) {
      let list = relationList[i]
      if (i !== 0) {
        list = list.filter(item => item.father === selectedValue[i - 1])
      }

      if (selectedValue[i] === undefined) {
        selectedValue[i] = list[0].value
      }

      newRelationList.push(list)
    }

    this.selectedValue = selectedValue
    return newRelationList
  }

  _onValueChange = (index) => {
    let selectedValue = [...this.state.selectedValue]
    selectedValue = selectedValue.slice(0, index + 1)
    return value => {
      selectedValue[index] = value
      this.setState({ selectedValue }, () => {
        if (this.props.onValueChange) {
          this.props.onValueChange(this.selectedValue)
        }
      })
    }
  }

  render () {
    return (
      <View style={ROOT}>
        {this.getRenderDataList().map((item: any[], index: number) => (
          <View style={ITEM} key={`${item[0].value}${index}`}>
            <PickerView
              dataSource={item}
              onValueChange={this._onValueChange(index)}
            />
          </View>
        ))}
      </View>
    )
  }
}
