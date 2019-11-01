import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { ViewStyle, TextStyle, Alert } from 'react-native'
import crudeForm from '@crude/form'
import { platform } from '../../theme'
import { NavigationScreenProps } from 'react-navigation'
import {
  Button, View, Screen, Text, Touchable, ImageIcon
} from '../../components'
import { validator } from '../../utils/validate'
import { UcenterStore } from '../../models/ucenter-store'
import { AvatarCard } from './avatar-card'
import { TextInput } from './input'

const { create: createForm, Field } = crudeForm
const { px2dp } = platform

export interface NowFollowScreenProps extends NavigationScreenProps {
  ucenterStore: UcenterStore
  forms: any
}

const FOLLOW: ViewStyle = {
  backgroundColor: '#fff',
  paddingHorizontal: px2dp(20),
  flex: 1
}
const FOLLOW_TEXT: TextStyle = {
  marginTop: px2dp(6),
  width: px2dp(240),
}
const STOP_TEXT: TextStyle = {
  ...FOLLOW_TEXT,
  marginLeft: px2dp(38),
}
const CARD: ViewStyle = {
  marginTop: px2dp(20),
}
const AMOUNT: ViewStyle = {
  marginLeft: px2dp(20),
}
const STOPLOSS: ViewStyle = {
  ...AMOUNT,
}
const INPUT_NUM = {
  backgroundColor: '#F7F8FF',
  padding: 0,
  borderRadius: px2dp(4),
  paddingLeft: px2dp(10),
  height: px2dp(30),
  width: px2dp(240),
}
const INPUT_STOP = {
  ...INPUT_NUM,
  width: px2dp(190),
}
const CONVERT = {
  width: px2dp(40),
  marginLeft: px2dp(10),
  backgroundColor: '#F7F8FF',
  borderRadius: px2dp(4),
  paddingHorizontal: px2dp(5),
  paddingVertical: px2dp(3),
  height: px2dp(30)
}
const ICON = {
  marginRight: px2dp(4)
}
const BUTTON = {
  marginTop: px2dp(30),
  marginBottom: px2dp(6)
}

const validate = validator({ extend: ['followNumber', 'stopNumber'] })

@createForm({ validate, watch: ['followNumber', 'stopNumber'] })
@inject('ucenterStore')
@observer
export class NowFollowScreen extends React.Component<NowFollowScreenProps, {}> {
  state = {
    rateIndex: 0,
    rate:'',
    money: true
  }
  componentWillMount() {
    this.props.ucenterStore.getUserInfo()
  }
  btnDisable = (values: any, money: boolean) => {
    // || Number(values.followNumber || 0) < 100 
    return Number(values.followNumber || 0) < 2 || Number(values.followNumber || 0) > 10000 || money && Number(values.stopNumber) > Number(values.followNumber) || !money && Number(values.stopNumber) > 99 || !money && Number(values.stopNumber) < 0  || !Number(values.followNumber) || !values.stopNumber
  }
  toggle = () =>{
    this.setState({
      rate: 60,
      money: !this.state.money,
      rateIndex: Math.floor(Math.random() * 10000)
     })
  }
  render () {
    const {
      forms: {
        values,
      },
      navigation,
      ucenterStore
    } = this.props

    const { detail, isFirstFollow } = navigation.state.params
    const payload = {
      followNumber: values.followNumber,
      stopNumber: values.stopNumber,
      money: this.state.money,
      detail: detail,
      isFirstFollow,
    }
    
    const handleFollow = () => {
      Math.floor(exInfo.balance)-values.followNumber > 0 ?
      Alert.alert(
        '提示',
        `多余的 $${Math.floor(exInfo.balance)-values.followNumber} 将划转至您的现货账户`,
        [
          {text: '确定', onPress: () => navigation.navigate('PayFollow', { payload })},
          {text: '取消'}
        ]
      ) : 
      navigation.navigate('PayFollow', { payload })
    }

    const exInfo = ucenterStore[detail.exchange]
    
    return (
      <Screen>
        <AvatarCard detail={detail} />
        <View style={FOLLOW}>
          <View style={CARD} row align="center">
            <Text gary>可用余额</Text>
            <View style={AMOUNT} row align="center">
              <ImageIcon size={14} style={ICON} icon="dollar" />
              <Text gary>{Math.floor(exInfo.balance)}</Text>
            </View>
          </View>
          <View style={CARD}>
            <View row align="flex-start" >
              <Text gary style={{marginTop: px2dp(8)}} >跟投金额</Text>
              <View style={AMOUNT} row align="flex-start">
                <ImageIcon style={{marginTop: px2dp(8),marginRight: px2dp(4)}} size={14} icon="dollar" /> 
                <View>
                  <Field
                    style={INPUT_NUM}
                    autoFocus={true}
                    name="followNumber"
                    placeholder="$100-$10000"
                    component={TextInput}
                    formatType="number"
                    balance={exInfo.balance}
                    // 禁止粘贴
                    contextMenuHidden={true}
                    maxLength={5}
                  />
                  <Text note least style={FOLLOW_TEXT}>暂只支持账户全仓跟投模式，切勿自行操作跟单账户
您的多余金额将被自动划转至您的现货账户</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={CARD}>
            <View row align="center">
              <Text gary style={{ marginTop: px2dp(-15) }}>硬止损线</Text>
              <View>
                <View row align="center" style={STOPLOSS}>
                {this.state.money 
                  ? <ImageIcon size={14} style={ICON} icon="dollar" /> 
                  : <ImageIcon size={14} style={ICON} icon="rate" />}
                  <Field
                    key={`${this.state.rateIndex}${values.followNumber}`}
                    initial={this.state.money ? `${Math.floor(values.followNumber * 0.6) || ''}` : `${this.state.rate}`}
                    style={INPUT_STOP}
                    name="stopNumber"
                    formatType="number"
                    placeholder={this.state.money ? "$60-$6000" : "0%-99%"}
                    component={TextInput}
                    // 禁止粘贴
                    contextMenuHidden={true}
                    maxLength={this.state.money ? 5 : 2}
                  />
                  
                  <Touchable 
                  onPress={this.toggle} 
                    style={CONVERT}>
                    <View align="center">
                      <ImageIcon size={12} icon="convert" />
                      <Text primary least style={{ marginTop: px2dp(3) }}>
                        {this.state.money ? '比例' : '金额'}
                      </Text>
                    </View>
                  </Touchable>
                </View>
                <Text note least style={STOP_TEXT}>若跟单金额低于以上金额/比例，则立刻停止所有跟单</Text>
              </View>
            </View>
          </View>
          <Button
            style={BUTTON}
            disabled={this.btnDisable(values, this.state.money)}
            block
            text={values.followNumber ? `确定跟投$${values.followNumber || ''}` : '确定跟投'}
            onPress={handleFollow}
          />
          <View align="center">
            <Text note least>默认复制交易员的所有已开仓交易</Text>
          </View>
        </View>
      </Screen>
    )
  }
}
