import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { ViewStyle, Alert } from 'react-native'
import { platform, theme } from '../../theme'
import { NavigationScreenProps } from 'react-navigation'
import {
  Button, View, Screen, Input, Text, Touchable, Bottom, ImageIcon, Scan
} from '../../components'
import crudeForm from '@crude/form'
import { isEmpty } from 'ramda'
import { validator } from '../../utils/validate'
import { ApiStore } from '../../models/api-store'
const { create: createForm, Field } = crudeForm
const { px2dp } = platform

export interface BindScreenProps extends NavigationScreenProps {
  forms: any
  apiStore: ApiStore
}

const ROOT: ViewStyle = {
  backgroundColor: '#fff',
  paddingHorizontal: px2dp(20),
}
const TEXTVIEW = {
  marginTop: px2dp(10),
  marginBottom: px2dp(20)
}
const MAIN_TEXT = {
  color: theme.textColor
}
const TEXTNOT = {
  ...MAIN_TEXT,
  paddingHorizontal: px2dp(10),
  marginTop: px2dp(5)
}
const BUTTONNOT = {
  marginTop: px2dp(30),
}
const TEXTWAR = {
  marginTop: px2dp(14),
  fontSize: 10
}

const validate = validator({ extend: ['apikey', 'apisecret', 'passphrase'] })

@createForm({ validate, watch: ['apikey', 'apisecret'] })
@inject('apiStore')
@observer
export class BindScreen extends React.Component<BindScreenProps, {}> {
  refs: any = {}

  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.exchangeName,
  });

  state = {
    scanId: 0,
    apikey: '',
    apisecret: '',
  }

  onScanOk = (ret: string) => {
    try {
      const { apiKey, secretKey } = JSON.parse(ret)
      if (apiKey && secretKey) {
        this.setState({
          scanId: this.state.scanId + 1,
          apikey: apiKey,
          apisecret: secretKey,
        })
      }
    } catch (e) {

    }
  }

  render () {
    const {
      forms: {
        submit,
        getErrors,
      },
      navigation,
      apiStore,
    } = this.props

    const { apikey, apisecret, scanId } = this.state

    const { exchangeName } = navigation.state.params

    const handleBind = () => {
      submit()(async (fileds: any) => {
        const payload = { ...fileds, exchangeName }
        const result = await apiStore.bindApi(payload)
        if (result.pass) {
          navigation.replace('BindResult', {
            exchangeName,
            read: result.read,
            write: result.write,
          })
        } else {
          Alert.alert('提示',`${result.msg}`,[{text: '确定'}])
        }
      })
    }
    return (
      <Screen style={ROOT}>
        <View style={TEXTVIEW}>
          <Text small style={TEXTNOT}>
              1.您的API必须是在您开通币安“合约账户”后所创建的，若不是，请先删除当前API，再重新创建。
          </Text>
          <Text small style={TEXTNOT}>
              2.如果您需要利用btoto的跟投服务，需绑定{exchangeName}的API，
              <Text bold small style={MAIN_TEXT}>且打开“允许合约”选项</Text>
          </Text>
          <Text small style={TEXTNOT}>
              3.您的API KEY将多重加密保存，我们不会向除对应交易所外的网站进行发送，请无需担心安全性。
          </Text>
          <Text small style={TEXTNOT}>
              4.请妥善保管好API密钥等信息，不要向任何人透露该信息，因个人原因泄漏导致的账户风险，我们不承担任何责任
          </Text>
        </View>
        <Field
          key={`apikey-${scanId}-${apikey}`}
          initial={apikey}
          name="apikey"
          placeholder="请输入Access Key"
          component={Input}
        >
          <Touchable onPress={() => this.refs.scan.open()}>
            <ImageIcon size={18} icon="scan" />
          </Touchable>
        </Field>
        <Field
          key={`apisecret-${scanId}-${apisecret}`}
          initial={apisecret}
          name="apisecret"
          placeholder="请输入Secret Key"
          component={Input}
        />
        {(exchangeName === 'Huobi') && (
          <Field
            name="passphrase"
            placeholder="请输入passphrase"
            component={Input}
          />
        )}
        <Button
          style={BUTTONNOT}
          block
          tx="授权绑定"
          loading={apiStore.loading}
          disabled={!isEmpty(getErrors())}
          onPress={handleBind}
        />
        <Text style={TEXTWAR} note>
          我们将在您授权绑定后进行小额挂单测试API读写权限的有效性，并不会有实际成交，请放心使用
        </Text>
        <Bottom align="center">
          <Touchable onPress={() => this.props.navigation.navigate('Webview')}>
            <Text primary>不会获取API？点击查看教程</Text>
          </Touchable>
        </Bottom>

        <Scan ref="scan" onOk={this.onScanOk} />
      </Screen>
    )
  }
}
