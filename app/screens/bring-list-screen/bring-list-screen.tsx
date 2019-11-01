import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { translate } from '../../i18n'
import { NavigationScreenProps } from 'react-navigation'
import { Screen, Text, ListItem, List } from '../../components'
import { platform } from '../../theme'
import { UcenterStore } from '../../models/ucenter-store'
import { ViewStyle } from 'react-native';

const { px2dp, isIphoneX } = platform

export interface BringListScreenProps extends NavigationScreenProps<{}> {
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
export class BringListScreen extends React.Component<BringListScreenProps, {}> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: translate('我的带单')
  })

  async componentDidMount() {
    // await request.getUserBindResult()
  }

  renderTag = ({ bind }) => {
    return <Text note={!bind} primary={bind}>{bind ? '正在带单' : '未带单'}</Text>
  }

  handleNext = (dataItem, exchangeName: string, isWallet) => {
    const { navigation } = this.props
    return () => {
      navigation.navigate(dataItem.bind ? 'BringWith' : 'BringWithnot', { exchangeName, isWallet })
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
            onPress={this.handleNext(Binance, 'Binance','')}
            noteActive={Binance.bind}
            note={Binance.bind ? '正在带单' : '未带单'}
          />
          <ListItem
            style={LIST}
            icon="ex_huobi_f"
            iconStyle={ICON}
            onPress={this.handleNext(Huobi, 'Huobi', '')}
            noteActive={Huobi.bind}
            note={Huobi.bind ? '正在带单' : '未带单'}
          />
          <ListItem
            style={LIST}
            icon="ex_okex_f"
            iconStyle={ICON}
            onPress={this.handleNext(OKEx, 'OKEx', 'isWallet')}
            noteActive={OKEx.bind}
            note={OKEx.bind ? '正在带单' : '未带单'}
          />
          <ListItem
            style={LIST}
            icon="ex_bitmex_f"
            iconStyle={ICON}
            onPress={this.handleNext(BitMex, 'BitMex','')}
            noteActive={BitMex.bind}
            note={BitMex.bind ? '正在带单' : '未带单'}
          />
        </List>
      </Screen>
    )
  }
}
