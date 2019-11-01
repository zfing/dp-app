import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { ViewStyle } from 'react-native'
import { Button, View, Input, Cutdown, Touchable, Text, ImageIcon } from '../../components'
import { NavigationScreenProps } from 'react-navigation'
import { platform } from '../../theme'
import { AuthWrapper } from '../login-screen/auth-wrapper'
import crudeForm from '@crude/form'
import { isEmpty } from 'ramda'
import { validator } from '../../utils/validate'
import { UcenterStore } from '../../models/ucenter-store'

const { create: createForm, Field } = crudeForm
const { px2dp } = platform

export interface RegisterScreenProps extends NavigationScreenProps<{}> {
  forms: any,
  ucenterStore: UcenterStore
}

const BUTTON: ViewStyle = {
  marginTop: px2dp(50),
}

const TOOL: ViewStyle = {
  marginTop: px2dp(10),
}

const validate = validator({ extend: ['account', 'validateCode', 'password'] })

@createForm({ validate, watch: ['account', 'validateCode', 'password'] })
@inject('ucenterStore')
@observer
export class RegisterScreen extends React.Component<RegisterScreenProps, {}> {
  render () {
    const {
      forms: {
        submit,
        getErrors,
        values,
      },
      ucenterStore,
      navigation,
    } = this.props

    const errors = getErrors()

    const getValidateCode = (run) => {
      run()
      ucenterStore.getRegCode(values.account)
    }

    const handleLogin = () => {
      submit()(async fileds => {
        if (await ucenterStore.register(fileds)) {
          navigation.navigate('Ucenter')
        }
      })
    }

    return (
      <AuthWrapper self={true}>
        <Field
          name="account"
          placeholder="请输入手机号/邮箱"
          component={Input}
          maxLength={30}
        >
          <Cutdown
            cache="register"
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
        >
          {!errors.validateCode && <ImageIcon icon="fields_check" size={14} />}
        </Field>
        <Field
          name="password"
          password
          placeholder="请输入密码（8-16位，至少包含字母和数字)"
          maxLength={16}
          component={Input}
          errorText={errors.password}
        >
          {!errors.password && <ImageIcon icon="fields_check" size={14} />}
        </Field>
        <Button
          loading={ucenterStore.loading}
          disabled={!isEmpty(errors)}
          block
          tx="注册"
          style={BUTTON}
          onPress={handleLogin}
        />

        <View style={TOOL}>
          <Touchable onPress={() => navigation.goBack(null)}>
            <Text primary tx="已有账号，去登陆" />
          </Touchable>
        </View>
      </AuthWrapper>
    )
  }
}
