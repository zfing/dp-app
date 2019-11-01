import * as React from 'react'
import { path } from 'ramda'
import { observer, inject } from 'mobx-react'
import { ViewStyle, ScrollView } from 'react-native'
import { Button, Screen, Text } from '../../components'
import { platform } from '../../theme'
import { NavigationScreenProps } from 'react-navigation'
import { AvatarCard } from './avatar-card'
import { AccountCard } from './account-card'
import { LineCahrtCard } from './line-chart-card'
import { DetailCard } from './detail-card'
import { FollowDetailStore } from '../../models/follow-detail-store'

const { px2dp } = platform

export interface FollowDetailScreenProps extends NavigationScreenProps {
  followDetailStore: FollowDetailStore
}

const TIPTEXT = {
  marginBottom: px2dp(20),
  marginTop: px2dp(20),
  paddingHorizontal: px2dp(20),
}

const BUTTON: ViewStyle = {
  justifyContent: 'center',
  borderRadius: 0,
  width: '100%',
}

@inject('followDetailStore')
@observer
export class FollowDetailScreen extends React.Component<FollowDetailScreenProps> {
  _didFocusSubscription: any
  constructor(props) {
    super(props)
    const { navigation, followDetailStore } = this.props
    const { id } = navigation.state.params
    this._didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => followDetailStore.getDetail({ id })
    )
  }
  static navigationOptions = () => ({
    headerTitle: '跟单详情',
  })

  render () {
    const {
      navigation,
      followDetailStore: {
        detail = {}
      },
    } = this.props

    const monthly = path(['profit', 'monthly'], detail)
    const dataSource: any[] = Array.isArray(monthly) ? monthly : []

    return (
      <Screen preset="fixed">
        <ScrollView>
          <AvatarCard detail={detail} />
          <AccountCard detail={detail} />
          <LineCahrtCard dataSource={dataSource} />
          <DetailCard detail={detail} />
          <Text note small style={TIPTEXT}>
            数字货币市场交易（含保证金交易、差价合约等）存在较高风险，不适合所有投资者。 您需为完全民事行为能力人， 能有效签署并遵守条款和所确认的合同。 本APP的内容（含数据部分）是 btoto通过在不同交易平台获取的交易结果整理公布，所有信息仅供您参考，并无任何责任， 未经 btoto 许可不得使用或以任何形式出售。
          </Text>
        </ScrollView>
        <Button
          style={BUTTON}
          onPress={() => navigation.navigate('NowFollow')}
        >
          <Text>立刻续订 $99/月</Text>
        </Button>
      </Screen>
    )
  }
}
