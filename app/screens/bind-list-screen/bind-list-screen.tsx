import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { translate } from '../../i18n'
import { NavigationScreenProps } from 'react-navigation'
import { Screen, Text, ListItem, List } from '../../components'
import { platform } from '../../theme'
import { UcenterStore } from '../../models/ucenter-store'
import { ViewStyle } from 'react-native';

const { px2dp, isIphoneX } = platform

export interface BindListScreenProps extends NavigationScreenProps<{}> {
  ucenterStore?: UcenterStore
}
const LIST: ViewStyle = {
  height: px2dp(50)
}
const ICON = {
  height: px2dp(22),
  marginLeft: isIphoneX ? px2dp(-42) : px2dp(-32)
}
@inject('ucenterStore')
@observer
export class BindListScreen extends React.Component<BindListScreenProps, {}> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: translate('api绑定'),
  })

  async componentDidMount() {
    // await request.getUserBindResult()
  }

  renderTag = ({ bind }) => {
    return <Text note={!bind} primary={bind}>{bind ? '已绑定' : '未绑定'}</Text>
  }

  handleNext = (dataItem, exchangeName: string) => {
    const { navigation } = this.props
    return () => {
      navigation.navigate(dataItem.bind ? 'BindResult' : 'Bind', { exchangeName })
    }
  }

  render () {
    const { Binance, Huobi, OKEx, BitMex } = this.props.ucenterStore

    return (
      <Screen>
        <List arrow>
          <ListItem
            style={LIST}
            icon="ex_binance_f"
            iconStyle={ICON}
            onPress={this.handleNext(Binance, 'Binance')}
            noteActive={Binance.bind}
            note={Binance.bind ? '已绑定' : '未绑定'}
          />
          <ListItem
            style={LIST}
            icon="ex_huobi_f"
            iconStyle={ICON}
            onPress={this.handleNext(Huobi, 'Huobi')}
            noteActive={Huobi.bind}
            note={Huobi.bind ? '已绑定' : '未绑定'}
          />
          <ListItem
            style={LIST}
            icon="ex_okex_f"
            iconStyle={ICON}
            onPress={this.handleNext(OKEx, 'OKEx')}
            noteActive={OKEx.bind}
            note={OKEx.bind ? '已绑定' : '未绑定'}
          />
          <ListItem
            style={LIST}
            icon="ex_bitmex_f"
            iconStyle={ICON}
            onPress={this.handleNext(BitMex, 'BitMex')}
            noteActive={BitMex.bind}
            note={BitMex.bind ? '已绑定' : '未绑定'}
          />
        </List>
      </Screen>
    )
  }
}
