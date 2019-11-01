import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { ViewStyle, TextStyle } from 'react-native'
import { platform, theme, color } from '../../theme'
import { NavigationScreenProps } from 'react-navigation'
import { Button, View, Screen, Text } from '../../components'
// import { isEmpty } from 'ramda'
import { AvatarCard } from './avatar-card'
import { PriceSetting } from './price-setting'

const { px2dp } = platform

export interface BringWithScreenProps extends NavigationScreenProps {
  forms: any
}

const ROOT: ViewStyle = {
  backgroundColor: color.background,
}
const FONT = {
  fontSize: 12
}
const MAIN: ViewStyle = {
  backgroundColor:'#fff',
  paddingHorizontal: px2dp(20),
  paddingTop: px2dp(20),
  flex: 1,
}
const LIST_BOT: ViewStyle = {
  marginBottom: px2dp(20)
}
const LIST_TEXT_BOT: TextStyle = {
  marginBottom: px2dp(10)
}
const TEXT_TITLE: TextStyle = {
  marginRight: px2dp(20),
  lineHeight: 18
}
const BUTTON = {
  marginTop: px2dp(20),
  marginBottom: px2dp(5)
}
const BUTTON_STOP = {
  ...BUTTON,
  backgroundColor: theme.colors.info.contrast
}
// @inject('apiStore')
@observer
export class BringWithScreen extends React.Component<BringWithScreenProps, {}> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.exchangeName,
  });

  render () {
    const {
      forms,
      // navigation,
    } = this.props

    let value = { }

    const getParams = (params) => {
      value = params
    }

    const handleUpdate = () => {
      console.tron.log(value)
    }

    return (
      <Screen style={ROOT}>
        <AvatarCard />

        <View style={MAIN}>
          <View row align="center" style={LIST_BOT}>
            <Text style={TEXT_TITLE} gary>跟投人数</Text>
            <Text note>100人（最近7天增加10人）</Text>
          </View>

          <View row align="flex-start" style={LIST_BOT}>
            <Text style={TEXT_TITLE} gary>预计收益</Text>
            <View>
              <Text note style={LIST_TEXT_BOT}>1000$ (预计30天内可提取)</Text>
              <Text note>2000$ (预计30天后可提取)</Text>
            </View>
          </View>

          <PriceSetting title="定价修改" forms={forms} getParams={getParams} />

          <Button
            style={BUTTON}
            block
            text='确定更改'
            onPress={handleUpdate}
          />
          <Text style={FONT} note>定价更改仅对后续跟投用户生效，当前跟投用户在有效期内仍享受原始价格</Text>

          <Button
            style={BUTTON_STOP}
            block
            text='停止带单'
            onPress={null}
          />
          <Text style={FONT} note>您将不会再接收新的跟投用户，仍需要服务现有用户至2020-09-21</Text>
          
        </View>
      </Screen>
    )
  }
}
