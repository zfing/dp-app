import * as React from 'react'
import { View, ViewStyle, Animated } from 'react-native'
import { mergeStyle } from '../../utils/merge-style'
import { Text } from '../text'

const ROOT: ViewStyle = {
  display: 'flex',
  overflow: 'hidden'
}

const ITEM: ViewStyle = {
  justifyContent: 'center',
}

export interface MarqueeProps {
  height: number
  items?: any[] | []
  renderItem: (dataItem: any) => React.ReactNode
  style?: ViewStyle
  ms?: number
}
interface ItemType {
  order: number
  text: string
}
/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export class Marquee extends React.PureComponent<MarqueeProps> {
  static defaultProps = {
    height: 30,
    renderItem: (dataItem: any) => <Text>{dataItem}</Text>,
    ms: 3000
  }

  state: {
    items: [] | ItemType[],
  }

  constructor(props: Readonly<MarqueeProps>) {
    super(props)
    this.state = {
      items: props.items
    }
  }

  timer = null

  current = 0

  animatedY = new Animated.Value(0)

  componentDidMount = () => {
    this.run()
  }

  reverse = () => {
    const items = [...this.state.items]
    for (let i = 1; i < items.length; i++) {
      items.push(items.shift())
    }
    this.setState({ items })
  }

  run = () => {
    const { height, items } = this.props

    const isEnd = this.current === items.length - 1

    if (isEnd) {
      this.reverse()
      this.current = 0
      this.animatedY.setValue(0)
    } else {
      this.current = this.current + 1
    }

    this.timer = setTimeout(() => {
      Animated.spring(this.animatedY, {
        toValue: this.current * -height
      }).start(this.run)
    }, this.props.ms)
  }

  componentWillMount() {
    clearTimeout(this.timer)
  }

  render () {
    // grab the props
    const {
      height,
      renderItem,
      style: styleOverride,
      ...rest
    } = this.props

    const style = mergeStyle([ROOT, { height }, styleOverride])
    const itemStyle: ViewStyle = mergeStyle([ITEM, { height }])
    const { items = [] } = this.state

    return (
      <View style={style} {...rest}>
        <Animated.View
          style={{
            transform: [{ translateY: this.animatedY }]
          }}
        >
          {items.map((item, key) => (
            <View style={itemStyle} key={key}>
              {renderItem(item)}
            </View>
          ))}
        </Animated.View>
      </View>
    )
  }
}
