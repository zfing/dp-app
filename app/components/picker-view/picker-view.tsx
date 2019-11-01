import * as React from 'react'
import { ScrollView, ViewStyle, TextStyle, StyleSheet } from 'react-native'
import { propEq, findIndex } from 'ramda'
import { Text } from '../text'
import { View } from '../view'
import { platform } from '../../theme'
import { mergeStyle } from '../../utils/merge-style'

const ROOT: ViewStyle = {
  overflow: 'hidden',
}

const LIGHT: ViewStyle = {
  position: 'absolute',
  borderTopWidth: StyleSheet.hairlineWidth,
  borderBottomWidth: StyleSheet.hairlineWidth,
}

const ITEM: ViewStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const TEXT: TextStyle = {
  color: '#999',
}

const TEXT_ACTIVT: TextStyle = {
  color: '#333',
}

interface DataItemType {
  label?: string,
  value?: any,
}

export interface PickerViewProps {
  style?: ViewStyle;
  dataSource?: DataItemType[] | [];
  selectedIndex?: number;
  selectedValue?: any;
  renderItem?: (data: any, index: number, selected: boolean) => React.ReactNode;
  onValueChange?: (value: any, selectedIndex: number) => void;
  itemHeight?: number
  wrapperHeight?: number
  highlightColor?: string
}

export class PickerView extends React.Component<PickerViewProps, {}> {
  sview: any

  timer: any

  dragStarted: boolean

  isScrollTo: boolean

  momentumStarted: boolean

  itemHeight: number

  wrapperHeight: number

  state: {
    selectedIndex: number
  }

  constructor(props: Readonly<PickerViewProps>) {
    super(props)
    this.sview = null
    this.timer = null
    this.dragStarted = false
    this.isScrollTo = false
    this.momentumStarted = false

    this.itemHeight = props.itemHeight || 30
    this.wrapperHeight = props.wrapperHeight || (props.style ? Number(props.style.height) : 0) || this.itemHeight * 5

    const selectedIndex = props.selectedValue !== undefined
      ? this._getSelectedIndex(props.selectedValue)
      : (props.selectedIndex || 0)

    this.state = {
      selectedIndex,
    }
  }

  componentDidMount() {
    if (this.props.selectedIndex) {
      setTimeout(() => {
        this.scrollToIndex(this.props.selectedIndex)
      }, 0)
    } else if (this.props.selectedValue !== undefined) {
      setTimeout(() => {
        const selectedIndex = this._getSelectedIndex(this.props.selectedValue)
        this.scrollToIndex(selectedIndex === -1 ? 0 : selectedIndex)
      }, 0)
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  _getSelectedIndex = (selectedValue: any): number => {
    return findIndex(propEq('value', selectedValue))(this.props.dataSource)
  }

  _onScrollBeginDrag = () => {
    this.dragStarted = true
    if (platform.isIOS) {
      this.isScrollTo = false
    }
    this.timer && clearTimeout(this.timer)
  }

  _onScrollEndDrag = (e: { nativeEvent: { contentOffset: { y: any; }; }; }) => {
    this.dragStarted = false
    // if not used, event will be garbaged
    const _e = {
      nativeEvent: {
        contentOffset: {
          y: e.nativeEvent.contentOffset.y,
        },
      },
    }
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      if (!this.momentumStarted && !this.dragStarted) {
        this._scrollFix(_e)
      }
    }, 10)
  }

  _onMomentumScrollBegin = () => {
    this.momentumStarted = true
    this.timer && clearTimeout(this.timer)
  }

  _onMomentumScrollEnd = (e: { nativeEvent: { contentOffset: { y: number; }; }; }) => {
    this.momentumStarted = false
    if (!this.isScrollTo && !this.momentumStarted && !this.dragStarted) {
      this._scrollFix(e)
    }
  }

  _scrollFix = (e: { nativeEvent: { contentOffset: { y: number; }; }; }) => {
    let y = 0
    const h = this.itemHeight
    if (e.nativeEvent.contentOffset) {
      y = e.nativeEvent.contentOffset.y
    }
    const selectedIndex = Math.round(y / h)
    const _y = selectedIndex * h

    if (_y !== y) {
      // using scrollTo in ios, onMomentumScrollEnd will be invoked
      if (platform.isIOS) {
        this.isScrollTo = true
      }
      this.sview.scrollTo({ y: _y })
    }

    if (this.state.selectedIndex === selectedIndex) {
      return
    }

    if (this.props.onValueChange) {
      const selectedValue = this.props.dataSource[selectedIndex].value
      this.setState({ selectedIndex })
      this.props.onValueChange(selectedValue, selectedIndex)
    }
  }

  _renderPlaceHolder = () => {
    const h = (this.wrapperHeight - this.itemHeight) / 2
    const header = <View style={{ height: h, flex: 1, }}></View>
    const footer = <View style={{ height: h, flex: 1, }}></View>
    return { header, footer }
  }

  _renderItem = (item: DataItemType, index: number) => {
    const { renderItem } = this.props
    const selected = index === this.state.selectedIndex
    return (
      <View key={index} style={[ITEM, { height: this.itemHeight }]}>
        {renderItem ? renderItem(item, index, selected) : (
          <Text style={mergeStyle([TEXT, selected && TEXT_ACTIVT])}>
            {item.label}
          </Text>
        )}
      </View>
    )
  }

  scrollToIndex(index: number) {
    this.setState({ selectedIndex: index })
    const y = this.itemHeight * index
    this.sview.scrollTo({ y: y })
  }

  getSelected() {
    const selectedIndex = this.state.selectedIndex
    const selectedValue = this.props.dataSource[selectedIndex]
    return selectedValue
  }

  render() {
    const {
      dataSource = [],
      style: styleOverride,
      highlightColor = '#ccc'
    } = this.props

    const { header, footer } = this._renderPlaceHolder()
    const style = mergeStyle([ROOT, { height: this.wrapperHeight }, styleOverride])

    const highlightWidth = (styleOverride ? Number(styleOverride.width) : 0) || platform.deviceWidth
    const lightStyle = mergeStyle([LIGHT, {
      top: (this.wrapperHeight - this.itemHeight) / 2,
      height: this.itemHeight,
      width: highlightWidth,
      borderTopColor: highlightColor,
      borderBottomColor: highlightColor,
    }])
    return (
      <View style={style}>
        <View style={lightStyle}/>
        <ScrollView
          ref={(sview) => { this.sview = sview }}
          bounces={false}
          showsVerticalScrollIndicator={false}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollBeginDrag={this._onScrollBeginDrag}
          onScrollEndDrag={this._onScrollEndDrag}
        >
          {header}
          {dataSource.map(this._renderItem)}
          {footer}
        </ScrollView>
      </View>
    )
  }
}
