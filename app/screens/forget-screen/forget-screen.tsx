import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { ViewStyle } from 'react-native'
import {
  Button,
  Input, Cutdown
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

export interface ForgetScreenProps extends NavigationScreenProps<{}> {
  forms: any
  ucenterStore: UcenterStore
}

const BUTTON: ViewStyle = {
  marginTop: px2dp(50),
}

const validate = validator({ extend: ['account', 'validateCode', 'password'] })

@createForm({ validate, watch: ['account', 'validateCode', 'password'] })
@inject('ucenterStore')
@observer
export class ForgetScreen extends React.Component<ForgetScreenProps, {}> {
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
      ucenterStore.getRestCode(values.account)
    }

    const handleForget = () => {
      submit()(async fields => {
        if (await ucenterStore.resetPwd(fields)) {
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
            disabled={errors.phone}
            onOk={getValidateCode}
            text="获取验证码"
          />
        </Field>
        <Field
          name="validateCode"
          formatType="number"
          placeholder="请输入验证码"
          keyboardType="numeric"
          component={Input}
          maxLength={6}
        />
        <Field
          name="password"
          password
          placeholder="请输入新密码"
          component={Input}
          maxLength={16}
          errorText={errors.password}
        />
        <Button
          loading={ucenterStore.loading}
          disabled={!isEmpty(errors)}
          block
          tx="找回密码"
          style={BUTTON}
          onPress={handleForget}
        />
      </AuthWrapper>
    )
  }
}
