import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { ViewStyle } from 'react-native'
import { Button, View, Icon, Input, Touchable, Text } from '../../components'
import { NavigationScreenProps } from 'react-navigation'
import { platform } from '../../theme'
import { AuthWrapper } from './auth-wrapper'
import crudeForm from '@crude/form'
import { isEmpty } from 'ramda'
import { validator } from '../../utils/validate'
import { UcenterStore } from '../../models/ucenter-store'

const { create: createForm, Field } = crudeForm
const { px2dp } = platform

export interface LoginScreenProps extends NavigationScreenProps {
  ucenterStore: UcenterStore
  forms: any
}

const BUTTON: ViewStyle = {
  marginTop: px2dp(50),
}

const TOOL: ViewStyle = {
  marginTop: px2dp(10),
}

const validate = validator({ extend: ['account', 'password'] })

@createForm({ validate, watch: ['account', 'password'] })
@inject('ucenterStore')
@observer
export class LoginScreen extends React.Component<LoginScreenProps, {}> {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Button dark transparent onPress={() => navigation.goBack(null)}><Icon name="close" /></Button>,
  });

  render () {
    const {
      forms: {
        submit,
        getErrors,
      },
      navigation,
      ucenterStore,
    } = this.props

    const errors = getErrors()

    const handleLogin = () => {
      submit()(async (fields: any) => {
        if (await ucenterStore.login(fields)) {
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
      <AuthWrapper navigation={navigation}>
        <Field
          name="account"
          placeholder="请输入手机号/邮箱"
          component={Input}
          maxLength={30}
        />
        <Field
          name="password"
          password
          placeholder="请输入密码"
          component={Input}
          maxLength={16}
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
          <Touchable onPress={() => navigation.replace('CodeLogin')}>
            <Text primary tx="验证码登录" />
          </Touchable>
          <Touchable onPress={() => navigation.navigate('Register')}>
            <Text primary tx="没有账号，去注册" />
          </Touchable>
        </View>

      </AuthWrapper>
    )
  }
}
