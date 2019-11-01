import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from '../../../storybook/views'
import { SetTimeoutMixin } from './'

declare var module

storiesOf('SetTimeoutMixin', module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add('Style Presets', () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <SetTimeoutMixin text="SetTimeoutMixin" />
      </UseCase>
    </Story>
  ))
