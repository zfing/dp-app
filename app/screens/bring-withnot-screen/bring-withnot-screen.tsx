import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { ViewStyle } from 'react-native'
import { platform, color } from '../../theme'
import { NavigationScreenProps } from 'react-navigation'
import {View, Screen, Text, Button } from '../../components'
// import { isEmpty } from 'ramda'
import crudeForm from '@crude/form'
import { validator } from '../../utils/validate'
import { AvatarCard } from '../bring-with-screen/avatar-card'
import { PriceSetting } from '../bring-with-screen/price-setting'
import { TextInput } from '../bring-with-screen/input'

const { create: createForm, Field } = crudeForm
const { px2dp } = platform

export interface BringWithnotScreenProps extends NavigationScreenProps {
  forms: any
}

const ROOT: ViewStyle = {
  backgroundColor: color.background,
}
const MAIN: ViewStyle = {
  backgroundColor:'#fff',
  paddingHorizontal: px2dp(20),
  paddingTop: px2dp(20),
  flex: 1,
}
const ADDRESS: ViewStyle = {
  ...ROOT,
  paddingVertical: px2dp(4),
  paddingHorizontal: px2dp(7),
  height: px2dp(24),
  width: px2dp(225)
}
const TEXT_TITLE = {
  marginRight: px2dp(20),
  lineHeight: 18,
  marginTop: px2dp(2)
}

const INPUT = {
  backgroundColor: color.background,
  padding: 0,
  marginBottom: px2dp(10),
  borderRadius: px2dp(4),
  marginRight: px2dp(10),
  paddingHorizontal: px2dp(10),
  paddingVertical: px2dp(5),
  height: px2dp(24),
  width: px2dp(258),
}
const WALLET: ViewStyle = {
  marginVertical: px2dp(10),
}
const FONT = {
  fontSize: 12
}
const BUTTON = {
  marginTop: px2dp(24)
}

const validate = validator({ extend: ['wallet', 'remarks'] })

@createForm({ validate, watch: ['wallet', 'remarks'] })
// @inject('apiStore')
@observer
export class BringWithnotScreen extends React.Component<BringWithnotScreenProps, {}> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.exchangeName,
  });

  render () {
    const {
      forms,
      // forms: {
      //   values,
      //   submit,
      // },
      navigation,
    } = this.props

    const { isWallet, exchangeName } = navigation.state.params

    let value = { }
    let payload = { }

    const getParams = (params) => {
      value = params
      payload = {
        ...value,
        wallet: forms.values.wallet,
        remarks: forms.values.remarks,
      }
    }

    const string = 'qwe34f89979887dsfafaf'
    const str = `${string.substr(0,6)}......${string.substr(-6)}`

    const handleBring = () => {
      console.tron.log(payload)
    }
    return (
      <Screen style={ROOT}>
        <AvatarCard />

        <View style={MAIN}>
          <PriceSetting title="收费设置" forms={forms} getParams={getParams} />

          {isWallet
            ? <View row align="center" style={WALLET}>
                <Text style={TEXT_TITLE} gary>默认钱包</Text>
                <View style={ADDRESS}>
                 <Text>{exchangeName}地址 ({str})</Text>
                </View>
              </View>
            : <View row align="flex-start" style={WALLET}>
                <Text style={TEXT_TITLE} gary>钱包设置</Text>
                <View align="center">
                  <Field
                    style={INPUT}
                    name="wallet"
                    placeholder="请输入您的ERC20-usdt钱包地址"
                    component={TextInput}
                  />
                  <Field
                    style={INPUT}
                    name="remarks"
                    placeholder="请输入您的钱包地址备注"
                    component={TextInput}
                  />
                </View>
              </View>
          }
          <Text style={FONT} note>1.不填写则默认不开放对应期限的自动跟投选项</Text>
          <Text style={FONT} note>2.交易员自动带单的收益每30天一轮结算上个服务期收益并可提现</Text>
          <Text style={FONT} note>3.btoto将抽取交易员收费的20%作为平台开发维护费用等</Text>
          <Text style={FONT} note>4.交易员在自动带单的服务期如出现自行解绑API，账户全部出金等恶意行为影响自动带单，btoto有权对其带单收益做出对应处置</Text>

          <Button
            style={BUTTON}
            block
            tx='开始自动带单'
            onPress={handleBring}
          />
        </View>
      </Screen>
    )
  }
}
