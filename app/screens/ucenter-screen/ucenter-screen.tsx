import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { ViewStyle } from 'react-native'
import { Avatar, View, Screen, Button, List, ListItem } from '../../components'
import { platform } from '../../theme'
import { NavigationScreenProps } from 'react-navigation'
import { BlockItem } from './block-item'
import { UcenterStore } from '../../models/ucenter-store'
import debounce from '@crude/extras/lib/debounce'
import { color } from '../../theme'

const { px2dp } = platform

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
}

const AVATAR: ViewStyle = {
  backgroundColor: '#fff',
  paddingBottom: px2dp(16),
}

const INFO: ViewStyle = {
  paddingHorizontal: px2dp(10),
}

const BUTTON_BOX: ViewStyle = {
  marginTop: px2dp(30),
  marginHorizontal: px2dp(20),
}
const ICON = {
  width: px2dp(22), 
  height: px2dp(22),
}
export interface UcenterScreenProps extends NavigationScreenProps<{}> {
  ucenterStore: UcenterStore
}

@inject('ucenterStore')
@observer
export class UcenterScreen extends React.Component<UcenterScreenProps, {}> {
  
  componentDidMount() {
    const { getUserInfo } = this.props.ucenterStore

    getUserInfo()
    
    this.props.navigation.addListener(
      'didFocus',
      debounce(getUserInfo, 3000, true)
    )
  }
  

  render () {
    const {
      navigation,
      ucenterStore,
    } = this.props

    const { userInfo } = ucenterStore
    const handleLogout = async () => {
      if (await ucenterStore.logout()) {
        navigation.navigate('Index')
      }
    }

    return (
      <Screen backgroundColor="#fff">
        <View style={ROOT}>
          <View style={AVATAR}>
            <Avatar
              name={userInfo.nickName}
              onPress={() => console.log('yes')}
            />
            <View style={INFO} row align="center" justify="space-around">
              <BlockItem title="0" note="我的关注" />
              <BlockItem title="0" note="我的粉丝" />
              <BlockItem title="$0" note="我的余额" />
            </View>
          </View>
          <List arrow>
            <ListItem
              icon="u_guide"
              iconStyle={ICON}
              onPress={() => this.props.navigation.navigate('BringList')}
              title="我的带单"
            />
            <ListItem
              icon="u_wallet"
              iconStyle={ICON}
              onPress={() => console.log('yes')}
              title="我的钱包"
            />
            <ListItem
              icon="u_api"
              iconStyle={ICON}
              onPress={() => this.props.navigation.navigate('BindList')}
              title="API绑定"
            />
            <ListItem
              icon="u_setting"
              iconStyle={ICON}
              onPress={() => console.log('yes')}
              title="安全设置"
            />
            <ListItem
              icon="u_contact"
              iconStyle={ICON}
              onPress={() => this.props.navigation.navigate('ContactUs')}
              title="联系我们"
            />
          </List>
          <View style={BUTTON_BOX}>
            <Button
              textStyle={{ letterSpacing: 5 }}
              loading={ucenterStore.loading}
              block
              light
              tx="退出账户"
              onPress={handleLogout}
            />
          </View>
        </View>
      </Screen>
    )
  }
}
