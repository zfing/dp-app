import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { ViewStyle } from 'react-native'
import {
  Button, View, Icon,
  Input, Cutdown, Touchable, Text
} from '../../components'
import { NavigationScreenProps } from 'react-navigation'
import { platform } from '../../theme'
import { AuthWrapper } from '../login-screen/auth-wrapper'
import crudeForm from '@crude/form'
import { isEmpty } from 'ramda'
import { validator } from '../../utils/validate'
import { UcenterStore } from '../../models/ucenter-store'

const { create: createForm, Field } = crudeForm
const { px2dp } = platform

export interface CodeLoginScreenProps extends NavigationScreenProps {
  ucenterStore: UcenterStore
  forms: any
}

const BUTTON: ViewStyle = {
  marginTop: px2dp(50),
}

const TOOL: ViewStyle = {
  marginTop: px2dp(10),
}

const validate = validator({ extend: ['account', 'validateCode'] })

@createForm({ validate, watch: ['account', 'validateCode'] })
@inject('ucenterStore')
@observer
export class CodeLoginScreen extends React.Component<CodeLoginScreenProps, {}> {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Button dark transparent onPress={() => navigation.goBack(null)}><Icon name="close" /></Button>,
  });

  render () {
    const {
      forms: {
        submit,
        getErrors,
        values,
      },
      navigation,
      ucenterStore,
    } = this.props

    const errors = getErrors()

    const getValidateCode = (run: () => void) => {
      run()
      ucenterStore.getLogCode(values.account)
    }

    const handleLogin = () => {
      submit()(async fields => {
        if (await ucenterStore.loginWithCode(fields)) {
          const redirect = navigation.getParam('redirect')
          if (redirect) {
            navigation.navigate(redirect)
          } else {
            navigation.goBack(null)
          }
        }
      })
    }

    return (
      <AuthWrapper>
        <Field
          // key={ucenterStore.initialAccount}
          // initial={ucenterStore.initialAccount}
          name="account"
          placeholder="请输入手机号/邮箱"
          component={Input}
          maxLength={30}
        >
          <Cutdown
            cache="codeLogin"
            disabled={errors.account}
            onOk={getValidateCode}
            text="获取验证码"
          />
        </Field>
        <Field
          name="validateCode"
          formatType="number"
          placeholder="请输入验证码"
          component={Input}
          keyboardType="numeric"
          maxLength={6}
        />
        <Button
          loading={ucenterStore.loading}
          disabled={!isEmpty(errors)}
          block
          tx="登录"
          style={BUTTON}
          onPress={handleLogin}
        />
        <View style={TOOL} row justify="space-between">
          <Touchable onPress={() => navigation.replace('Login')}>
            <Text primary tx="密码登录" />
          </Touchable>
          <Touchable onPress={() => navigation.navigate('Register')}>
            <Text primary tx="没有账号，去注册" />
          </Touchable>
        </View>
      </AuthWrapper>
    )
  }
}
