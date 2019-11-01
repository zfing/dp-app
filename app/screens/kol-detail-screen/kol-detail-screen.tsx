import * as React from 'react'
import { path, isEmpty } from 'ramda'
import { observer, inject } from 'mobx-react'
import { ViewStyle, ScrollView, Alert } from 'react-native'
import { Button, Screen, Text } from '../../components'
import { platform } from '../../theme'
import { NavigationScreenProps } from 'react-navigation'
import { AvatarCard } from './avatar-card'
import { AccountCard } from './account-card'
import { LineCahrtCard } from './line-chart-card'
import { BarCahrtCard } from './bar-chart-card'
import { DetailCard } from './detail-card'
import { KolStore } from '../../models/kol-store'
import { UcenterStore } from '../../models/ucenter-store'
import * as auth from '../../services/auth'
import { request } from '../../services/request'

const { px2dp } = platform

export interface KolDetailScreenProps extends NavigationScreenProps {
  kolStore: KolStore
  ucenterStore?: UcenterStore
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

@inject('kolStore','ucenterStore')
@observer
export class KolDetailScreen extends React.Component<KolDetailScreenProps> {
  state: {
    hasKolCopy: boolean, // 是否有跟单
    isKolMember: boolean, // 是否有关系
    relationEndDate: any,
  }
  _didFocusSubscription: any
  params: any
  action: () => void
  exchangeName: string
  targetUserId: number

  constructor(props) {
    super(props)
    this.state = {
      hasKolCopy: false,
      isKolMember: false,
      relationEndDate: null,
    }

    this.action = () => {}
    const { params } = this.props.navigation.state
    this.exchangeName = params.exchange
    this.targetUserId = params.userId

    this._didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      this.getUserInfoAndKolRelation
    )
  }

  componentWillUnmount() {
    this._didFocusSubscription.remove()
  }

  async componentWillMount() {
    this.props.kolStore.getDetail({
      exchangeName: this.exchangeName,
      userId: this.targetUserId,
    })
  }

  getUserInfoAndKolRelation = async () => {
    try {
      if (await auth.logged()) {
        const relation = await request.getRelation({
          targetUserId: this.targetUserId,
          exchangeName: this.exchangeName
        })
        this.props.ucenterStore.getUserInfo()
        this.setState({
          hasKolCopy: relation.isCopyTrade === 0,
          isKolMember: relation.isMember === 0,
          relationEndDate: relation.relationEndDate,
        })
      }
    } catch (e) {
      this.setState({
        hasKolCopy: false,
        isKolMember: false,
        relationEndDate: null,
      })
    }
  }

  render () {
    const {
      navigation,
      kolStore: {
        detail = {}
      },
      ucenterStore
    } = this.props

    const { hasKolCopy, isKolMember, relationEndDate } = this.state

    const monthly = path(['profit', 'monthly'], detail)
    const dataSource: any[] = Array.isArray(monthly) ? monthly : []
    const handleOk = () => {
      this.action && this.action()
    }

    const handleFollow = () => {
      if (hasKolCopy) {
        navigation.navigate('Renewal', {
          detail,
          relationEndDate,
        })
      } else if (isEmpty(ucenterStore.userInfo)) {
        navigation.navigate('Login')
      } else {
        const exData = ucenterStore[detail.exchange] || {}
        if (exData.write) { // 有写入权限
          navigation.navigate('NowFollow',{
            detail,
            isFirstFollow: !isKolMember,
          })
        } else { // 无写入，有读取
          Alert.alert(
            '',
            `${exData.read ? '您绑定的API无交易权限，请重新绑定' : `请先绑定${detail.exchange}API`}`,
            [{ text: '确定', onPress: handleOk }])
          this.action = () => navigation.navigate('BindList')
        }
      }
    }

    return (
      <Screen preset="fixed">
        <ScrollView>
          <AvatarCard detail={detail} />
          <AccountCard detail={detail} />
          <LineCahrtCard dataSource={dataSource} />
          <BarCahrtCard dataSource={dataSource} />
          <DetailCard detail={detail} />
          <Text note small style={TIPTEXT}>
            数字货币市场交易（含保证金交易、差价合约等）存在较高风险，不适合所有投资者。 您需为完全民事行为能力人， 能有效签署并遵守条款和所确认的合同。 本APP的内容（含数据部分）是 btoto通过在不同交易平台获取的交易结果整理公布，所有信息仅供您参考，并无任何责任， 未经 btoto 许可不得使用或以任何形式出售。
          </Text>
        </ScrollView>
        <Button
          style={BUTTON}
          onPress={handleFollow}
        >
          {hasKolCopy ? <Text>立即续费 $99/月</Text> : (
            isKolMember ? <Text>重新跟单 $99/月</Text> : <Text>立即跟单 $99/月</Text>
          )}
        </Button>
      </Screen>
    )
  }
}
