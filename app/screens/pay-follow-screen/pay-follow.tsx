import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { ViewStyle, TextStyle } from 'react-native'
import { platform, theme } from '../../theme'
import { NavigationScreenProps } from 'react-navigation'
import { Button, View, Screen, Text, Touchable } from '../../components'
import { KolStore } from '../../models/kol-store'
import { AvatarCard } from '../now-follow-screen/avatar-card'
import { List } from './list'
import moment from 'moment'

const { px2dp } = platform

export interface PayFollowScreenProps extends NavigationScreenProps {
  kolStore: KolStore
  forms: any
}

const Pay: ViewStyle = {
  backgroundColor: '#fff',
  paddingHorizontal: px2dp(20),
  flex: 1
}
const BUTTON = {
  marginTop: px2dp(26),
}
const TEXTMR: TextStyle = {
  marginRight: px2dp(20),
  paddingHorizontal: px2dp(6),
  paddingVertical: px2dp(3),
  borderRadius: px2dp(4),
  color:'#fff',
}
@inject('kolStore')
@observer
export class PayFollowScreen extends React.Component<PayFollowScreenProps, {}> {
  state = {
    currentIndex: 0,
    fee:'99',
  }

  bgColor = (style, active) =>{
    return {
      ...style,
      backgroundColor: active ? theme.colors.primary.base : theme.colors.info.contrast
    }
  }
  type = (money: boolean, stopNumber:any, followNumber:any) => {
    if(money) {
     return `$${stopNumber} (${Math.ceil(Number(stopNumber/followNumber) * 100)}%)`
    } else {
     return `$${Math.ceil(Number(stopNumber * followNumber / 100))} (${stopNumber}%)`
    }
  }
  render () {
    const { followNumber, stopNumber, money, detail, isFirstFollow } = this.props.navigation.getParam('payload')
    const {
      navigation,
      kolStore,
    } = this.props
    const { fee, currentIndex } = this.state
    const params = {
      followNumber,
      stopNumber: money ? Math.ceil(Number(stopNumber/followNumber) * 100) / 100 : stopNumber/100,
      detail,
      fee: isFirstFollow ? fee : 0,
      type: isFirstFollow ? 0 : 1,
    }
    const payload = {
      followNumber: followNumber, 
      name: detail.nickName,
    }
    const handlePay = async () => {
      if (await kolStore.follow(params)) {
        navigation.navigate('PayFollowResult', { payload })
      }
    }
    const handFee = (item:any, i:any) => {
      this.setState({ 
        currentIndex: i,
        fee: item.replace(/[^0-9]/ig, ""), //  取字符串中数字
       })
    }

    const now = moment().format('Y / M / D')
    const later = moment().add((currentIndex + 1) * 30, 'days').format('Y / M / D')
    return (
      <Screen>
        <AvatarCard detail={detail} />
        <View style={Pay}>
          {isFirstFollow ? (
            <React.Fragment>
              <List
                text="跟投费用"
              >
                {['$99/月','$249/季','$649/年'].map((item,i) => 
                  <Touchable onPress={() => handFee(item,i)} key={i}>
                    <Text small style={this.bgColor(TEXTMR, currentIndex === i && 'active')}>{item}</Text>
                  </Touchable>
                )}
              </List>
              <List
                text="跟投时间"
                data={`${now} - ${later}`}
              />
            </React.Fragment>
          ) : null}
          <List
            text="跟投金额"
            data={`$${followNumber}`}
          />
          <List
            text="硬止损线"
            data={this.type(money, stopNumber, followNumber)}
          />
          <Button
            style={BUTTON}
            block
            loading={kolStore.isLoading}
            text={isFirstFollow ? `确定支付$${fee}` : '确认跟投'}
            onPress={handlePay}
          />
        </View>
      </Screen>
    )
  }
}
