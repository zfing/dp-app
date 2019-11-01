import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { View, ActivityIndicator, ViewStyle } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import * as version from '../../services/version'
// import * as storage from '../../utils/storage'
import { SteupStore } from '../../models/steup-store'

export interface TransferScreenProps extends NavigationScreenProps<{}> {
  steupStore: SteupStore
}

const ROOT: ViewStyle = {
  backgroundColor: '#fff',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}

@inject('steupStore')
@observer
export class TransferScreen extends React.Component<TransferScreenProps, {}> {
  constructor(props: Readonly<TransferScreenProps>) {
    super(props)
    this.bootstrapAsync()
  }

  bootstrapAsync = async () => {
    // await storage.clear()
    const isLatest = await version.isLatest(this.props.steupStore.version)
    if (isLatest) {
      this.props.navigation.navigate('App')
    } else {
      this.props.navigation.navigate('Outsite')
    }
  }

  render () {
    return (
      <View style={ROOT}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
}
