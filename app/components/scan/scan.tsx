import * as React from "react"
import { Modal, ViewStyle, ImageBackground } from "react-native"
import { RNCamera } from 'react-native-camera'
import { images } from '../../assets/images'

export interface ScanProps {
  visible?: boolean;
  style?: ViewStyle
  onOk: (data: string) => void
}

const ROOT: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: 'center',
}

const SCAN: ViewStyle = {
  width: 260,
  height: 260,
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export class Scan extends React.PureComponent<ScanProps> {
  camera = null
  state: {
    visible: boolean
  }

  constructor(props: Readonly<ScanProps>) {
    super(props)
    this.state = {
      visible: props.visible || false,
    }
  }

  open = () => {
    this.setState({ visible: true })
  }

  close = () => {
    this.setState({ visible: false })
  }

  onBarCodeRead = (ret: { data: string; }) => {
    this.close()
    this.props.onOk(ret.data)
  }

  render() {

    return (
      <Modal
        transparent
        animationType="none"
        visible={this.state.visible}
        supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
        onRequestClose={this.close}
      >
        <RNCamera
          ref={ref => { this.camera = ref }}
          autoFocus={RNCamera.Constants.AutoFocus.on}/*自动对焦*/
          style={ROOT}
          type={RNCamera.Constants.Type.back}/*切换前后摄像头 front前back后*/
          flashMode={RNCamera.Constants.FlashMode.off}/*相机闪光模式*/
          onBarCodeRead={this.onBarCodeRead}
        >
          <ImageBackground source={images.scan} style={SCAN} />
        </RNCamera>
      </Modal>
    )
  }
}
