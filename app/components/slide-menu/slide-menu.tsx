import * as React from 'react'
import { ViewStyle, Animated, TouchableHighlight } from 'react-native'
import { View } from '../view'

const CONTENT: ViewStyle = {
  backgroundColor: '#fff',
  height: 0,
  overflow: 'hidden'
}

export interface SlideMenuProps {
  visible?: boolean;
  height?: number;
  onClose?: () => void;
  style?: ViewStyle
  children?: React.ReactNode
  content?: React.ReactNode
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export class SlideMenu extends React.Component<SlideMenuProps, {}> {
  state: {
    visible: boolean
  }

  wrapperHeight: number

  animatedHeight = new Animated.Value(0);

  constructor(props: Readonly<SlideMenuProps>) {
    super(props)
    this.state = {
      visible: props.visible || false,
    }
    this.wrapperHeight = 0
  }

  open = () => {
    if (this.state.visible === false) {
      this.setState({ visible: true }, () => {
        Animated.spring(this.animatedHeight, {
          toValue: this.props.height || 300,
        }).start()
      })
    }
  }

  close = () => {
    Animated.timing(this.animatedHeight, {
      toValue: 0,
      duration: 200
    }).start(() => this.setState({ visible: false }, () => {
      if (this.props.onClose) {
        this.props.onClose()
      }
    }))
  }

  _onLayout = (e: any) => {
    this.wrapperHeight = e.nativeEvent.layout.height
  }

  render () {
    return (
      <React.Fragment>
        <View onLayout={this._onLayout}>
          {this.props.children}
        </View>
        {this.state.visible && (
          <View
            style={{
              flex: 1,
              width: '100%',
              position: 'absolute',
              display: 'flex',
              top: this.wrapperHeight,
              bottom: 0,
              zIndex: 99999,
            }}
          >
            <Animated.View
              style={[CONTENT, { height: this.animatedHeight }]}
            >
              {this.props.content}
            </Animated.View>
            <TouchableHighlight
              style={{ flex: 1 }}
              activeOpacity={1}
              underlayColor='transparent'
              onPress={this.close}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#00000077'
                }}
              />
            </TouchableHighlight>
          </View>
        )}
      </React.Fragment>
    )
  }
}
