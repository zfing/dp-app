import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { ViewStyle, Image, ImageStyle, Alert } from 'react-native'
import { platform, theme } from '../../theme'
import { NavigationScreenProps } from 'react-navigation'
import {
  Button, View, Screen, Text, ImageIcon
} from '../../components'
import { images } from '../../assets/images'
import { ApiStore } from '../../models/api-store'
import { UcenterStore } from '../../models/ucenter-store'

const { px2dp } = platform

export interface BindResultScreenProps extends NavigationScreenProps {
  apiStore: ApiStore
  ucenterStore: UcenterStore
}

const CONTENT: ViewStyle = {
  alignItems: 'center',
  paddingLeft: px2dp(20),
  paddingRight: px2dp(20),
  marginTop: px2dp(30),
}
const IMG: ImageStyle = {
  width: px2dp(99),
  height: px2dp(99),
  marginBottom: px2dp(15)
}
const BUTTON: ViewStyle = {
  marginTop: px2dp(20),
  backgroundColor: theme.colors.info.contrast
}
const TEXT = {
  marginTop: px2dp(10),
  color: '#333'
}
const CHECKBOX: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: px2dp(30),
  marginBottom: px2dp(20),
}
const ALLOW = {
  color: '#333',
  marginLeft: px2dp(4)
}
const READALLOW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  marginRight: px2dp(20)
}
const WRITEALLOW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  marginLeft: px2dp(20)
}

@inject('apiStore', 'ucenterStore')
@observer
export class BindResultScreen extends React.Component<BindResultScreenProps, {}> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.exchangeName,
  });

  handleUnBind = async (exchangeName) => {
    const { apiStore, navigation } = this.props
    if (await apiStore.checkTaskPass(exchangeName)) {
      navigation.replace('BindRemove', navigation.state.params)
    } else {
      Alert.alert('提示','您当前绑定的api账户，仍有未完结的跟单，请停止所有跟单后再试',[{text:'确定'}])
    }
  }

  render () {
    const { navigation, ucenterStore } = this.props
    const { exchangeName, read, write } = navigation.state.params
    const exInfo = ucenterStore[exchangeName] || {}

    return (
      <Screen backgroundColor="#fff">
        <View style={CONTENT}>
          <Image
            style={IMG}
            source={images.bind_result}
          />
          <Text style={TEXT}>恭喜您已经成功绑定 {exchangeName} API</Text>
          <View style={CHECKBOX}>
            <View style={READALLOW}>
              {(exInfo.read || read) ? <ImageIcon size={17} icon='bind_checked' /> : <ImageIcon size={17} icon='bind_unchecked' />}
              <Text style={ALLOW}>读取权限</Text>
            </View>
            <View style={WRITEALLOW}>
              {(exInfo.write || write) ? <ImageIcon size={17} icon='bind_checked' /> : <ImageIcon size={17} icon='bind_unchecked' />}
              <Text style={ALLOW}>交易权限</Text>
            </View>
          </View>
          <Button
            info
            style={BUTTON}
            note
            block
            tx="解除绑定"
            onPress={() => this.handleUnBind(exchangeName)}
          />
        </View>
      </Screen>
    )
  }
}
