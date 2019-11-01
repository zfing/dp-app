import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { ViewStyle, Image, ImageStyle, TextStyle } from 'react-native'
import { platform, theme } from '../../theme'
import { NavigationScreenProps } from 'react-navigation'
import { Button, View, Screen, Text } from '../../components'
import { images } from '../../assets/images'
import { ApiStore } from '../../models/api-store'

const { px2dp } = platform

export interface BindRemoveScreenProps extends NavigationScreenProps {
  apiStore: ApiStore
}

const CONTENT: ViewStyle = {
  alignItems: 'center',
  paddingLeft: px2dp(20),
  paddingRight: px2dp(20),
  marginTop: px2dp(30),
}
const IMG: ImageStyle = {
  width: '100%',
  height: px2dp(170),
  marginVertical: px2dp(30),
}
const BUTTON: ViewStyle = {
  marginTop: px2dp(20),
}
const BUTTONOK: ViewStyle = {
  ...BUTTON,
  backgroundColor: theme.colors.info.contrast
}
const TEXT: TextStyle = {
  color: '#333',
  fontSize: 12,
}

@inject('apiStore')
@observer
export class BindRemoveScreen extends React.Component<BindRemoveScreenProps, {}> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.exchangeName,
  });

  render () {
    const { apiStore, navigation } = this.props
    const { exchangeName } = navigation.state.params

    const unBindApi = async () => {
      if (await apiStore.unBindApi({ exchangeName })) {
        navigation.navigate('BindList')
      }
    }

    return (
      <Screen backgroundColor="#fff">
        <View style={CONTENT}>
          <Image
            style={IMG}
            source={images.unbind}
          />

          <View style={{marginBottom: px2dp(10)}}>
            <Text style={TEXT}>解除绑定后再也无法跟单优秀KOL</Text>
            <Text style={TEXT} center>是否解除API绑定</Text>
          </View>
          <Button
            style={BUTTON}
            note
            block
            tx="我再想想"
            onPress={() => navigation.popToTop()}
          />
          <Button
            info
            style={BUTTONOK}
            block
            tx="确认解绑"
            onPress={unBindApi}
          />
        </View>
      </Screen>
    )
  }
}
