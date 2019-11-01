/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */

import * as React from 'react'
import { View, ViewStyle } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from '../../../storybook/views'
import { Text } from './text'

declare var module

const VIEWSTYLE: ViewStyle = {
  flex: 1,
}

storiesOf('Text', module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add('translate', () => (
    <Story>
      <UseCase text="default" usage="Used for normal body text.">
        <View style={VIEWSTYLE}>
          <Text tx="common.ok" />
        </View>
      </UseCase>
    </Story>
  ))
