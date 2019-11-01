import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { NavigationActions } from 'react-navigation'
import { NavigationStore } from '../../navigation/navigation-store'

export interface BridgeProps {
  navigationStore?: NavigationStore
  children?: any
}

export const BridgeActions = {
  navigation: {
    navigate(options) {},
  }
}

@inject('navigationStore')
@observer
export class Bridge extends React.PureComponent<BridgeProps> {
  render () {
    const { children, navigationStore } = this.props
    BridgeActions.navigation.navigate = (options = {}) => {
      navigationStore.dispatch(NavigationActions.navigate(options))
    }
    return React.Children.only(children)
  }
}
