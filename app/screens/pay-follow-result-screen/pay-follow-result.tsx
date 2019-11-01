import * as React from 'react'
import { observer } from 'mobx-react'
import { ViewStyle, ImageStyle, Image, TextStyle } from 'react-native'
import { platform } from '../../theme'
import { NavigationScreenProps } from 'react-navigation'
import { Button, Screen, Text } from '../../components'
import { images } from '../../assets/images'

const { px2dp } = platform

export interface PayFollowResultScreenProps extends NavigationScreenProps {
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

@observer
export class PayFollowResultScreen extends React.Component<PayFollowResultScreenProps, {}> {
  static navigationOptions = () => ({
    gesturesEnabled: false,
  })

  render () {
    const {name} = this.props.navigation.getParam('payload')
    return (
      <Screen style={ROOT}>
        <Image
          style={IMG}
          source={images.bind_result}
        />
        <Text gary small style={TEXT}>您已成功跟投{name}，我们将接管您的账户，请勿再自行操作</Text>
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
