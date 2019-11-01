import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { ViewStyle, TextStyle } from 'react-native'
import Swiper from 'react-native-swiper'
import { Text, View, Button } from '../../components'
import { NavigationScreenProps } from 'react-navigation'
import * as version from '../../services/version'

export interface IntroScreenProps extends NavigationScreenProps<{}> {
  steupStore: any
}

const ITEM: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#9DD6EB'
}

const ITEM2: ViewStyle = {
  ...ITEM,
  backgroundColor: '#0F8DE9',
}

const TEXT: TextStyle = {
  color: '#fff',
  fontSize: 30,
  fontWeight: 'bold'
}

@inject('steupStore')
@observer
export class IntroScreen extends React.Component<IntroScreenProps, {}> {
  onIndexChanged = (index: number) => {
    console.tron.log(index)
  }

  onPress = async () => {
    this.props.steupStore.setVersion(await version.current())
    this.props.navigation.navigate('App')
  }

  render () {
    return (
      <Swiper loop={false} onIndexChanged={this.onIndexChanged}>
        <View style={ITEM}>
          <Text style={TEXT}>引导页1</Text>
        </View>
        <View style={ITEM2}>
          <Text style={TEXT}>引导页2</Text>
        </View>
        <View style={ITEM}>
          <Button transparent onPress={this.onPress}>
            <Text>开启你的投资！</Text>
          </Button>
        </View>
      </Swiper>
    )
  }
}
