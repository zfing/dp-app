import * as React from 'react'
import { observer } from 'mobx-react'
import { ViewStyle, ImageStyle, Image } from 'react-native'
import { platform } from '../../theme'
import { translate } from '../../i18n'
import { NavigationScreenProps } from 'react-navigation'
import { View, Screen, List, ListItem, Text } from '../../components'

const { px2dp } = platform

export interface ContactUsScreenProps extends NavigationScreenProps<{}> {
}

const IMAGE_BOX: ViewStyle = {
  alignItems: 'center',
  marginTop: px2dp(60),
}

const IMAGE: ImageStyle = {
  width: px2dp(120),
  height: px2dp(120),
  borderRadius: 4,
}

// @inject("mobxstuff")
@observer
export class ContactUsScreen extends React.Component<ContactUsScreenProps, {}> {
  static navigationOptions = () => ({
    headerTitle: translate('联系我们'),
  });

  render () {
    return (
      <Screen>
        <List arrow>
          <ListItem title="常见问题" />
          <ListItem title="发送工单" />
          <ListItem title="商务合作" note="123@qq.com" arrow={false} />
        </List>
        <View style={IMAGE_BOX}>
          <Image
            style={IMAGE}
            source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }}
          />
          <Text style={{ marginTop: px2dp(20) }}>微信扫一扫添加好友，加入社群</Text>
          <Text style={{ marginTop: px2dp(5) }}>微信号：123456</Text>
        </View>
      </Screen>
    )
  }
}
