import * as React from 'react'
import { Modal, ViewStyle, TouchableHighlight, Animated } from 'react-native'
import { View } from '../view'

const ROOT: ViewStyle = {
  flex: 1,
  alignItems: 'flex-end',
  flexDirection: 'row',
  backgroundColor: '#00000077'
}

const CONTENT: ViewStyle = {
  backgroundColor: '#fff',
  height: 0,
  overflow: 'hidden'
}

export interface SlideUpProps {
  visible?: boolean;
  height?: number;
  onClose?: () => void;
  style?: ViewStyle
  children?: React.ReactNode
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export class SlideUp extends React.Component<SlideUpProps, {}> {
  state: {
    visible: boolean
  }

  animatedHeight = new Animated.Value(0);

  constructor(props: Readonly<SlideUpProps>) {
    super(props)
    this.state = {
      visible: props.visible || false,
    }
  }

  open = () => {
    this.setState({ visible: true }, () => {
      Animated.spring(this.animatedHeight, {
        toValue: this.props.height || 300,
      }).start()
    })
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

  _onMaskClick = () => {
    this.close()
  }

  render () {
    return (
      <Modal
        transparent
        animationType="none"
        visible={this.state.visible}
        supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
        onRequestClose={null}
      >
        <TouchableHighlight
          style={ROOT}
          activeOpacity={1}
          underlayColor='#00000077'
          onPress={this._onMaskClick}
        >
          <View />
        </TouchableHighlight>
        <Animated.View
          style={[CONTENT, { height: this.animatedHeight }]}
        >
          {this.props.children}
        </Animated.View>
      </Modal>
    )
  }
}
