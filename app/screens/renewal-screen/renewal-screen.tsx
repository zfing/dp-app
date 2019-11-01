import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { ViewStyle, TextStyle } from 'react-native'
import { platform, theme } from '../../theme'
import { NavigationScreenProps } from 'react-navigation'
import { Button, View, Screen, Text, Touchable } from '../../components'
import { KolStore } from '../../models/kol-store'
import { AvatarCard } from '../now-follow-screen/avatar-card'
import { List } from '../pay-follow-screen/list'
import moment from 'moment'

const { px2dp } = platform

export interface RenewalScreenProps extends NavigationScreenProps {
  kolStore: KolStore
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
export class RenewalScreen extends React.Component<RenewalScreenProps, {}> {
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

  render () {
    const {
      kolStore,
      navigation,
    } = this.props
    const { fee, currentIndex } = this.state
    const { detail = {}, relationEndDate } = navigation.state.params
    
    const end = moment(relationEndDate).add((currentIndex + 1) * 30, 'days').format('Y / M / D')

    const handlePay = async () => {
      if (await kolStore.renewal({
        targetUserId: detail.userId,
        exchangeName: detail.exchange,
        fee: fee,
      })) {
        navigation.navigate('RenewalResult', { end })
      }
    }
    const handFee = (item:any, i:any) => {
      this.setState({ 
        currentIndex: i,
        fee: item.replace(/[^0-9]/ig, ""), //  取字符串中数字
      })
    }
    return (
      <Screen>
        <AvatarCard detail={detail} />
        <View style={Pay}>
          <List text="跟投费用">
            {['$99/月','$249/季','$649/年'].map((item,i) => 
              <Touchable onPress={() => handFee(item,i)} key={i}>
                <Text small style={this.bgColor(TEXTMR,currentIndex === i && 'active')}>{item}</Text>
              </Touchable>
            )}
          </List>
          <List text="跟投结束时间" data={end}/>
          <Button
            style={BUTTON}
            block
            loading={kolStore.isLoading}
            text={`确定支付$${fee}`}
            onPress={handlePay}
          />
        </View>
      </Screen>
    )
  }
}
