import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import { ImageIcon } from '../components'
import { translate } from '../i18n'
import * as auth from '../services/auth'
import { IndexScreen } from '../screens/index-screen'
import { FollowScreen } from '../screens/follow-screen'
import { UcenterScreen } from '../screens/ucenter-screen'

export const IndexTabNavigator = createStackNavigator({
  Index: {
    screen: IndexScreen,
    navigationOptions: {
      header: null,
    }
  },
})

export const FollowTabNavigator = createStackNavigator({
  Follow: {
    screen: FollowScreen,
    navigationOptions: {
      header: null,
    }
  },
})

export const UcenterTabNavigator = createStackNavigator({
  Ucenter: {
    screen: UcenterScreen,
    navigationOptions: {
      header: null,
    }
  },
})

export const TabNavigator = createBottomTabNavigator({
  Index: {
    screen: IndexTabNavigator,
    navigationOptions: () => ({
      tabBarLabel: translate('实盘'),
      tabBarIcon({ focused }) {
        const source = focused ? 'tab_market_active' : 'tab_market'
        return <ImageIcon size={20} icon={source} />
      }
    })
  },
  Follow: {
    screen: FollowTabNavigator,
    navigationOptions: () => ({
      tabBarLabel: translate('跟单'),
      tabBarIcon({ focused }) {
        const source = focused ? 'tab_follow_active' : 'tab_follow'
        return <ImageIcon size={20} icon={source} />
      },
      async tabBarOnPress({ navigation, defaultHandler }) {
        if (await auth.logged()) {
          defaultHandler()
        } else {
          navigation.navigate('Login', {
            redirect: 'Ucenter'
          })
        }
      }
    })
  },
  Ucenter: {
    screen: UcenterTabNavigator,
    navigationOptions: () => ({
      tabBarLabel: translate('个人'),
      tabBarIcon({ focused }) {
        const source = focused ? 'tab_person_active' : 'tab_person'
        return <ImageIcon size={20} icon={source} />
      },
      async tabBarOnPress({ navigation, defaultHandler }) {
        if (await auth.logged()) {
          defaultHandler()
        } else {
          navigation.navigate('Login', {
            redirect: 'Ucenter'
          })
        }
      }
    })
  },
}, {
  initialRouteName: 'Index',
  swipeEnabled: false,
  animationEnabled: false,
  backBehavior: 'none',
  tabBarOptions: {
    inactiveTintColor: '#A3CAE5',
    activeTintColor: '#108EE9',
    labelStyle: {
      fontSize: 12,
      paddingTop: 3,
      paddingBottom: 2
    },
    style: {
      borderTopColor: '#fff',
      paddingTop: 4
    }
  },
})
