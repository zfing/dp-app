import * as React from "react"
import { observer } from "mobx-react"
import { ViewStyle, ImageStyle, TextStyle, Image } from "react-native"
import { Button, Screen, Text } from "../../components"
import { platform } from '../../theme'
import { NavigationScreenProps } from "react-navigation"
import { images } from '../../assets/images'

const { px2dp } = platform

export interface RenewalResultScreenProps extends NavigationScreenProps {
}

const ROOT: ViewStyle = {
  backgroundColor: '#fff',
  paddingHorizontal: px2dp(20),
  alignItems: 'center',
}

const IMG: ImageStyle = {
  width: px2dp(100),
  height: px2dp(100),
  marginVertical: px2dp(30)
}
const TEXT: TextStyle = {
  marginBottom: px2dp(15)
}
const BUTTON = {
  marginTop: px2dp(30),
}

// @inject("mobxstuff")
@observer
export class RenewalResultScreen extends React.Component<RenewalResultScreenProps, {}> {
  render () {
    const { end } = this.props.navigation.state.params
    return (
      <Screen style={ROOT}>
        <Image
          style={IMG}
          source={images.bind_result}
        />
        <Text gary small style={TEXT}>付费成功</Text>
        <Text gary small>到期时间为: {end}</Text>
        <Button
          style={BUTTON}
          block
          text="确定"
          onPress={() => this.props.navigation.popToTop()}
        />
      </Screen>
    )
  }
}
