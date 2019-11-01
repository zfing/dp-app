import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation'
import { AuthSwitch } from './auth-switch'
import { TabNavigator } from './tab-navigator'
import { defaultNavigationOptions } from './defaultNavigationOptions'

import { IntroScreen } from '../screens/intro-screen'
import { TransferScreen } from '../screens/transfer-screen'
import { WebviewScreen } from '../screens/webview-screen'

import { BindScreen } from '../screens/bind-screen'
import { BindListScreen } from '../screens/bind-list-screen'
import { BindResultScreen } from '../screens/bind-result-screen'
import { BindRemoveScreen } from '../screens/bind-remove-screen'
import { ContactUsScreen } from '../screens/contact-us-screen'
import { HoldPositionScreen } from '../screens/hold-position-screen'
import { KolDetailScreen } from '../screens/kol-detail-screen'
import { FirmOfferScreen } from '../screens/firm-offer-screen'
import { NowFollowScreen } from '../screens/now-follow-screen'
import { PayFollowScreen } from '../screens/pay-follow-screen'
import { PayFollowResultScreen } from '../screens/pay-follow-result-screen'
import { FollowDetailScreen } from '../screens/follow-detail-screen'
import { BringListScreen } from '../screens/bring-list-screen'
import { BringWithScreen } from '../screens/bring-with-screen'
import { BringWithnotScreen } from '../screens/bring-withnot-screen'
import { RenewalScreen } from '../screens/renewal-screen'
import { RenewalResultScreen } from '../screens/renewal-result-screen'


/* ================= outsite ================= */
export const OutsiteNavigator = createStackNavigator({
  Intro: { screen: IntroScreen },
}, {
  headerMode: 'none',
})
/* ================= outsite ================= */

/* ================= outsite ================= */
export const MainNavigator = createStackNavigator({
  Tab: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
    }
  },
  // Detail: { screen: DetailScreen },
  Bind: { screen: BindScreen },
  BindList: { screen: BindListScreen },
  BindResult: { screen: BindResultScreen },
  BindRemove: { screen: BindRemoveScreen },
  ContactUs: { screen: ContactUsScreen },
  Webview: { screen: WebviewScreen },
  HoldPosition: { screen: HoldPositionScreen },
  KolDetail: { screen: KolDetailScreen },
  FirmOffer: { screen: FirmOfferScreen },
  NowFollow: { screen: NowFollowScreen },
  PayFollow: { screen: PayFollowScreen },
  PayFollowResult: { screen: PayFollowResultScreen },
  FollowDetail: { screen: FollowDetailScreen },
  BringList: { screen: BringListScreen },
  BringWith: { screen: BringWithScreen },
  BringWithnot: { screen: BringWithnotScreen },
  Renewal: { screen: RenewalScreen },
  RenewalResult: { screen: RenewalResultScreen },
}, {
  headerMode: 'screen',
  defaultNavigationOptions,
  headerLayoutPreset: 'center',
})

export const AppStack = createStackNavigator({
  Main: { screen: MainNavigator },
  AuthModal: { screen: AuthSwitch },
}, {
  mode: 'modal',
  headerMode: 'none',
  defaultNavigationOptions: {
    gesturesEnabled: false,
  }
})

export const RootNavigator = createAppContainer(createSwitchNavigator({
  Transfer: TransferScreen,
  Outsite: OutsiteNavigator,
  App: AppStack,
}))
